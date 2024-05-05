const serviceBookingEmailTemplate = (residentName, bookingDetails) => `
<!DOCTYPE html>
<html>
<head>
    <title>Service Booking Confirmation</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { padding: 20px; }
        .message { color: #333366; }
        .logo { max-width: 150px; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="message">Service Booking Confirmation</h1>
        <p>Hi ${residentName},</p>
        <p>Your service booking has been received and is currently ${bookingDetails.bookingStatus.toLowerCase()}.</p>
        <p>Booking Details:</p>
        <ul>
            <li><strong>Service ID:</strong> ${bookingDetails.serviceID}</li>
            <li><strong>Booking ID:</strong> ${
              bookingDetails.serviceBookingID
            }</li>
            <li><strong>Service Name:</strong> ${
              bookingDetails.serviceName
            }</li>
            <li><strong>Booking Date:</strong> ${
              bookingDetails.bookingDate
            }</li>
            <li><strong>Booking Time:</strong> ${
              bookingDetails.bookingTime
            }</li>
            <li><strong>Booking Status:</strong> ${
              bookingDetails.bookingStatus
            }</li>
        </ul>
        <br />
        <p>Thank you for choosing our service!</p>
        <p>The Cleansy Team</p>
        <img src="https://i.ibb.co/6syfN7M/cleansy.png" alt="Company Logo" class="logo">
    </div>
</body>
</html>
`;

export default serviceBookingEmailTemplate;
