# To-Do API

## Description
This is a to-do task API, in its first version. The application includes authentication, route protection with JWT, user creation, and relationships between tasks and users.

## Project Status
In development

## Features
- User authentication.
- Route protection using JWT.
- Task creation and management.
- Relationship between tasks and users.
- **Future Features:**
  - Viewing tasks related to the user.
  - Role validation.
  - Email confirmation.
  - Execute seeds in a single endpoint.

## Technologies Used
- Node.js
- Express
- MongoDB

## Installation
1. Clone the repository.
2. Install dependencies:
    ```bash
    yarn install
    ```
3. Create a cluster in MongoDB Atlas.
4. Rename `.env.template` to `.env` and fill in the environment variables.
5. Run the application in development:
    ```bash
    yarn dev
    ```

6. Run the user and task seeds:
    ```bash
    http://localhost:3000/api/v1/seed/users
    http://localhost:3000/api/v1/seed/tasks
    ```

## Usage
### Endpoints

| Method | Endpoint                                             | Description                                           |
|--------|-----------------------------------------------------|-------------------------------------------------------|
| POST   | `http://localhost:3000/api/v1/users/register`      | Register a user (requires email and password in the body) |
| GET    | `http://localhost:3000/api/v1/users/verify/:token` | Verify a user with their token                       |
| POST   | `http://localhost:3000/api/v1/auth/login`          | Log in, returns a JWT                               |
| POST   | `http://localhost:3000/api/v1/tasks`                | Create a task, requires a JWT in the header         |
| GET    | `http://localhost:3000/api/v1/tasks/:term`         | Search for a specific task by title or status       |
| PUT    | `http://localhost:3000/api/v1/tasks/:id`           | Update a task by its ID, requires JWT               |
| GET    | `http://localhost:3000/api/v1/tasks?limit={number}&offset={number}` | Get all tasks with pagination                        |
| DELETE | `http://localhost:3000/api/v1/tasks/:id`           | Delete a task, requires JWT                          |

## License
This project is licensed under the MIT License.

## Credits
- Juan Sebastián Astudillo Ordoñez

## Contact
You can contact me at [sebastian.dev0708@gmail.com](mailto:sebastian.dev0708@gmail.com).

## Changelog
### v1.0.0
- First version released.
