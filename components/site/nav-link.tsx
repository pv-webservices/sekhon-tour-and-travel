import type { AnchorHTMLAttributes } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Adds the trailing slash used by the static export (`trailingSlash: true`), e.g. `/cars?x=1` → `/cars/?x=1`. */
export function withTrailingSlash(href: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? '' : href.slice(cut);
  const lastSegment = path.slice(path.lastIndexOf('/') + 1);
  if (path.endsWith('/') || lastSegment.includes('.')) return href;
  return `${path}/${rest}`;
}

/**
 * Plain anchor used in place of next/link. Full document navigations keep this static site simple and
 * reliable (vinext 1.0.0-beta.5 builds also broke client-side Link navigation).
 */
export default function Link({ href, ...props }: Props) {
  return <a href={withTrailingSlash(href)} {...props} />;
}
