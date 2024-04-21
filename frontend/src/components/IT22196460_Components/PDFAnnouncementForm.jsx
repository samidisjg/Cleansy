import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 120,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
});

const PDFAnnouncementForm = ({ announcements }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Announcement List</Text>
      {announcements.map((announcement) => (
        <View key={announcement._id} style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.value}>{announcement.Title}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Content:</Text>
            <Text style={styles.value}>{announcement.Content}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Category ID:</Text>
            <Text style={styles.value}>{announcement.Category_ID}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Attachment URL:</Text>
            <Text style={styles.value}>{announcement.Attachment_URL}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Create At:</Text>
            <Text style={styles.value}>{new Date(announcement.Create_At).toLocaleDateString()}</Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default PDFAnnouncementForm;
