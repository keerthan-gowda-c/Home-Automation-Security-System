import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Viewlogs() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  const gettoggles = async () => {
    try {
      const response = await axios.post(
        'http://localhost/secureiot.php',
        new URLSearchParams({
          tag: 'gettoggles',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      setList(response.data);
    } catch (error) {
      console.error('Error fetching:', error);
      alert('Failed to fetch. Please try again later.');
    }
  };

  useEffect(() => {
    gettoggles();
  }, []);

  // Filter logs based on search term (case-insensitive)
  const filteredLogs = list.filter(item =>
    item.deviceId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='container'>
      <div className='card mt-4'>
        <div className='card-header text-center bg-secondary text-white'>
          <h4>View Logs</h4>
        </div>
        <div className='card-body'>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Search by Device ID'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Device ID</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.deviceId}</td>
                    <td>{item.datetime}</td>
                    <td>{item.status === '1' ? 'On' : 'Off'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='4' className='text-center'>
                    No matching logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
