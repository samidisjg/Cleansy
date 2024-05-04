import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center', // Center items horizontally
  },
  tableContainer: {
    width: '100%', // Adjust as needed
  },
  table: {
    display: 'table',
    width: '100%', // Fill the container
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 20, // Add space between title and table
  },
  tableRow: { 
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    padding: 5,
    fontSize: 12,
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    fontSize: 10,
  },
});

const PDFAnnouncementForm = ({ announcements }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Announcements</Text>
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Title</Text>
            <Text style={styles.tableColHeader}>Content</Text>
            <Text style={styles.tableColHeader}>Category ID</Text>
            <Text style={styles.tableColHeader}>Attachment URL</Text>
            <Text style={styles.tableColHeader}>Create At</Text>
          </View>
          {announcements.map((announcement) => (
            <View key={announcement._id} style={styles.tableRow}>
              <Text style={styles.tableCol}>{announcement.Title}</Text>
              <Text style={styles.tableCol}>{announcement.Content}</Text>
              <Text style={styles.tableCol}>{announcement.Category_ID}</Text>
              <Text style={styles.tableCol}>{announcement.Attachment_URL}</Text>
              <Text style={styles.tableCol}>{new Date(announcement.Create_At).toLocaleDateString()}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFAnnouncementForm;
