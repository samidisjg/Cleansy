const amenitiesBookingEmailTemplate = (residentName, amenityBookingData) => `
<!DOCTYPE html>
<html>
<head>
    <title>Amenity Booking Confirmation</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { padding: 20px; }
        .message { color: #333366; }
        .logo { max-width: 150px; }
    </style>
</head>
<body>
    <div class="container">
        
        <h1 class="message">Amenity Booking Confirmation</h1>
        <p>Hi ${residentName},</p>
        <p>Your service booking has been received and is currently ${amenityBookingData.bookingStatus}.</p>
        <p>Booking Details:</p>
        <ul>
            <li><strong>Service ID:</strong> ${amenityBookingData.bookingID}</li>
            <li><strong>Service Name:</strong> ${
                amenityBookingData.amenityTitle
            }</li>
            <li><strong>Booking Date:</strong> ${
                amenityBookingData.bookingDate
            }</li>
            <li><strong>Booking Time:</strong> ${
                amenityBookingData.bookingTime
            }</li>
            <li><strong>Booking Status:</strong> ${
                amenityBookingData.bookingStatus
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

export default amenitiesBookingEmailTemplate;