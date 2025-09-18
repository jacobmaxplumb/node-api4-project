const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
console.log(process.env.PORT);
console.log(process.env.SOMETHING);
const port = process.env.PORT || 8080;

app.use(express.json());

const todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
})

app.post('/todos', (req, res) => {
    const todo = {id: Date.now(), text: req.body.text, completed: false};
    todos.push(todo);
    res.status(201).json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({error: 'Todo not found'});
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
