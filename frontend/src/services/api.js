const API_BASE = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api`
    : 'http://localhost:5000/api';

const defaultFetch = async (url, options = {}) => {
    return fetch(url, {
        ...options,
        credentials: 'include', // Crucial for sending/receiving session cookies
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
    });
};

export const api = {
    // Health status
    getStatus: async () => {
        const res = await defaultFetch(`${API_BASE}/status`);
        if (!res.ok) throw new Error('Status check failed');
        return res.json();
    },

    // Startup Ideas
    getIdeas: async () => {
        const res = await defaultFetch(`${API_BASE}/ideas`);
        if (!res.ok) throw new Error('Failed to fetch ideas');
        return res.json();
    },

    createIdea: async (ideaData) => {
        const res = await defaultFetch(`${API_BASE}/ideas`, {
            method: 'POST',
            body: JSON.stringify(ideaData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to submit idea');
        return data;
    },

    deleteIdea: async (id) => {
        const res = await defaultFetch(`${API_BASE}/ideas/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete idea');
        return res.json();
    },

    // Auth & Session
    register: async (userData) => {
        const res = await defaultFetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');
        return data;
    },

    login: async (credentials) => {
        const res = await defaultFetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        return data;
    },

    getSession: async () => {
        const res = await defaultFetch(`${API_BASE}/auth/session`);
        if (!res.ok) return { authenticated: false, user: null };
        return res.json();
    },

    logout: async () => {
        const res = await defaultFetch(`${API_BASE}/auth/logout`, {
            method: 'POST'
        });
        return res.json();
    },

    getUsers: async () => {
        const res = await defaultFetch(`${API_BASE}/auth/users`);
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
    }
};
