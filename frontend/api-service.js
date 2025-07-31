// services/api.js - Configuração para conectar com seu backend Spring Boot

import axios from 'axios';

// URL base do seu backend Spring Boot
const API_BASE_URL = 'http://localhost:8080';

// Configuração do Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para adicionar token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Serviços de usuário
export const userService = {
  // Criar usuário
  register: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erro ao criar usuário';
    }
  },

  // Login (se você implementar endpoint de login)
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.log(error)
      throw error.response?.data || 'Erro ao fazer login';
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  }
};

// Serviços de tarefas
export const taskService = {
  // Listar todas as tarefas
  getTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erro ao buscar tarefas';
    }
  },

  // Criar nova tarefa
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erro ao criar tarefa';
    }
  },

  // Buscar tarefa por ID
  getTaskById: async (id) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erro ao buscar tarefa';
    }
  },

  // Atualizar tarefa
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erro ao atualizar tarefa';
    }
  },

  // Deletar tarefa
  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || 'Erro ao deletar tarefa';
    }
  }
};

export default api;
