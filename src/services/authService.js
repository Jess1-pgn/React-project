import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // À adapter selon votre backend

const authService = {
  // Inscription
  register: async (username, email, password, firstName, lastName, role = 'USER') => {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      firstName,
      lastName,
      role,
    });
    return response.data;
  },

  // Connexion
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('user');
  },

  // Récupérer l'utilisateur actuel
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated:  () => {
    return !!localStorage.getItem('user');
  },

  // Récupérer le rôle
  getRole: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role;
  },

  // Récupérer le token
  getToken: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token;
  },
};

export default authService;