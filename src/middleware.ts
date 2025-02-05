import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';

const secretKey = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key'
);

export async function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur est déjà sur la page de login
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token');

  // Si pas de token, rediriger vers /admin/login avec le retour prévu
  if (!token) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Vérifier le token
    await jwtVerify(token.value, secretKey);
    
    // Si le token est valide, autoriser l'accès
    return NextResponse.next();
  } catch (error) {
    // Si le token est invalide, rediriger vers /admin/login avec le retour prévu
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/admin/((?!login$).*)',
    '/api/admin/:path*'
  ]
};
