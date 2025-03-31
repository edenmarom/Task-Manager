# Task Manager - Client

A web-based task management application built with **Angular** and **NgRx** for state management.

## **Table of Contents**
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Integration](#api-integration)
- [Architectural Decisions](#architectural-decisions)

## **Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/edenmarom/Task-Manager.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## **Running the Application**
```sh
npm start
```
By default, the app runs on `http://localhost:4200`.

## **API Integration**
The frontend interacts with the backend API (`http://localhost:3000`). Ensure the server is running before starting the client.

## **Architectural Decisions**
- **Angular + TypeScript:** Chosen for scalability and modularity.
- **NgRx:** Used for state management, ensuring predictable state changes.
---
