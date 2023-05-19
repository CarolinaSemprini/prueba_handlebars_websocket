import express from 'express';

// Crear el enrutador
const router = express.Router();

// Ruta principal - Página de inicio
router.get('/', async(req, res) => {
  res.render('home');
});

// Ruta para la vista en tiempo real de productos
router.get('/realtimeproducts', async (req, res) => {
  res.render('realTimeProducts');
});

export default router;
