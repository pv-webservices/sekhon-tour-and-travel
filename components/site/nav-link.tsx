import type { AnchorHTMLAttributes } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Plain anchor used in place of next/link. In vinext 1.0.0-beta.5 production builds the client
 * router's lazily imported navigation module resolves to the wrong chunk, so Link clicks throw
 * and never navigate. Full document navigations are reliable and fast for this content site.
 */
export default function Link(props: Props) {
  return <a {...props} />;
}
