export const API_BASE = 'http://localhost:5000';

export const apiRegister = (username, password) =>
        fetch(`${API_BASE}/auth/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
        })
        .then(r => r.json());

export const apiLogin = (username, password) =>
        fetch(`${API_BASE}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(r => r.json());

export const apiGetNotes = (token, username) =>
        fetch(`${API_BASE}/notes`, {
        headers: { 'Authorization': `Bearer ${token}`, 'X-Username': username }
        })
        .then(r => r.json());

export const apiCreateNote = (token, username, title, content) =>
        fetch(`${API_BASE}/notes`, {
         method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'X-Username': username },
        body: JSON.stringify({ title, content })
    })
    .then(r => r.json());