import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import qrcode from 'qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from 'flowbite-react';

export default function ParkingslotOrder() {
    let parms = useParams();

    const [carparkListing, setCarparkListing] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const qrCodeRef = useRef(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/carparkListing/get/${parms.carparkListingId}`);
                const data = await res.json();
                console.log(data);
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setCarparkListing(data); 
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }    
        };
        fetchListing();
    }, [parms.carparkListingId]);

    useEffect(() => {
        if (carparkListing !== '') {
            qrcode.toDataURL(`${carparkListing._id}`, (err, url) => {
                if (err) {
                    console.error('Error generating QR code:', err);
                } else {
                    setQrCodeUrl(url);
                }
            });
        }
    }, [carparkListing]);

    const downloadQRAsPDF = () => {
        if (qrCodeRef.current) {
            html2canvas(qrCodeRef.current)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    const imgWidth = 210;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                    pdf.save('QR_Code.pdf');
                })
                .catch((error) => {
                    console.error('Error converting QR code to PDF:', error);
                });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-4">
                <p className="text-4xl font-bold">Slot Details</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-96">
                <div className="grid gap-4">
                    <div>
                        <p className="text-lg font-semibold mb-2 dark:text-slate-700">Owner Name: <span className='font-bold'>{carparkListing.ownerName}</span></p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-2 dark:text-slate-700">Email: <span className='font-bold'>{carparkListing.email}</span></p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-2 dark:text-slate-700">Tel No: <span className='font-bold'>{carparkListing.telNo}</span></p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-2 dark:text-slate-700">Vehicle Type: <span className='font-bold'>{carparkListing.vehicleType}</span></p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-2 dark:text-slate-700">Vehicle Number: <span className='font-bold'>{carparkListing.vehicleNum}</span></p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-2 dark:text-slate-700">NIC: <span className='font-bold'>{carparkListing.nic}</span></p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-2 dark:text-slate-700">Slot No: <span className='font-bold'>{carparkListing.slotId}</span></p>
                    </div>
                </div>
            </div>
            {qrCodeUrl && (
                <div className="mt-8">
                    <div ref={qrCodeRef}>
                        <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40 mb-4" />
                    </div>
                    <Button onClick={downloadQRAsPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-center">
                        Download QR as PDF
                    </Button>
                </div>
            )}
        </div>
    );
}
