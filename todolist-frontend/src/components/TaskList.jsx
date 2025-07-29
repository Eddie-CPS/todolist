// components/TaskList.jsx - Componente para listar e gerenciar tarefas

import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Carregar tarefas quando componente montar
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      console.log('TaskList - loadTasks iniciado');
      setLoading(true);
      const tasksData = await taskService.getTasks();
      console.log('TaskList - Tarefas carregadas:', tasksData);
      setTasks(tasksData);
      setError(null);
    } catch (err) {
      console.error('TaskList - Erro ao carregar tarefas:', err);
      console.error('TaskList - Tipo do erro:', typeof err);
      console.error('TaskList - Erro.message:', err.message);
      setError('Erro ao carregar tarefas: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      console.log('TaskList - handleCreateTask chamado com:', taskData);
      const result = await taskService.createTask(taskData);
      console.log('TaskList - Tarefa criada com sucesso:', result);
      await loadTasks(); // Recarregar lista
      setShowForm(false);
    } catch (err) {
      console.error('TaskList - Erro ao criar tarefa:', err);
      setError('Erro ao criar tarefa: ' + err.message);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await taskService.updateTask(editingTask.id, taskData);
      await loadTasks(); // Recarregar lista
      setEditingTask(null);
    } catch (err) {
      setError('Erro ao atualizar tarefa: ' + err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      try {
        await taskService.deleteTask(taskId);
        await loadTasks(); // Recarregar lista
      } catch (err) {
        setError('Erro ao deletar tarefa: ' + err.message);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'alta': return '#ff4757';
      case 'media': return '#ffa502';
      case 'baixa': return '#2ed573';
      default: return '#747d8c';
    }
  };

  if (loading) return <div className="loading">Carregando tarefas...</div>;

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Minhas Tarefas</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Nova Tarefa
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
          isEditing={true}
        />
      )}

      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <div className="no-tasks">
            <p>Nenhuma tarefa encontrada</p>
            <p>Clique em "Nova Tarefa" para começar!</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <div className="task-actions">
                  <button 
                    className="btn btn-edit"
                    onClick={() => setEditingTask(task)}
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn btn-delete"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <p className="task-description">{task.description}</p>

              <div className="task-info">
                <span 
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  {task.priority || 'Normal'}
                </span>

                {task.startAt && (
                  <div className="task-date">
                    <strong>Início:</strong> {formatDate(task.startAt)}
                  </div>
                )}

                {task.endAt && (
                  <div className="task-date">
                    <strong>Fim:</strong> {formatDate(task.endAt)}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
