'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter as useNextRouter } from 'next/router';

export function Link({ href, ...props }: React.ComponentProps<typeof NextLink>) {
  const locale = useLocale();

  return <NextLink {...props} href={href === '/' ? `/${locale}` : `/${locale}/${href}`} />;
}

export function useRouter() {
  const router = useNextRouter();
  const locale = useLocale();

  return {
    ...router,
    push: (url: string) => router.push(url === '/' ? `/${locale}` : `/${locale}/${url}`),
  };
}

export function useLocale() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return locale;
}
