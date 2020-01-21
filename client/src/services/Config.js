const token = localStorage.token || null;

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

export { config };
