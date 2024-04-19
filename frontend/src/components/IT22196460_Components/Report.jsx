import React from 'react';

const Report = ({ count, announcements }) => {
  return (
    <div>
      <h2>Daily Report</h2>
      <p>Total announcements generated today: {count}</p>
      <div>
        {announcements.map(announcement => (
          <div key={announcement.id}>
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
