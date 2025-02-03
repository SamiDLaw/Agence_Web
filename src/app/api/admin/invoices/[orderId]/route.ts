import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import ReactPDF from '@react-pdf/renderer';
import { InvoicePDF } from '@/components/InvoicePDF';

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.orderId },
      include: { pack: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }

    const pdfStream = await ReactPDF.renderToStream(InvoicePDF({ order }));
    const chunks: Uint8Array[] = [];

    for await (const chunk of pdfStream) {
      chunks.push(chunk);
    }

    const pdfBuffer = Buffer.concat(chunks);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="facture-${order.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la génération de la facture:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
