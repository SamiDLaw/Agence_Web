import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Test la connexion
    await prisma.$connect()
    console.log('✅ Connexion à la base de données réussie')

    // Test une requête simple
    const packsCount = await prisma.pack.count()
    console.log(`Nombre de packs dans la base de données : ${packsCount}`)

    // Test une requête plus complexe
    const orders = await prisma.order.findMany({
      take: 5,
      include: {
        pack: true,
      },
    })
    console.log('Dernières commandes :', JSON.stringify(orders, null, 2))

  } catch (error) {
    console.error('❌ Erreur lors de la connexion à la base de données:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
