import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFAnnouncementForm = ({ tableRef }) => {
  const generatePDF = () => {
    html2canvas(tableRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('announcement_report.pdf');
    });
  };

  return (
    <div className="text-center mt-5">
      <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Generate PDF</button>
    </div>
  );
};

export default PDFAnnouncementForm;
