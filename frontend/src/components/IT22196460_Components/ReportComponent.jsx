import React, { useState } from 'react';
import { fetchDailyReport, fetchMonthlyReport } from '../api/reportApi'; // Import API functions for fetching reports

const ReportComponent = () => {
    const [dailyReport, setDailyReport] = useState({});
    const [monthlyReport, setMonthlyReport] = useState({});

    const generateDailyReport = async () => {
        try {
            const response = await fetchDailyReport();
            setDailyReport(response.data);
        } catch (error) {
            console.error('Error generating daily report:', error.message);
        }
    };

    const generateMonthlyReport = async () => {
        try {
            const response = await fetchMonthlyReport();
            setMonthlyReport(response.data);
        } catch (error) {
            console.error('Error generating monthly report:', error.message);
        }
    };

    return (
        <div>
            <button onClick={generateDailyReport}>Generate Daily Report</button>
            <button onClick={generateMonthlyReport}>Generate Monthly Report</button>

            {/* Display daily report */}
            <h2>Daily Report</h2>
            <p>Total Announcements: {dailyReport.count}</p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyReport.announcements && dailyReport.announcements.map((announcement) => (
                        <tr key={announcement.Announcement_ID}>
                            <td>{announcement.Announcement_ID}</td>
                            <td>{announcement.Title}</td>
                            <td>{announcement.Content}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Display monthly report */}
            <h2>Monthly Report</h2>
            {/* Add logic to display monthly report here */}
        </div>
    );
};

export default ReportComponent;
