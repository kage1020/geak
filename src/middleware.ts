import { Language, Languages } from '@/lib/const';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sw.js).*)'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const acceptLanguages = request.headers
    .get('accept-language')
    ?.split(',')
    .map((lang) => lang.split(';')[0])
    .map((lang) => lang.split('-')[0])
    .filter((l, i, self) => self.indexOf(l) === i) ?? [Languages[0]];
  const [, requestLocale, ...paths] = pathname.split('/');

  const restPath = paths.length === 0 ? '' : `/${paths.join('/')}`;
  const isLocaleValid = Languages.includes(requestLocale as Language);
  if (!isLocaleValid) {
    request.nextUrl.pathname = `/${acceptLanguages[0]}${restPath}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}
