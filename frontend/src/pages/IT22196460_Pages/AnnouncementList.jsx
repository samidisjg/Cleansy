import React, { useState, useEffect } from 'react';

// Function to fetch announcements from the backend
async function getAnnouncements() {
  try {
      const response = await fetch('/api/announcements');
      if (!response.ok) {
          throw new Error('Failed to fetch announcements');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching announcements:', error.message);
      throw error;
  }
}

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    date: '',
    time: '',
    announcementType: '',
    category: '', // Additional filter criteria
    // Add more filter criteria as needed
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    // Fetch announcements from the API
    getAnnouncements()
      .then(data => {
        setAnnouncements(data);
        setFilteredAnnouncements(data); // Initially, set filtered announcements to all announcements
      })
      .catch(error => console.error('Error fetching announcements:', error));
  }, []);

  useEffect(() => {
    // Apply search and filters whenever announcements or filter criteria change
    applySearchAndFilter();
  }, [announcements, filterCriteria]);

  const applySearchAndFilter = () => {
    let filtered = announcements;

    // Apply search filter
    if (searchTerm !== '') {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    if (filterCriteria.date !== '') {
      filtered = filtered.filter(announcement =>
        // Implement logic to filter by date
        true // Placeholder logic comment
      );
    }
    if (filterCriteria.time !== '') {
      filtered = filtered.filter(announcement =>
        // Implement logic to filter by time
        true // Placeholder logic comment
      );
    }
    if (filterCriteria.announcementType !== '') {
      filtered = filtered.filter(announcement =>
        // Implement logic to filter by announcement type
        true // Placeholder logic comment
      );
    }
    if (filterCriteria.category !== '') {
      filtered = filtered.filter(announcement =>
        // Implement logic to filter by category
        true // Placeholder logic comment
      );
    }
    // Add more filter criteria logic as needed

    setFilteredAnnouncements(filtered);
  };

  const handleSearch = () => {
    applySearchAndFilter();
  };

  const handleFilterChange = (criteria, value) => {
    setFilterCriteria({ ...filterCriteria, [criteria]: value });
  };

  const handleFilterModalToggle = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleFilterModalClose = () => {
    setShowFilterModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <input
        type="text"
        placeholder="Search by keyword..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleSearch}
        className="w-full bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleFilterModalToggle}
        className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-md mr-4 mt-2"
      >
        Filter Options
      </button>
      {/* Filter options modal */}
      {showFilterModal && (
        <div className="absolute top-0 right-0 bg-white p-4 rounded-md shadow-lg mt-12 mr-4">
          {/* Render filter options here */}
          <select
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Filter by Date</option>
            {/* Render date filter options dynamically */}
          </select>
          {/* Add more filter options */}
          <button onClick={handleFilterModalClose} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
            OK
          </button>
        </div>
      )}
      {/* Background grid for announcements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 opacity-50">
        {announcements.map(announcement => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
      {/* Render announcement cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredAnnouncements.map(announcement => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementList;
