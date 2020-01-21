const token = localStorage.getItem('token') || null;

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

export { config };
