import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

const secretKey = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key'
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Vérifiez les identifiants (à remplacer par votre logique d'authentification)
    if (email === 'admin@example.com' && password === 'password') {
      // Créer un token JWT
      const token = await new SignJWT({ 
        email,
        role: 'ADMIN'
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secretKey);

      // Définir le cookie
      cookies().set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 heures
      });

      return NextResponse.json({ success: true });
    }

    return new NextResponse('Invalid credentials', { status: 401 });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
