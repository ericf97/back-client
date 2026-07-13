
Back client readme · MD
# back-client
 
Backend API for a case-management backoffice used by a European client to handle and track fraud-related cases. Built to support internal staff managing case intake, review, and resolution workflows.
 
Frontend companion repo: [clienti](https://github.com/ericf97/clienti)
 
## What it does
 
- Exposes a REST API consumed by the `clienti` frontend for case management operations (case intake, tracking, status updates, and related workflows)
- Provides structured endpoints documented via Swagger/OpenAPI for easy integration and testing
- Handles database schema evolution through versioned migration scripts
## Tech Stack
 
- **Runtime:** Node.js
- **API:** Express (REST)
- **Database:** SQL (see `db/` for schema and migrations)
- **API Docs:** Swagger/OpenAPI (`swagger.yml`)
- **CI/CD:** GitHub Actions
## Project Structure
 
```
back-client/
├── src/               # Application source code (routes, controllers, business logic)
├── db/                # Database migration scripts and schema changes
├── .github/workflows/ # CI/CD pipeline configuration
├── swagger.yml         # API documentation (OpenAPI spec)
├── router.js           # API route definitions
└── .env.example         # Environment variable template
```
 
## Getting Started
 
1. Clone the repository
```
   git clone https://github.com/ericf97/back-client.git
   cd back-client
```
 
2. Install dependencies
```
   npm install
```
 
3. Set up environment variables
```
   cp .env.example .env
```
   Fill in the required values (database connection, API keys, etc.)
 
4. Run database migrations
```
   # Migration scripts located in /db
```
 
5. Start the server
```
   npm start
```
 
## API Documentation
 
Once running, API endpoints are documented via the OpenAPI spec in `swagger.yml`. Import it into Swagger UI or Postman to explore available endpoints.
 
## Notes
 
This project was built and maintained as part of professional client work. Some implementation details are simplified or generalized here to respect client confidentiality.
 
