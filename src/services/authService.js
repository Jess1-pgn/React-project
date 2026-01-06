import api from '../config/api';

const authService = {
  // Inscription
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  // Connexion
  login: async (username, password) => {
    const payload = { username, password };
    console.log('📤 Login payload:', payload);
    const response = await api.post('/auth/login', payload);
    console.log('✅ Login response:', response.data);
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