
import React, { use, useEffect, useState } from 'react';
import { type appUser } from '../types';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

// Tutoreiden listaaminen DataGridillä
export default function AppUser() {
  const [appUser, setappUser] = useState<appUser[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/tutors')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setappUser(data);
      })
      .catch(err => console.error('Error fetching tutors:', err));
  }, []);



  const columns: GridColDef[] = [
    { field: 'firstname', headerName: 'First name', width: 130 },
    { field: 'lastname', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'school', headerName: 'School', width: 150 },
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'subjects', headerName: 'Subjects', width: 200, valueGetter: (params) => params.row.subjects?.map((subject: { name: string }) => subject.name).join(', ') || '' },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={appUser}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5]}
      />
    </div>
  );

}

