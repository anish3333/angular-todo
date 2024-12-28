# Todo Application with Angular and Firebase

This is a simple Todo application built with **Angular** and **Firebase**. The project demonstrates how to manage tasks in a simple and beginner-friendly way.

## Features

- Add, edit, delete, and mark tasks as completed.
- Sync data with Firebase for real-time updates.
- Built using Angular, following best practices.

---

## Prerequisites

Before starting, ensure you have the following installed on your machine:

1. [Node.js](https://nodejs.org/) (LTS version recommended)
2. Angular CLI: Install with `npm install -g @angular/cli`

---


## Environment Configuration

In your Angular project, you need to create an environment file for managing Firebase API keys and other configurations.

1. **Generate Environments**
   Run the following command to generate environment files:
   ```bash
   ng g environments
   ```

2. **Update `environment.development.ts`**
   Replace the contents of `environment.development.ts` with the following:
   ```typescript
   export const environment = {
     GEMINI_API_KEY: "", // Add your Gemini API Key
     apiKey: "", // Add your Firebase API Key
     authDomain: "", // Add your Firebase Auth Domain
     projectId: "", // Add your Firebase Project ID
     storageBucket: "", // Add your Firebase Storage Bucket
     messagingSenderId: "", // Add your Messaging Sender ID
     appId: "", // Add your Firebase App ID
     measurementId: "" // Add your Firebase Measurement ID
   };
   ```
   Replace the empty strings (`""`) with your Firebase configuration details.

3. **Update `angular.json`**
   Ensure your `angular.json` file is configured to use the appropriate environments for development and production.

---


## Getting Started

Follow these steps to set up and run the project:

### 1. Install Angular CLI
```bash
npm install -g @angular/cli
```

### 2. Create a New Angular Project
```bash
ng new <your-project-name> --inline-style --inline-template
```
- Replace `<your-project-name>` with the desired name for your project.
- This command creates a new Angular application with inline styles and templates.

### 3. Navigate to the Project Directory
```bash
cd <your-project-name>
```

### 4. Generate Components and Services
Run the following commands to create the necessary components and services:

#### Create Todos Component
```bash
ng g c components/todos
```

#### Create Todo Service
```bash
ng g service services/todo
```

---

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Add a web app to the project and get your Firebase configuration details.

---

## Running the Project

Start the development server:
```bash
ng serve
```

Open your browser and navigate to [http://localhost:4200](http://localhost:4200) to view the application.

---

## Deployment

To build the project for production, run:
```bash
ng build --configuration production
```
This generates a `dist` folder containing your production-ready files.

---

## Additional Notes

- Follow Angular's [official documentation](https://angular.dev/overview) for in-depth guidance on the framework.
- Firebase's [official documentation](https://firebase.google.com/docs) provides step-by-step tutorials for using its services.

Happy Coding! 🎉