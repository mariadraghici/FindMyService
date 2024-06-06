import http from "k6/http";
export let options = {
    stages: [
        { duration: '0.5m', target: 3 }, // simulate ramp-up of traffic from 1 to 3 virtual users over 0.5 minutes.
        { duration: '0.5m', target: 4}, // stay at 4 virtual users for 0.5 minutes
        { duration: '0.5m', target: 0 }, // ramp-down to 0 users
      ],
 };
 
export default function() {
    const url = 'http://localhost:8000/api/signin/';
    const payload = JSON.stringify({
      email: 'mariatugearu2001@gmail.com',
      password: 'Maria1234!',
    });
  
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    http.post(url, payload, params);
    // http.get('http://localhost:8000/');
};