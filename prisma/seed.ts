import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Créer l'administrateur
  const hashedPassword = await bcryptjs.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 's.law@gmx.fr' },
    update: {},
    create: {
      email: 's.law@gmx.fr',
      name: 'Admin',
      password: hashedPassword,
    },
  });

  // Créer les packs web
  const webPacks = [
    {
      id: 'pack_shambles',
      name: 'Shambles',
      price: 450,
      description: 'Site vitrine + SEO local + photos professionnelles',
      category: 'web',
    },
    {
      id: 'pack_room',
      name: 'Room',
      price: 850,
      description: 'Boutique en ligne + gestion réseaux sociaux + publicité Facebook',
      category: 'web',
    },
    {
      id: 'pack_ope_ope',
      name: 'Ope-Ope',
      price: 1350,
      description: 'Site web + SEO + shooting photo + gestion réseaux sociaux',
      category: 'web',
    },
    {
      id: 'pack_gamma',
      name: 'Gamma',
      price: 0,
      description: 'Pack personnalisé adapté aux besoins spécifiques',
      category: 'web',
    },
  ];

  // Créer les packs média
  const mediaPacks = [
    {
      id: 'pack_starter',
      name: 'Starter',
      price: 350,
      description: 'Vidéo promotionnelle + photos professionnelles + optimisation réseaux sociaux',
      category: 'media',
    },
    {
      id: 'pack_business',
      name: 'Business Boost',
      price: 500,
      description: 'Vidéo corporate + photos + audit SEO local',
      category: 'media',
    },
    {
      id: 'pack_360',
      name: 'Visibilité 360',
      price: 900,
      description: 'Vidéo drone + vidéo promotionnelle + photos professionnelles',
      category: 'media',
    },
    {
      id: 'pack_custom',
      name: 'Sur Mesure',
      price: 0,
      description: 'Analyse des besoins et services personnalisés',
      category: 'media',
    },
  ];

  // Insérer tous les packs
  for (const pack of [...webPacks, ...mediaPacks]) {
    await prisma.pack.upsert({
      where: { id: pack.id },
      update: pack,
      create: pack,
    });
  }

  console.log('Base de données initialisée avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
