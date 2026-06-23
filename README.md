# Web Scraper Task Manager

A full-stack web application designed for asynchronous processing of URL queues. Users can submit a list of URLs, and the backend processes them concurrently with rate limiting and progress tracking.

## 🛠 Tech Stack

**Frontend:**
- **React (Vite)** — Fast, modern UI development.
- **TypeScript** — Strict typing across the stack.
- **Zustand** — Lightweight, unopinionated global state management.
- **Emotion (@emotion/styled)** — CSS-in-JS for encapsulated, dynamic styling.
- **Axios** — HTTP client for API requests.

**Backend:**
- **Node.js & Express** — Lightweight and performant HTTP server.
- **TypeScript** — Strict typing and modern ES modules.
- **p-limit** — Concurrency and rate limiting.
- **UUID** — Unique identifier generation.

**Infrastructure:**
- **Docker & Docker Compose** — Containerization for seamless deployment.

---

## 🏗 Architectural Decisions

### Backend: Why `p-limit`?
When dealing with tasks like parsing external URLs, firing hundreds of concurrent HTTP requests via `Promise.all` is dangerous. It can lead to memory exhaustion, socket depletion, or getting the server IP-banned by the target websites. 

`p-limit` solves this by introducing a strict concurrency limit (e.g., maximum 5 simultaneous requests). It elegantly queues the remaining tasks. Additionally, it provides an out-of-the-box `clearQueue()` method, which makes implementing a "Cancel Job" feature trivial — allowing us to instantly drop all pending URLs without writing complex cancellation logic.

### Frontend: Why `Zustand`?
Traditional prop-drilling or React Context can become messy when dealing with frequent background updates (polling). 

Zustand was chosen because it allows us to decouple the complex state logic and side-effects (like the `setInterval` polling for job status updates) from our React components. Components like `JobList` and `JobDetails` simply subscribe to the store, ensuring the UI remains clean, responsive, and easy to maintain.

---

## 🚀 How to Run

The entire application (both frontend and backend) is dockerized and can be launched with a single command.

1. Ensure you have **Docker** and **Docker Desktop** (or Docker Engine) installed and running.
2. Open your terminal in the root directory of this project.
3. Run the following command:

```bash
docker compose up --build -d
```

### Accessing the application
- **Frontend UI:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** `http://localhost:3001` (e.g., `http://localhost:3001/api/jobs`)

To view the live logs of the running containers:
```bash
docker compose logs -f
```

To stop the application:
```bash
docker compose down
```
