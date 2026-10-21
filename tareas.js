const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3005

let tareas = [];

app.get('/tareas', (req, res) => res.json(tareas));

app.get('/tareas/pendientes', (req, res) =>
    res.json(tareas.filter(t => t.estado === 'pendiente'))
);

app.get('/tareas/completadas', (req, res) =>
    res.json(tareas.filter(t => t.estado === 'completada'))
);

app.get('/tareas/:titulo', (req, res) => {
    const tarea = tareas.find(t => t.titulo === req.params.titulo);
    res.json(tarea || { mensaje: 'Tarea no encontrada' });
});

app.post('/tareas', (req, res) => {
    tareas.push(req.body);
    res.status(201).json(req.body);
});

app.put('/tareas/:id', (req, res) => {
    const i = tareas.findIndex(t => t.id == req.params.id);
    if (i < 0) return res.status(404).json({ mensaje: 'No encontrada' });
    tareas[i] = { ...tareas[i], ...req.body };
    res.json(tareas[i]);
});

app.patch('/tareas/:id/estado', (req, res) => {
    const t = tareas.find(t => t.id == req.params.id);
    if (!t) return res.status(404).json({ mensaje: 'No encontrada' });
    t.estado = req.body.estado;
    res.json(t);
});

app.delete('/tareas/:id', (req, res) => {
    tareas = tareas.filter(t => t.id != req.params.id);
    res.json({ mensaje: 'Tarea eliminada' });
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});
