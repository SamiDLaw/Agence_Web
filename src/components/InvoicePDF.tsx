import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

interface InvoicePDFProps {
  order: any;
}

export const InvoicePDF = ({ order }: InvoicePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Facture</Text>
        <Text style={styles.text}>Numéro de commande: {order.id}</Text>
        <Text style={styles.text}>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.text}>Pack: {order.pack.name}</Text>
        <Text style={styles.text}>Montant: {order.amount}€</Text>
      </View>
    </Page>
  </Document>
);
