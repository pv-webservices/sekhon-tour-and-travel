'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from '@/components/site/nav-link';
import { ArrowRight, CheckCircle2, LoaderCircle, Phone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { brand, telHref, whatsappHref, FORMSUBMIT_ENDPOINT } from '@/data/site';
import { WhatsAppIcon } from './layout';

export const enquiryServices = ['Car Rental', 'Taxi With Driver', 'Wedding Car', 'Tour Package', 'Airport Transfer', 'Tempo Traveller'] as const;
type Status = 'idle' | 'loading' | 'success';
type Summary = { reference: string; service: string; pickup: string; destination: string; pickupDate: string; passengers: string; vehicle: string };

function whatsappSummary(s: Summary) {
  return [
    'Hello Sekhon Tour and Travel, I just sent an enquiry on your website.',
    `Reference: ${s.reference}`,
    `Service: ${s.service}`,
    `Route: ${s.pickup} → ${s.destination}`,
    `Date: ${s.pickupDate}`,
    `Passengers: ${s.passengers}`,
    s.vehicle ? `Vehicle: ${s.vehicle}` : '',
  ].filter(Boolean).join('\n');
}

class ValidationError extends Error {}

function fallbackReference() {
  return 'SK-' + Date.now().toString(36).toUpperCase();
}

/** Stores the enquiry as a backup record. Invalid input throws; storage/network failures return no reference. */
async function saveToDatabase(data: Record<string, string>): Promise<{ reference?: string }> {
  let res: Response;
  try {
    res = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  } catch {
    return {};
  }
  const result = (await res.json().catch(() => ({}))) as { error?: string; reference?: string };
  if (res.ok) return { reference: result.reference };
  if (res.status < 500) throw new ValidationError(result.error || 'Please check your details and try again.');
  return {};
}

/** Emails the enquiry to the business inbox through FormSubmit's AJAX endpoint. */
async function emailViaFormSubmit(data: Record<string, string>, reference: string): Promise<boolean> {
  const body = {
    _subject: `New ${data.service} enquiry from ${data.name} (${reference})`,
    _template: 'table',
    _replyto: data.email,
    Reference: reference,
    Name: data.name,
    Phone: data.phone,
    email: data.email,
    Service: data.service,
    'Pickup location': data.pickup,
    Destination: data.destination,
    'Pickup / travel date': data.pickupDate,
    'Return date': data.returnDate || '—',
    Passengers: data.passengers,
    'Preferred vehicle': data.vehicle || '—',
    'Additional requirements': data.message || '—',
    'Submitted from': window.location.href,
  };
  try {
    const res = await fetch(FORMSUBMIT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) });
    const result = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    return res.ok && String(result.success) === 'true';
  } catch {
    return false;
  }
}

export function EnquiryForm() {
  const p = useSearchParams();
  const initialService = (enquiryServices as readonly string[]).includes(p.get('service') ?? '') ? p.get('service')! : 'Car Rental';
  const [service, setService] = useState(initialService);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [pickup, setPickup] = useState('');
  const today = new Date().toISOString().slice(0, 10);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: Record<string, string> = { ...(Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>), service };
    setError('');
    setStatus('loading');
    try {
      const saved = await saveToDatabase(data);
      const reference = saved.reference ?? fallbackReference();
      const emailed = data.website ? false : await emailViaFormSubmit(data, reference);
      if (!saved.reference && !emailed) throw Error('We couldn’t send your request. Please try again, or call / WhatsApp us directly.');
      setSummary({ reference, service, pickup: data.pickup, destination: data.destination, pickupDate: data.pickupDate, passengers: data.passengers, vehicle: data.vehicle });
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your request. Please try again.');
      setStatus('idle');
    }
  }

  if (status === 'success' && summary) {
    return (
      <div className="success" role="status">
        <CheckCircle2 size={44} />
        <h2>Thank you! Your request is received.</h2>
        <p>Reference: <strong>{summary.reference}</strong></p>
        <p>Our team will call you shortly with availability and a clear quote. For a faster response, send your details on WhatsApp too.</p>
        <div className="successactions">
          <a className="btn" href={whatsappHref(whatsappSummary(summary))} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={17} /> Send on WhatsApp</a>
          <a className="btn btn-dark" href={telHref}><Phone size={17} /> {brand.phoneDisplay}</a>
        </div>
        <button type="button" className="textlink" onClick={() => setStatus('idle')}>Send another enquiry <ArrowRight size={16} /></button>
      </div>
    );
  }

  return (
    <form className="enquiryform" onSubmit={submit}>
      <h2>Your Journey Starts Here</h2>
      <p className="formintro">Share a few details and we’ll get back with the best quote. Fields marked * are required.</p>
      <div className="formgrid">
        <Field label="Full name *" name="name" required maxLength={100} autoComplete="name" placeholder="Your name" />
        <Field label="Phone number *" name="phone" type="tel" required pattern="[+0-9 ()-]{10,18}" title="Enter a valid phone number, including country code if outside India" autoComplete="tel" placeholder="+91" />
        <Field label="Email address *" name="email" type="email" required maxLength={180} autoComplete="email" placeholder="you@example.com" />
        <div className="field">
          <label htmlFor="service">Service type *</label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="service"><SelectValue /></SelectTrigger>
            <SelectContent>{enquiryServices.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <Field label="Pickup location *" name="pickup" required maxLength={150} placeholder="e.g. Amritsar Airport" />
        <Field label="Destination *" name="destination" required defaultValue={p.get('destination') ?? ''} maxLength={150} placeholder="e.g. Manali" />
        <Field label="Pickup / travel date *" name="pickupDate" type="date" min={today} required onChange={(e) => setPickup(e.target.value)} />
        <Field label="Return date" name="returnDate" type="date" min={pickup || today} />
        <Field label="Passengers *" name="passengers" type="number" min="1" max="60" required defaultValue="2" />
        <Field label="Preferred vehicle" name="vehicle" defaultValue={p.get('vehicle') ?? ''} maxLength={100} placeholder="Innova Crysta, Tempo Traveller…" />
        <div className="field full">
          <label htmlFor="message">Additional requirements</label>
          <textarea id="message" name="message" maxLength={3000} placeholder="Flight number, wedding details, luggage, places you’d love to visit…" />
        </div>
      </div>
      <div className="sr-only" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="formnote">By sending this request you agree to be contacted about your enquiry. Your details are emailed to our team via FormSubmit. See our <Link href="/privacy-policy">Privacy Policy</Link>. No payment is required now.</p>
      {error && <div className="error" role="alert">{error}</div>}
      <button className="btn btn-block" disabled={status === 'loading'} type="submit">
        {status === 'loading' ? <><LoaderCircle className="animate-spin" size={17} />Sending Your Request…</> : <><span className="btn-label">Request Booking</span><ArrowRight size={18} className="btn-arrow" /></>}
      </button>
    </form>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="field">
      <label htmlFor={props.name}>{label}</label>
      <input id={props.name} {...props} />
    </div>
  );
}
