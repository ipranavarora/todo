const fs = require('fs').promises;
const path = require('path');

class TaskHandler {
    constructor() {
        this.filePath = path.join(__dirname, 'todos', 'tasks.json');
    }

    async readTasksFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    async writeTasksFile(tasks) {
        await fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2));
    }

    async getAllTasks() {
        const tasks = await this.readTasksFile();
        return tasks.length === 0 ? 'No task found' : tasks;
    }

    async addTask(task) {
        const tasks = await this.readTasksFile();
        const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
        tasks.push({ id: maxId + 1, task });
        await this.writeTasksFile(tasks);
        return tasks;
    }

    async updateTask(taskId, newTask) {
        let tasks = await this.readTasksFile();
        tasks = tasks.map(t => (t.id === taskId ? { ...t, task: newTask } : t));
        await this.writeTasksFile(tasks);
        return tasks;
    }

    async deleteTask(taskId) {
        let tasks = await this.readTasksFile();
        tasks = tasks.filter(t => t.id !== taskId);
        await this.writeTasksFile(tasks);
        return tasks;
    }
}

module.exports = TaskHandler;
