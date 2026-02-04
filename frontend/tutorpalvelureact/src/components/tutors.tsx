/*
import React, { use, useEffect, useState } from 'react';
import { type appUser } from '../types';
import { getAppUsers } from '../appUserApi';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';


export default function AppUser() {
  const [appUser, setappUser] = useState<appUser[]>([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/tutors')
      .then((response) => response.json())
      .then((data) => setappUser(data))
      .catch((error) => console.error('Error fetching tutors:', error));
  }, []);

   const fetchCustomers = () => {
        getAppUsers()
            .then(data => setappUser(data._embedded.customers))
            .catch(err => console.error(err));
    };

useEffect(() => {
        fetchCustomers();
    }, []);
  
  }
*/
  //KESKEN//
export default function Tutors() {
  return(<h3>HEI!!!</h3>);
}