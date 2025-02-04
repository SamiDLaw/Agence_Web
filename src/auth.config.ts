import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

interface User {
  id: string;
  role?: string;
  email: string;
  name: string;
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/admin/login',
    signOut: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnAdminLogin = nextUrl.pathname === '/admin/login';
      
      if (isOnAdmin) {
        if (isOnAdminLogin) return !isLoggedIn;
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/admin/login', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ 
            email: z.string().email("L'email est invalide"), 
            password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères") 
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // Admin login
          if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            return {
              id: 'admin',
              email: process.env.ADMIN_EMAIL,
              name: 'Admin',
              role: 'admin'
            };
          }

          // Regular user login
          const user = await prisma.user.findUnique({
            where: { email }
          });

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: 'user'
          };
        }
        
        throw new Error("Email ou mot de passe incorrect");
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 heures
  },
  secret: process.env.NEXTAUTH_SECRET,
};
