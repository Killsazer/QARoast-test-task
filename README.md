# Quiz Builder Platform

A full-stack web application for creating, managing, and taking dynamic quizzes. Built with Next.js App Router, TailwindCSS, NestJS, and PostgreSQL.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Lucide React

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Environment:** dotenv

---

## 🛠️ Setup & Installation

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) & Docker Compose (for the PostgreSQL database)

### 1. Database Setup
The easiest way to run the database is via the provided `docker-compose.yml`.
Open your terminal in the root directory and run:
```bash
docker-compose up -d
```
This will start a PostgreSQL instance on `localhost:5432`.

### 2. Backend Setup
Open a new terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

**Environment Variables:**
Create a `.env` file inside the `backend/` directory. You can use the provided `.env.example` as a template:
```env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/quiz_db?schema=public"
PORT=3001
```

**Apply Database Migrations:**
Run Prisma to create the necessary tables in your database:
```bash
npx prisma migrate dev --name init
```
*(Note: When you run `migrate dev` or `migrate reset` for the first time, Prisma will automatically run the seed script if the database is empty.)*

**Seed the Database (Optional):**
To manually populate the database with sample quizzes at any time, run:
```bash
npx prisma db seed
```

**Start the Backend Server:**
```bash
npm run start:dev
```
The API will now be running on `http://localhost:3001`.

*(Optional) You can open Prisma Studio to view the database visually:*
```bash
npx prisma studio
```

### 3. Frontend Setup
Open another terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

**Environment Variables:**
Create a `.env.local` file inside the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

**Start the Frontend Server:**
```bash
npm run dev
```
The Web App will now be running on `http://localhost:3000`.

---

## 💡 How to Use

### 1. Create a Sample Quiz
1. Go to `http://localhost:3000` in your browser.
2. Click **Start Building** or navigate to `/create`.
3. Enter a **Quiz Title**.
4. Add questions by selecting from the available types:
   - **Short Answer (Input):** Type valid acceptable variations (e.g. `Washington`, `Washington D.C.`) and press `Enter` to add them.
   - **True / False (Boolean):** Simply select the correct radio button.
   - **Multiple Choice (Checkbox):** Type an option, press `Enter`. Check the boxes next to the correct answers.
5. Click **Save Quiz** when you are done.

### 2. Manage Quizzes
1. Navigate to the Dashboard at `/quizzes`.
2. You will see a list of all your created quizzes.
3. Click the **View** button to see the details of a specific quiz in read-only mode.
4. Click the **Trash** icon to permanently delete a quiz.

---

## 🧪 Testing

The backend business logic and controllers are covered by Unit Tests using Jest.
To run the tests:
```bash
cd backend
npm run test
```

---

## 🏗️ Architecture & Best Practices
- **SOLID Principles:** The frontend strictly separates presentational UI components (`components/ui`) from complex logic (`components/features`). Form logic is decoupled from API submission.
- **Next.js App Router Conventions:** Utilizes Server Components for data fetching (`page.tsx`) and Client Components only where interactivity is needed (`QuizListClient.tsx`), ensuring zero-JS initial load where possible and optimal SEO.
- **Error Handling:** Graceful API fallbacks and error boundaries configured.

---
