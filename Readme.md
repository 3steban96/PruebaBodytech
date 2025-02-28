El proyecto se ejecuta mediante "node --watch server.js"
Backend
Servidor: Utiliza Express.js para manejar las solicitudes HTTP.
Archivo principal: server.js
Rutas: Define las rutas de la API en routes/route.js.
Controladores: Contiene la lógica de negocio para manejar las solicitudes en controllers/controllerUsers.js y controllers/controllerActivitis.js.
Base de Datos: Utiliza MySQL con el módulo mysql2/promise para la conexión y consultas a la base de datos. La configuración de la base de datos está en DB/DBConnect.js.
