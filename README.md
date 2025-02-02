
# Task Manager Application

This is a simple task management application built with Angular 16 for the frontend and Spring Boot for the backend. The application allows users to manage tasks by creating, updating, deleting, and filtering tasks based on their completion status.

## How to Run the Application

### Backend (Spring Boot)
1. Clone the repository:
   
   git clone <YOUR_FORKED_REPO_URL>
   
2. Navigate to the backend directory:
   
    cd task-manager-backend

3. Run the backend application:
   - Using Maven:
     
     mvn spring-boot:run
     
   - The backend will start running on `http://localhost:8080`.

4. API Endpoints:
   - **GET /tasks**: Retrieve a paginated list of tasks, with optional filters for completion status.
   - **GET /tasks/{id}**: Get a specific task by its ID.
   - **POST /tasks**: Create a new task.
   - **PUT /tasks/{id}**: Update an existing task by its ID.
   - **DELETE /tasks/{id}**: Delete a task by its ID.

### Frontend (Angular 16 with PrimeNG)
1. Navigate to the frontend directory:
   
   cd task-manager-frontend
   
2. Install the dependencies:
   
   npm install
   
3. Run the Angular development server:
   
   ng serve
   
   - The frontend will be available at `http://localhost:4200`.

## Features Implemented in the Frontend
- **Task List**: Display tasks with pagination and sorting.
- **Filter Tasks**: Filter tasks by completion status (completed or in-progress).
- **Task Management**: Add, edit, and delete tasks using modals.
- **Task Completion**: Toggle task completion with checkboxes.
- **Confirmation Dialog**: Show a confirmation dialog before deleting a task.
- **Notifications**: Display success and error messages via toast notifications.

## Assumptions 
- **Assumption 1**: Task names cannot be empty or null. This is validated both on the frontend and backend.
- **Assumption 2**: The application focuses on basic task management (name and completion status) without additional features such as due dates or prioritization.
