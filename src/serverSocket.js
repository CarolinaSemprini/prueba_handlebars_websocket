import { Server } from 'socket.io';
import ProductManager from './controllers/ProductManager.js'

const productManager = new  ProductManager("./src/models/products.json");

// Crear el servidor HTTP utilizando Express
const server = createServer(app);

// Crear el servidor de WebSockets utilizando el servidor HTTP
const io = new Server(server);

// Configurar Handlebars como el motor de plantillas
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Manejar la conexión de WebSockets
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
  
    // Manejar los eventos de creación y eliminación de productos
    socket.on('createProduct', async (product) => {
        await productManager.addProducts(product)
        generarProductList()
        console.log('Producto creado:', product);
      // Lógica para crear un nuevo producto
    });
  
    socket.on('deleteProduct', async(productId) => {
        await productManager.deleteProducts(productId)
        generarProductList()
      console.log('Producto eliminado:', productId);
      // Lógica para eliminar un producto
    });
  
    // Emitir la lista de productos actualizada
    const generarProductList = async () => {
        const products = await productManager.getProducts();
        socket.emit("productList", products);
      };
      generarProductList()

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
  });
  
  export default server