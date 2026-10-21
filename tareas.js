
const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3003;














// Rutas inexistentes
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});


