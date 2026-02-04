
export function getAppUsers() {
    return fetch('http://localhost:8080/api/tutors')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}