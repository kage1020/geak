import { NextRequest, NextResponse } from 'next/server';
import { Language, Languages } from '@/lib/const';
import { routes } from '@/lib/routes';

export const config = {
  matcher: [
    '/((?!api|textures|nbt|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sw.js).*)',
  ],
};

function splitLocale(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);

  // If the path is empty, return the root path
  if (segments.length === 0) {
    return { locale: null, path: '/' };
  }

  const [locale, ...rest] = segments;

  // If the first segment is a supported language, return the locale and the rest of the path
  if (Languages.includes(locale as Language)) {
    return { locale: locale as Language, path: `/${rest.join('/')}` };
  }

  // If the first segment is a route, return the path
  const firstSegment = segments[0];
  if (Object.keys(routes).includes(firstSegment) && firstSegment !== 'root') {
    return { locale: null, path: pathname };
  }

  // Otherwise, return the path without the invalid locale
  return { locale: null, path: `/${rest.join('/')}` };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const acceptLanguages = request.headers
    .get('accept-language')
    ?.split(',')
    .map((lang) => lang.split(';')[0])
    .map((lang) => lang.split('-')[0])
    .filter((l, i, self) => self.indexOf(l) === i)
    .filter((lang) => Languages.includes(lang as Language)) ?? [Languages[0]];
  const { locale, path } = splitLocale(pathname);
  if (!locale) {
    request.nextUrl.pathname = `/${acceptLanguages[0]}${path === '/' ? '' : path}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}
