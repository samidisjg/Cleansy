import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import image from "/cleansyBG.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    position: 'relative', 
  },
  watermark: {
    position: 'relative',
    top: '40%', 
    left: '10%', 
    transform: 'translate(-50%, -50%)', 
    opacity: 2, 
    zIndex: -1, 
  },
  titleContainer: {
    position: 'absolute', 
    top: 20, 
    left: 20, 
    textAlign: 'center',
  },
  title: {
    position: 'relative',
    fontSize: 20,
    marginBottom: 80,
    textAlign: 'center',
  },
  
  tableContainer: {
    width: '100%', 
    position: 'absolute',
    top: 100, 
  },
  table: {
    display: 'table',
    width: '100%', 
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 20, 
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
    backgroundColor: '#AED6F1', // Blue color for column headers
    textAlign: 'center',
    padding: 5,
    fontSize: 12,
    color: 'black', // White text color for contrast
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
      {/* Watermark */}
      <Image src={image} style={styles.watermark} />
      
      {/* Titles positioned at the top */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cleansy Sustainable Community Management System Pvt Ltd Announcements</Text>
      </View>
      
      {/* Table positioned below the titles */}
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Title</Text>
            <Text style={styles.tableColHeader}>Content</Text>
            <Text style={styles.tableColHeader}>Category ID</Text>
            <Text style={styles.tableColHeader}>Attachment URL</Text>
            <Text style={styles.tableColHeader}>Create At</Text>
          </View>
          {announcements && announcements.map((announcement) => (
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