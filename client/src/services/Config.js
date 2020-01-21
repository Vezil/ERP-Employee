import { store } from '../store';

const config = {
    headers: { Authorization: `Bearer ${localStorage.token}` }
};

export { config };
