/**
 * TaskFlow - A simple task management application
 * Manages task creation, editing, deletion, and persistence using localStorage
 */
class TaskFlow {
    /**
     * Constructor - Initializes the TaskFlow application
     * Loads existing tasks from storage, sets up event listeners, and renders the UI
     */
    constructor() {
        try {
            this.tasks = this.loadTasks();
            this.taskIdCounter = this.getNextTaskId();
            this.initializeApp();
            this.bindEvents();
            this.renderTasks();
            this.updateStats();
        } catch (error) {
            console.error('Failed to initialize TaskFlow:', error);
            this.showNotification('Failed to initialize the application. Please refresh the page.', 'error');
        }
    }

    /**
     * Initializes the application and displays a welcome message
     */
    initializeApp() {
        try {
            console.log('TaskFlow initialized successfully!');
            this.showWelcomeMessage();
        } catch (error) {
            console.error('Error during app initialization:', error);
        }
    }

    /**
     * Displays a welcome message if no tasks exist
     */
    showWelcomeMessage() {
        try {
            if (this.tasks.length === 0) {
                console.log('Welcome to TaskFlow! Add your first task to get started.');
            }
        } catch (error) {
            console.error('Error showing welcome message:', error);
        }
    }

    /**
     * Binds DOM event listeners for task input and add button
     * Handles both click and Enter key events for adding tasks
     */
    bindEvents() {
        try {
            const addTaskBtn = document.getElementById('addTaskBtn');
            const taskInput = document.getElementById('taskInput');

            if (!addTaskBtn) {
                throw new Error('Add task button element not found');
            }
            if (!taskInput) {
                throw new Error('Task input element not found');
            }

            addTaskBtn.addEventListener('click', () => this.addTask());

            taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addTask();
                }
            });

            taskInput.focus();
        } catch (error) {
            console.error('Error binding events:', error);
            this.showNotification('Failed to bind event listeners.', 'error');
        }
    }

    /**
     * Adds a new task to the list
     * Validates input, creates task object, saves to storage, and updates UI
     */
    addTask() {
        try {
            const taskInput = document.getElementById('taskInput');

            if (!taskInput) {
                throw new Error('Task input element not found');
            }

            const taskText = taskInput.value.trim();

            if (taskText === '') {
                this.showNotification('Please enter a task description', 'warning');
                taskInput.focus();
                return;
            }

            if (taskText.length > 500) {
                this.showNotification('Task description is too long (max 500 characters)', 'warning');
                return;
            }

            const newTask = {
                id: this.taskIdCounter++,
                text: taskText,
                completed: false,
                createdAt: new Date().toISOString(),
                completedAt: null
            };

            this.tasks.push(newTask);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();

            taskInput.value = '';
            taskInput.focus();

            this.showNotification('Task added successfully!', 'success');
        } catch (error) {
            console.error('Error adding task:', error);
            this.showNotification('Failed to add task. Please try again.', 'error');
        }
    }

    /**
     * Deletes a task from the list after confirmation
     * @param {number} taskId - The ID of the task to delete
     */
    deleteTask(taskId) {
        try {
            if (typeof taskId !== 'number' || taskId < 0) {
                throw new Error('Invalid task ID');
            }

            if (confirm('Are you sure you want to delete this task?')) {
                const initialLength = this.tasks.length;
                this.tasks = this.tasks.filter(task => task.id !== taskId);

                if (this.tasks.length === initialLength) {
                    throw new Error('Task not found');
                }

                this.saveTasks();
                this.renderTasks();
                this.updateStats();
                this.showNotification('Task deleted successfully!', 'success');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            this.showNotification('Failed to delete task. Please try again.', 'error');
        }
    }

    /**
     * Toggles the completion status of a task
     * @param {number} taskId - The ID of the task to toggle
     */
    toggleTask(taskId) {
        try {
            if (typeof taskId !== 'number' || taskId < 0) {
                throw new Error('Invalid task ID');
            }

            const task = this.tasks.find(task => task.id === taskId);
            if (!task) {
                throw new Error('Task not found');
            }

            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;

            this.saveTasks();
            this.renderTasks();
            this.updateStats();

            const message = task.completed ? 'Task completed! 🎉' : 'Task marked as pending';
            this.showNotification(message, 'success');
        } catch (error) {
            console.error('Error toggling task:', error);
            this.showNotification('Failed to update task. Please try again.', 'error');
        }
    }

    /**
     * Edits the text of an existing task
     * @param {number} taskId - The ID of the task to edit
     */
    editTask(taskId) {
        try {
            if (typeof taskId !== 'number' || taskId < 0) {
                throw new Error('Invalid task ID');
            }

            const task = this.tasks.find(task => task.id === taskId);
            if (!task) {
                throw new Error('Task not found');
            }

            const newText = prompt('Edit task:', task.text);

            if (newText !== null && newText.trim() !== '') {
                if (newText.trim().length > 500) {
                    this.showNotification('Task description is too long (max 500 characters)', 'warning');
                    return;
                }

                task.text = newText.trim();
                this.saveTasks();
                this.renderTasks();
                this.showNotification('Task updated successfully!', 'success');
            }
        } catch (error) {
            console.error('Error editing task:', error);
            this.showNotification('Failed to edit task. Please try again.', 'error');
        }
    }

    /**
     * Renders all tasks to the DOM
     * Sorts tasks by completion status and creation date
     * Displays empty state if no tasks exist
     */
    renderTasks() {
        try {
            const tasksList = document.getElementById('tasksList');
            const emptyState = document.getElementById('emptyState');

            if (!tasksList) {
                throw new Error('Tasks list element not found');
            }
            if (!emptyState) {
                throw new Error('Empty state element not found');
            }

            if (this.tasks.length === 0) {
                tasksList.style.display = 'none';
                emptyState.style.display = 'block';
                return;
            }

            tasksList.style.display = 'flex';
            emptyState.style.display = 'none';

            const sortedTasks = [...this.tasks].sort((a, b) => {
                if (a.completed !== b.completed) {
                    return a.completed - b.completed;
                }
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            tasksList.innerHTML = sortedTasks.map(task => `
                <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                    <div class="task-content">
                        <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                             onclick="taskFlow.toggleTask(${task.id})">
                        </div>
                        <span class="task-text">${this.escapeHtml(task.text)}</span>
                    </div>
                    <div class="task-actions">
                        <button class="task-btn edit-btn" onclick="taskFlow.editTask(${task.id})" title="Edit task">
                            ✏️
                        </button>
                        <button class="task-btn delete-btn" onclick="taskFlow.deleteTask(${task.id})" title="Delete task">
                            🗑️
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error rendering tasks:', error);
            this.showNotification('Failed to render tasks. Please refresh the page.', 'error');
        }
    }

    /**
     * Updates task statistics displayed in the UI
     * Calculates total, completed, and pending task counts
     */
    updateStats() {
        try {
            const totalTasks = this.tasks.length;
            const completedTasks = this.tasks.filter(task => task.completed).length;
            const pendingTasks = totalTasks - completedTasks;

            const totalElement = document.getElementById('totalTasks');
            const completedElement = document.getElementById('completedTasks');
            const pendingElement = document.getElementById('pendingTasks');
            const taskCountElement = document.getElementById('taskCount');

            if (!totalElement || !completedElement || !pendingElement) {
                throw new Error('Required stat elements not found');
            }

            totalElement.textContent = totalTasks;
            completedElement.textContent = completedTasks;
            pendingElement.textContent = pendingTasks;

            if (taskCountElement) {
                taskCountElement.textContent = `${totalTasks} ${totalTasks === 1 ? 'task' : 'tasks'}`;
            }
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }

    /**
     * Saves tasks to browser's localStorage
     * Handles errors gracefully if storage is unavailable
     */
    saveTasks() {
        try {
            if (!Array.isArray(this.tasks)) {
                throw new Error('Tasks is not a valid array');
            }

            localStorage.setItem('taskflow_tasks', JSON.stringify(this.tasks));
            localStorage.setItem('taskflow_counter', this.taskIdCounter.toString());
        } catch (error) {
            console.error('Failed to save tasks:', error);

            if (error.name === 'QuotaExceededError') {
                this.showNotification('Storage quota exceeded. Please delete some tasks.', 'error');
            } else if (error.message.includes('private')) {
                this.showNotification('Cannot save tasks in private browsing mode.', 'error');
            } else {
                this.showNotification('Failed to save tasks. Please check your browser storage.', 'error');
            }
        }
    }

    /**
     * Loads tasks from browser's localStorage
     * Returns empty array if no tasks exist or if loading fails
     * @returns {Array} Array of task objects
     */
    loadTasks() {
        try {
            const saved = localStorage.getItem('taskflow_tasks');

            if (!saved) {
                return [];
            }

            const tasks = JSON.parse(saved);

            if (!Array.isArray(tasks)) {
                throw new Error('Invalid tasks format: expected array');
            }

            return tasks;
        } catch (error) {
            console.error('Failed to load tasks:', error);
            this.showNotification('Failed to load tasks. Starting with fresh list.', 'warning');
            return [];
        }
    }

    /**
     * Retrieves the next task ID from storage
     * Ensures unique IDs across sessions
     * @returns {number} Next available task ID
     */
    getNextTaskId() {
        try {
            const saved = localStorage.getItem('taskflow_counter');

            if (!saved) {
                return 1;
            }

            const counter = parseInt(saved, 10);

            if (isNaN(counter) || counter < 1) {
                throw new Error('Invalid counter value');
            }

            return counter;
        } catch (error) {
            console.error('Failed to load task counter:', error);
            return 1;
        }
    }

    /**
     * Escapes HTML special characters to prevent XSS attacks
     * @param {string} unsafe - The unsafe HTML string
     * @returns {string} The escaped HTML string
     */
    escapeHtml(unsafe) {
        try {
            if (typeof unsafe !== 'string') {
                return String(unsafe);
            }

            return unsafe
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        } catch (error) {
            console.error('Error escaping HTML:', error);
            return String(unsafe);
        }
    }

    /**
     * Displays a notification message to the user
     * Automatically dismisses after 3 seconds
     * @param {string} message - The notification message
     * @param {string} type - The notification type (success, error, warning, info)
     */
    showNotification(message, type = 'info') {
        try {
            if (typeof message !== 'string' || message.trim() === '') {
                throw new Error('Invalid notification message');
            }

            console.log(`[${type.toUpperCase()}] ${message}`);

            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.3s ease;
                max-width: 300px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            `;

            const colors = {
                success: '#48bb78',
                error: '#e53e3e',
                warning: '#ed8936',
                info: '#3182ce'
            };

            notification.style.background = colors[type] || colors.info;
            notification.textContent = message;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateY(0)';
            }, 100);

            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }

    /**
     * Exports all tasks as a JSON file for backup purposes
     * Triggers download in user's browser
     */
    exportTasks() {
        try {
            if (!Array.isArray(this.tasks) || this.tasks.length === 0) {
                this.showNotification('No tasks to export', 'warning');
                return;
            }

            const dataStr = JSON.stringify(this.tasks, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `taskflow_backup_${new Date().toISOString().split('T')[0]}.json`;
            link.click();

            URL.revokeObjectURL(url);
            this.showNotification('Tasks exported successfully!', 'success');
        } catch (error) {
            console.error('Error exporting tasks:', error);
            this.showNotification('Failed to export tasks. Please try again.', 'error');
        }
    }

    /**
     * Clears all tasks after user confirmation
     * This action cannot be undone without a backup
     */
    clearAllTasks() {
        try {
            if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
                if (confirm('This is your last chance! Delete all tasks?')) {
                    this.tasks = [];
                    this.saveTasks();
                    this.renderTasks();
                    this.updateStats();
                    this.showNotification('All tasks cleared!', 'success');
                }
            }
        } catch (error) {
            console.error('Error clearing all tasks:', error);
            this.showNotification('Failed to clear tasks. Please try again.', 'error');
        }
    }

    /**
     * Calculates and returns comprehensive task statistics
     * Includes total, completed, pending, created today, and completed today counts
     * @returns {Object} Statistics object with task counts
     */
    getTaskStats() {
        try {
            const now = new Date();

            if (!Array.isArray(this.tasks)) {
                throw new Error('Tasks is not a valid array');
            }

            const stats = {
                total: this.tasks.length,
                completed: this.tasks.filter(t => t.completed).length,
                pending: this.tasks.filter(t => !t.completed).length,
                createdToday: this.tasks.filter(t => {
                    try {
                        const taskDate = new Date(t.createdAt);
                        return taskDate.toDateString() === now.toDateString();
                    } catch (error) {
                        console.error('Error parsing task date:', error);
                        return false;
                    }
                }).length,
                completedToday: this.tasks.filter(t => {
                    try {
                        if (!t.completedAt) return false;
                        const completedDate = new Date(t.completedAt);
                        return completedDate.toDateString() === now.toDateString();
                    } catch (error) {
                        console.error('Error parsing completion date:', error);
                        return false;
                    }
                }).length
            };

            return stats;
        } catch (error) {
            console.error('Error calculating stats:', error);
            return {
                total: 0,
                completed: 0,
                pending: 0,
                createdToday: 0,
                completedToday: 0
            };
        }
    }
}

/**
 * Initialize the TaskFlow application when the DOM has fully loaded
 * This ensures all required DOM elements exist before creating the TaskFlow instance
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.taskFlow = new TaskFlow();
        console.log('Application ready');
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});

/**
 * Export for testing purposes
 * Allows the class to be imported in test environments
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TaskFlow;
}
