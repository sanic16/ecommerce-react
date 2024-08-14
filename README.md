# CORAL Y MAR

Pequeño ecommerce realizado con el stack MERN. El objetivo del proyecto es una introducción a tiendas en línea que en un futuro se pueda implementar con Next.js.

## Descargar el Software Necesario

Antes de comenzar, asegúrate de tener instalado el software necesario:

- **Node.js**: [Descargar Node.js](https://nodejs.org/) - Se requiere para ejecutar el proyecto. Asegúrate de instalar la versión LTS.

## Instalación

Sigue estos pasos para instalar y configurar el proyecto localmente:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/sanic16/ecommerce-react
   cd ecommerce-react
   ```

2. **Instala las dependencias de Node.js:**

   ```bash
   npm install
   ```

3. **Configura las Variables de Entorno:**

   Crea un archivo `.env` en la raíz del proyecto y copia el contenido del archivo `.env.example` en él. Luego, reemplaza los valores de las variables de entorno con los tuyos.

   ```bash
   NODE_ENV=development
   PORT=8000
   MONGO_URI=tu_mongo_uri_aqui
   JWT_SECRET=tu_secreto_jwt
   PAYPAL_CLIENT_ID=tu_paypal_client_id
   ```

4. **Inicia el Servidor de Desarrollo:**

   ```bash
    npm run dev
   ```

   El servidor de desarrollo se iniciará en [http://localhost:8000](http://localhost:8000).

5. **Inicia el Cliente de React:**

   Abre una nueva terminal y navega a la carpeta `frontend`:

   ```bash
   cd frontend
   ```

   Luego, inicia el cliente de React:

   ```bash
   npm start
   ```

   El cliente de React se iniciará en [http://localhost:5173](http://localhost:5173).
