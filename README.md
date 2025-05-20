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
```

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

## Autor

**Santiago Civalero**  
📧 santiagocivalero@hotmail.com  
🔗 [GitHub](https://github.com/santicivalero)
