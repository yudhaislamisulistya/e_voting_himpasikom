import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  //   if (request.nextUrl.pathname.startsWith('/api/auth/error')) {
  //     const error = request.nextUrl.searchParams.get('error')
  //     const param = error === 'AccessDenied' ? '?e=0' : ''
  //     const response = NextResponse.redirect(new URL('/' + param, request.url))
  //     return response
  //   }
}
