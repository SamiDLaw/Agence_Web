import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  console.log('Route /api/admin/check-auth appelée');
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;
    console.log('Token trouvé:', !!token);

    if (!token) {
      console.log('Pas de token trouvé');
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = await verifyAuth(token);
    console.log('Token vérifié avec succès:', decoded);
    
    return NextResponse.json({ 
      authenticated: true,
      user: decoded
    });
  } catch (error) {
    console.error('Erreur de vérification du token:', error);
    return NextResponse.json({ 
      authenticated: false,
      error: 'Token invalide'
    }, { 
      status: 401 
    });
  }
}
