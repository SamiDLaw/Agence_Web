import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePasswords, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  console.log('Route /api/admin/login appelée');
  
  try {
    const body = await request.json();
    console.log('Corps de la requête reçu:', { email: body.email, hasPassword: !!body.password });

    const { email, password } = body;

    if (!email || !password) {
      console.log('Email ou mot de passe manquant');
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    console.log('Recherche de l\'utilisateur dans la base de données...');
    const admin = await prisma.user.findUnique({
      where: { email },
    });

    console.log('Utilisateur trouvé:', !!admin);

    if (!admin) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    console.log('Vérification du mot de passe...');
    const isValid = await comparePasswords(password, admin.password);
    console.log('Mot de passe valide:', isValid);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    console.log('Génération du token...');
    const token = await generateToken({ id: admin.id, email: admin.email });
    console.log('Token généré avec succès');

    console.log('Configuration du cookie...');
    const response = NextResponse.json({ 
      success: true,
      message: 'Connexion réussie'
    });

    // Définir le cookie avec des options plus permissives
    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 jours
    };

    // Définir le cookie de deux manières pour plus de compatibilité
    response.cookies.set('admin_token', token, cookieOptions);
    
    // Définir aussi le cookie dans l'en-tête Set-Cookie
    const cookieString = `admin_token=${token}; Path=${cookieOptions.path}; Max-Age=${cookieOptions.maxAge}; HttpOnly; SameSite=Lax`;
    response.headers.append('Set-Cookie', cookieString);
    
    console.log('Cookie configuré avec succès');
    console.log('Headers de réponse:', Object.fromEntries(response.headers.entries()));
    
    return response;
  } catch (error) {
    console.error('Erreur détaillée de connexion:', error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Format de requête invalide' },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
      return NextResponse.json(
        { error: 'Erreur de base de données' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
