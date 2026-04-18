<h1>Full-Stack CRUD Application </h1>
A robust, decoupled web application featuring a React frontend and a Django REST Framework backend. This project demonstrates a complete implementation of RESTful principles, state management, and cross-platform deployment.

<h2>🛠️ Tech Stack</h2>

**Frontend**
<li>React.js: Functional components and Hooks for dynamic UI.</li>

<li>Tailwind CSS: Utility-first styling for a modern, responsive design.</li>

<li>Axios: Promise-based HTTP client for seamless API communication.</li>
<br>

**Backend**
<li>Django: High-level Python framework for rapid development.</li>

<li>Django REST Framework (DRF): Specialized toolkit for building powerful Web APIs.</li>

<li>SQLite: Lightweight relational database (ideal for development and small-scale deployment).</li>
<br>

**Deployment**
<li>Vercel: Optimized hosting for the React build.</li>

<li>Render: Managed hosting for the Django application and static files.</li>

<h2>✨ Key Features</h2>
<li>Full CRUD Operations: Create, Read, Update, and Delete records with real-time UI updates.</li>

<li>Decoupled Architecture: Frontend and Backend are hosted independently, communicating via JSON over HTTPS.</li>

<li>Responsive UI: Fully optimized for mobile, tablet, and desktop views using Tailwind.</li>

<li>CORS Handling: Configured django-cors-headers to allow secure requests from the Vercel domain.</li>

<h2>🏗️ System Architecture</h2>
<p>The application uses a Client-Server architecture. The React frontend sends requests to the Django API, which processes business logic and interacts with the SQLite database.</p>
