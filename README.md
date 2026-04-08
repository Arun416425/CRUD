**🚀 Full-Stack CRUD Application**
A robust, decoupled web application featuring a React frontend and a Django REST Framework backend. This project demonstrates a complete implementation of RESTful principles, state management, and cross-platform deployment.

*🛠️ Tech Stack*
Frontend
React.js: Functional components and Hooks for dynamic UI.

Tailwind CSS: Utility-first styling for a modern, responsive design.

Axios: Promise-based HTTP client for seamless API communication.

Backend
Django: High-level Python framework for rapid development.

Django REST Framework (DRF): Specialized toolkit for building powerful Web APIs.

SQLite: Lightweight relational database (ideal for development and small-scale deployment).

Deployment
Vercel: Optimized hosting for the React build.

Render: Managed hosting for the Django application and static files.

**✨ Key Features**
Full CRUD Operations: Create, Read, Update, and Delete records with real-time UI updates.

Decoupled Architecture: Frontend and Backend are hosted independently, communicating via JSON over HTTPS.

Responsive UI: Fully optimized for mobile, tablet, and desktop views using Tailwind.

CORS Handling: Configured django-cors-headers to allow secure requests from the Vercel domain.

🏗️ System Architecture
The application uses a Client-Server architecture. The React frontend sends requests to the Django API, which processes business logic and interacts with the SQLite database.
