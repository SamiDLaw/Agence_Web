import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

export const InvoicePDF = ({ order }: any) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>FACTURE</Text>
        <Text style={pdfStyles.companyInfo}>
          Lawgency
          {'\n'}
          123 Rue du Commerce
          {'\n'}
          75001 Paris, France
          {'\n'}
          TVA : FR12345678901
        </Text>
      </View>

      <View style={pdfStyles.section}>
        <Text>Facture N° : {order.id}</Text>
        <Text>Date : {new Date(order.createdAt).toLocaleDateString()}</Text>
        <Text>Client : {order.customerDetails.name}</Text>
        <Text>Email : {order.customerDetails.email}</Text>
        {order.customerDetails.company && (
          <Text>Société : {order.customerDetails.company}</Text>
        )}
      </View>

      <View style={pdfStyles.section}>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableRow}>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>Description</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>Quantité</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>Prix unitaire</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>Total</Text>
            </View>
          </View>
          <View style={pdfStyles.tableRow}>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>{order.pack.name}</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>1</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>{order.amount}€</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>{order.amount}€</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={pdfStyles.section}>
        <Text>Total HT : {(order.amount * 0.8).toFixed(2)}€</Text>
        <Text>TVA (20%) : {(order.amount * 0.2).toFixed(2)}€</Text>
        <Text>Total TTC : {order.amount}€</Text>
      </View>

      <View style={pdfStyles.section}>
        <Text style={{ fontSize: 10, color: '#666666' }}>
          Conditions de paiement : Paiement à réception de facture
          {'\n'}
          En cas de retard de paiement, une pénalité de 3 fois le taux d&apos;intérêt légal sera appliquée
          {'\n'}
          Une indemnité forfaitaire de 40€ pour frais de recouvrement sera due en cas de retard de paiement
        </Text>
      </View>
    </Page>
  </Document>
);
