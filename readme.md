# To-Do API

## Descripción
Esta es una API de tareas por hacer, en su primera versión. La aplicación cuenta con autenticación, protección de rutas con JWT, creación de usuarios y relaciones entre tareas y usuarios.

## Estado del Proyecto
En desarrollo

## Características
- Autenticación de usuarios.
- Protección de rutas utilizando JWT.
- Creación y gestión de tareas.
- Relación entre tareas y usuarios.
- **Futuras características:**
  - Visualización de tareas relacionadas con el usuario.
  - Validación de roles.
  - Confirmación por correo electrónico.
  - Ejecutar semillas en un solo endpoint

## Tecnologías Usadas
- Node.js
- Express
- MongoDB

## Instalación
1. Clonar el repositorio.
2. Instalar las dependencias
    ```
    yarn install
    ```
3. Crear un cluster en MongoDB Atlas.
4. Renombrar `.env.template` a `.env` y rellenar las variables de entorno.
5. Ejecutar la aplicacion en desarrollo
    ```
    yarn dev
    ```

4. Ejecutar las semillas de usuario y tareas.

        ```
         http://localhost:3000/api/v1/seed/users
        http://localhost:3000/api/v1/seed/tasks
        ```

## Uso
### Endpoints

| Método | Endpoint                                             | Descripción                                           |
|--------|-----------------------------------------------------|-------------------------------------------------------|
| POST   | `http://localhost:3000/api/v1/users/register`      | Registrar un usuario (requiere email y password en el body) |
| GET    | `http://localhost:3000/api/v1/users/verify/:token` | Verificar un usuario con su token                     |
| POST   | `http://localhost:3000/api/v1/auth/login`          | Iniciar sesión, retorna un JWT                        |
| POST   | `http://localhost:3000/api/v1/tasks`                | Crear tarea, requiere un JWT en el header             |
| GET    | `http://localhost:3000/api/v1/tasks/:term`         | Buscar una tarea específica por título o estado       |
| PATCH  | `http://localhost:3000/api/v1/tasks/:id`           | Actualizar una tarea por su ID, requiere JWT         |
| GET    | `http://localhost:3000/api/v1/tasks?limit={number}&offset={number}`      | Obtener todas las tareas paginadas                    |
| DELETE | `http://localhost:3000/api/v1/tasks/:id`           | Borrar tarea, requiere JWT                            |



## Licencia
Este proyecto está bajo la Licencia MIT.

## Créditos
- Juan Sebastián Astudillo Ordoñez

## Contacto
Puedes contactarme en [sebastian.dev0708@gmail.com](mailto:sebastian.dev0708@gmail.com).

## Changelog
### v1.0.0
- Primera versión lanzada.
