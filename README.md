# Proyecto Backend II - Coderhouse

Servidor de backend para un ecommerce, desarrollado como parte del curso de Backend II en Coderhouse.  
Permite gestionar usuarios, productos y carritos, utilizando autenticación con JWT y Google OAuth, renderizado con Handlebars, y conexión a MongoDB Atlas.

## Tecnologías Utilizadas

- **Express**: Framework para construir APIs robustas en Node.js.
- **Mongoose**: ODM para manejar documentos MongoDB con validaciones y modelos.
- **MongoDB**: Base de datos NoSQL orientada a documentos.
- **Handlebars**: Motor de plantillas para renderizar vistas dinámicas.
- **Passport**: Middleware para autenticación local y con Google OAuth 2.0.
- **jsonwebtoken (JWT)**: Generación y validación de tokens de acceso.
- **express-session + connect-mongo**: Manejo de sesiones persistentes.
- **cookie-parser**: Lectura y escritura de cookies firmadas.
- **bcrypt**: Hashing seguro de contraseñas.
- **dotenv**: Manejo de variables de entorno desde archivos `.env`.
- **morgan**: Logger HTTP para desarrollo.
- **nodemailer**: Envío de correos electrónicos (verificación y recuperación de contraseña).
- **commander**: CLI interna para tareas administrativas.

## Arquitectura y Patrones Aplicados

Este proyecto implementa una **arquitectura por capas** que separa las responsabilidades y facilita la **escalabilidad**, el **testing** y el **mantenimiento**. Además, utiliza **patrones de diseño** ampliamente adoptados en proyectos backend.

### Arquitectura en Capas

- **Enrutador (`routes/`)**  
  Define los endpoints de la API y delega la lógica al controlador correspondiente. Cada recurso (`products`, `carts`, `users`, `auth`) tiene su propio archivo de rutas.

- **Controlador (`controllers/`)**  
  Orquesta las operaciones solicitadas por los endpoints. Se encarga de interpretar la solicitud y responder, delegando la lógica de negocio al servicio.

- **Servicio (`services/`)**  
  Contiene la lógica de negocio pura. Aquí se toman decisiones sobre qué hacer con los datos, sin preocuparse de cómo se obtienen o guardan. Llama al repositorio para interactuar con los datos.

- **Repositorio (`repositories/`)**  
  Actúa como intermediario entre el servicio y el DAO. Aplica patrones como DTO y desacopla la lógica de persistencia de la lógica de negocio.

### Patrones de Diseño

- **DAO (`dao/`)**  
  Implementa el acceso directo a los datos, ya sea en MongoDB, memoria o archivos (FS). Define operaciones CRUD básicas reutilizables.

- **Factory (`dao/factory.js`)**  
  Permite seleccionar dinámicamente el tipo de persistencia (**MongoDB**, **memoria** o **archivos**) según la variable de entorno `PERSISTENCE`, sin cambiar el resto de la aplicación.

- **DTO (`dto/`)**  
  (**Data Transfer Object**) Define estructuras claras y normalizadas para los datos que viajan desde y hacia el backend. Mejora la validación y consistencia entre capas.

## Servicio de Mailing

Este proyecto incluye un sistema de **mailing automatizado** mediante **Nodemailer**, con las siguientes funcionalidades:

- Envío de correo de verificación al registrarse.
- Envío de enlace para restablecer contraseña.
- Redirección del usuario a formularios para ingresar código de verificación o nueva contraseña.

Los correos se envían usando una cuenta de **Gmail** con [contraseñas de aplicación](https://myaccount.google.com/apppasswords).

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/santicivalero/proyecto_BACKENDII_CODERHOUSE_SantiagoCivalero
```

2. Navegar al directorio del proyecto:

```bash
cd nombre-del-directorio
```

3. Instalar dependencias:

```bash
npm install
```

4. Crear el archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=8080
URL_MONGO=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/<tu-bdd>
SECRET=tu_clave_secreta
GOOGLE_ID=tu_id_de_google
GOOGLE_SECRET=tu_secreto_de_google
GOOGLE_EMAIL=tu_email_de_google
GOOGLE_PASSWORD=tu_app_password_de_google
PERSISTENCE=persistencia(mongo -por defecto-, fs o memory)
URL=tu_url
```
- URL se utiliza para generar los enlaces de verificación y recuperación de contraseña que llegan por mail.

5. Iniciar el servidor:

```bash
npm run dev
```

> ⚠️ Es necesario tener una cuenta de MongoDB Atlas y credenciales de Google OAuth válidas.

## Endpoints de Autenticación (/api/auth)

- **POST /api/auth/register** → Registro de usuario local.
- **POST /api/auth/login** → Login local, genera cookie con token firmado.
- **POST /api/auth/signout** → Logout, limpia cookie.
- **GET /api/auth/online** → Devuelve datos del usuario logueado desde la cookie.
- **GET /api/auth/google** → Inicia autenticación con Google.
- **GET /api/auth/google/redirect** → Redirección tras login con Google.
- **GET /api/auth/bad-auth** → Ruta de error de autenticación.
- **GET /api/auth/forbidden** → Ruta de error por falta de permisos.
- **POST /api/auth/reset-password** → Envía un correo con enlace para restablecer contraseña.
- **PUT /api/auth/reset-password/:email** → Actualiza la contraseña del usuario.

## Endpoints de Carritos (/api/carts)

- **POST /** → Crea un nuevo carrito (usuario logueado).
- **GET /** → Obtiene todos los carritos (admin).
- **GET /:id** → Obtiene un carrito específico (dueño).
- **PUT /:id** → Actualiza datos del carrito (dueño).
- **DELETE /:id** → Elimina el carrito (dueño).
- **PUT /:cid/products/:pid** → Agrega o actualiza un producto dentro del carrito.
- **DELETE /:cid/products/:pid** → Quita un producto del carrito.
- **DELETE /:cid/products** → Vacía el carrito.

## Endpoints de Productos (/api/products)

- **GET /** → Lista de todos los productos.
- **GET /:id** → Detalles de un producto.
- **POST /** → Crea un producto (admin).
- **PUT /:id** → Modifica un producto existente (admin).
- **DELETE /:id** → Elimina un producto (admin).

## Endpoints de Usuarios (/api/users)

- **POST /** → Crea un nuevo usuario (admin).
- **GET /** → Lista de usuarios (admin).
- **GET /:id** → Detalle de usuario (admin).
- **PUT /:id** → Modifica su propio usuario (usuario).
- **DELETE /:id** → Elimina su propia cuenta (usuario).

## Rutas de Vistas (/)

- **GET /** → Home con productos.
- **GET /product/:pid** → Vista de detalle de producto.
- **GET /register** → Formulario de registro.
- **GET /login** → Formulario de login.
- **GET /profile** → Perfil del usuario autenticado.
- **GET /cart** → Carrito del usuario autenticado.
- **GET /reset-password** → Formulario para solicitar reset.
- **GET /reset-password/:email** → Formulario para ingresar nueva contraseña.



## Autor

**Santiago Civalero**  
📧 santiagocivalero@hotmail.com  
🔗 [GitHub](https://github.com/santicivalero)
