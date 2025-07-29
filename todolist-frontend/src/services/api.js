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
  
  console.log('API - Interceptor request:', {
    url: config.url,
    method: config.method,
    username: username,
    hasPassword: !!password
  });
  
  if (username && password) {
    const credentials = btoa(`${username}:${password}`);
    config.headers.Authorization = `Basic ${credentials}`;
    console.log('API - Authorization header adicionado');
  } else {
    console.log('API - Sem credenciais no localStorage');
  }
  return config;
});

// Interceptador para tratar respostas de erro
api.interceptors.response.use(
  (response) => {
    console.log('API - Resposta bem-sucedida:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API - Erro na resposta:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

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
      console.log('API - getTasks chamado');
      const response = await api.get('/tasks/');
      console.log('API - getTasks resposta:', response.data);
      return response.data;
    } catch (error) {
      console.error('API - Erro ao buscar tarefas:', error);
      console.error('API - Status do erro:', error.response?.status);
      console.error('API - Dados do erro:', error.response?.data);
      console.error('API - Mensagem do erro:', error.message);
      
      // Melhor tratamento do erro
      if (error.response?.data) {
        throw new Error(typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data));
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Erro ao buscar tarefas');
      }
    }
  },

  // Criar nova tarefa
  createTask: async (taskData) => {
    try {
      console.log('API - createTask chamado com:', taskData);
      console.log('API - URL:', 'http://localhost:8080/tasks/');
      const response = await api.post('/tasks/', taskData);
      console.log('API - Resposta do servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('API - Erro na requisição:', error);
      console.error('API - Status:', error.response?.status);
      console.error('API - Resposta de erro:', error.response?.data);
      console.error('API - Erro completo:', error.message);
      
      // Melhor tratamento do erro
      if (error.response?.data) {
        throw new Error(typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data));
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Erro ao criar tarefa');
      }
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
