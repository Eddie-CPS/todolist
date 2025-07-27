// components/Register.jsx - Componente para registro de usuários

import React, { useState } from 'react';
import { userService } from '../services/api';

const Register = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erro do campo quando usuário digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username é obrigatório';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const user = await userService.register(formData);
      
      // Após registro bem-sucedido, fazer login automaticamente
      localStorage.setItem('username', formData.username);
      localStorage.setItem('password', formData.password);
      
      onUserCreated({ username: formData.username });
    } catch (error) {
      setErrors({ submit: error.message || 'Erro ao criar usuário' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>👤 Criar Usuário</h2>
        <p>Crie sua conta para gerenciar suas tarefas</p>

        {errors.submit && (
          <div className="error-message">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Nome Completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Seu nome completo"
              disabled={loading}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              placeholder="Seu username único"
              disabled={loading}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Sua senha (mín. 6 caracteres)"
              disabled={loading}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Usuário'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
