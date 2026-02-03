import { type appUser } from '../types';

export function getAppUsers() {
    return fetch('http://localhost:8080/api/appUsers')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                return response.json();
            }
        })
    }