import React, { useState, useEffect } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';
import { userService } from './services/api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  // Verificar se há usuário salvo no localStorage
  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    
    if (username && password) {
      setCurrentUser({ username });
    }
    setLoading(false);
  }, []);

  const handleUserCreated = (user) => {
    setCurrentUser(user);
    setShowRegister(false);
  };

  const handleLoginSuccess = () => {
    const username = localStorage.getItem('username');
    setCurrentUser({ username });
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      setCurrentUser(null);
      userService.logout();
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>📝 TodoList</h1>
          <p>Gerencie suas tarefas de forma eficiente</p>
        </header>

        {/* User Info (se logado) */}
        {currentUser && (
          <div className="user-info">
            <div className="user-welcome">
              Bem-vindo, <strong>{currentUser.username}</strong>!
            </div>
            <button 
              className="btn btn-secondary"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
        )}

        {/* Conteúdo principal */}
        {currentUser ? (
          <TaskList />
        ) : (
          <div>
            {showRegister ? (
              <div>
                <Register onUserCreated={handleUserCreated} />
                <div className="auth-switch">
                  <p>Já tem uma conta? 
                    <button 
                      className="btn-link" 
                      onClick={() => setShowRegister(false)}
                    >
                      Fazer Login
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <Login onLoginSuccess={handleLoginSuccess} />
                <div className="auth-switch">
                  <p>Não tem uma conta? 
                    <button 
                      className="btn-link" 
                      onClick={() => setShowRegister(true)}
                    >
                      Registrar-se
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
