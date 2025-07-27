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

// Interceptador para adicionar autenticação Basic automaticamente
api.interceptors.request.use((config) => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  
  if (username && password) {
    const credentials = btoa(`${username}:${password}`);
    config.headers.Authorization = `Basic ${credentials}`;
  }
  return config;
});

// Serviços de usuário
export const userService = {
  // Criar usuário
  register: async (userData) => {
    try {
      const response = await api.post('/users/', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erro ao criar usuário';
    }
  },

  // Login - salvar credenciais para autenticação Basic
  login: async (credentials) => {
    try {
      // Para Basic Auth, apenas salvamos as credenciais
      localStorage.setItem('username', credentials.username);
      localStorage.setItem('password', credentials.password);
      
      // Testamos se as credenciais são válidas fazendo uma chamada para listar tarefas
      const testResponse = await api.get('/tasks/');
      return { success: true, message: 'Login realizado com sucesso' };
    } catch (error) {
      // Remove credenciais inválidas
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      throw error.response?.data || 'Erro ao fazer login';
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
};

// Serviços de tarefas
export const taskService = {
  // Listar todas as tarefas
  getTasks: async () => {
    try {
      const response = await api.get('/tasks/');
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erro ao buscar tarefas';
    }
  },

  // Criar nova tarefa
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks/', taskData);
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
