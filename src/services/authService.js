import api from '../config/api';

const authService = {
  // Inscription
  register: async (username, email, password, firstName, lastName, role = 'USER') => {
    const response = await api.post('/auth/register', {
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
    const response = await api.post('/auth/login', {
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