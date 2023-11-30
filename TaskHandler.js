const fs = require('fs');
const path = require('path');

class TaskHandler {
    constructor() {
        this.filePath = path.join(__dirname, 'todos', 'tasks.json');
    }

    getAllTasks() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err.message);
                } else {
                    if (data.length === 0) {
                        resolve("No task found");
                    } else {
                        resolve(JSON.parse(data));
                    }
                }
            });
        });
    }

    addTask(task) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err.message);
                } else {
                    let tasks = JSON.parse(data);
                    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
                    tasks.push({ id: maxId + 1, task });
                    fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2), (err) => {
                        if (err) {
                            reject(err.message);
                        } else {
                            resolve(tasks);
                        }
                    });
                }
            });
        });
    }

    updateTask(taskId, newTask) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err.message);
                } else {
                    let tasks = JSON.parse(data);
                    tasks = tasks.map(t => (t.id === taskId ? { ...t, task: newTask } : t));
                    fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2), (err) => {
                        if (err) {
                            reject(err.message);
                        } else {
                            resolve(tasks);
                        }
                    });
                }
            });
        });
    }

    deleteTask(taskId) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err.message);
                } else {
                    let tasks = JSON.parse(data);
                    tasks = tasks.filter(t => t.id !== taskId);
                    fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2), (err) => {
                        if (err) {
                            reject(err.message);
                        } else {
                            resolve(tasks);
                        }
                    });
                }
            });
        });
    }
}

module.exports = TaskHandler;