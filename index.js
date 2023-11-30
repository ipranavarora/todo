const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const TaskHandler = require('./TaskHandler');

const app = express();
const PORT = 3000;
const taskHandler = new TaskHandler();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// API to get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await taskHandler.getAllTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const { task } = req.body;
        const tasks = await taskHandler.addTask(task);
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const { task } = req.body;
        const tasks = await taskHandler.updateTask(taskId, task);
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const tasks = await taskHandler.deleteTask(taskId);
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`);
});
