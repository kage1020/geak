'use client';

import NextLink from 'next/link';
import { usePathname, useRouter as useNextRouter } from 'next/navigation';
import { Language } from '@/lib/const';

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, 'href'> &
  (
    | {
        href: string;
        locale?: Language;
      }
    | {
        href?: string;
        locale: Language;
      }
  );

export function Link({ href, locale, ...props }: LinkProps) {
  const pathname = usePathname();
  const [currentLocale, ...rest] = pathname.split('/').filter(Boolean);
  if (href && locale) {
    return <NextLink href={`/${locale}${href}`} {...props} />;
  }
  const target = href
    ? `/${currentLocale}${href}`
    : `/${locale}${rest.length ? `/${rest.join('/')}` : ''}`;

  return <NextLink href={target} {...props} />;
}

interface RouterPushOptions {
  href?: string;
  locale?: Language;
  scroll?: boolean;
}

type RouterPushProps =
  | (RouterPushOptions & { href: string })
  | (RouterPushOptions & { locale: Language });

export function useRouter() {
  const router = useNextRouter();
  const pathname = usePathname();
  const [currentLocale] = pathname.split('/').filter(Boolean);

  return {
    ...router,
    push: ({ href, locale, scroll }: RouterPushProps) => {
      if (!href && !locale) {
        throw new Error('href or locale must be provided');
      }
      if (href && locale) {
        return router.push(`/${locale}${href}`, { scroll });
      }
      return router.push(`/${currentLocale}${href}`, { scroll });
    },
  };
}

export function useLocale() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return locale as Language;
}
