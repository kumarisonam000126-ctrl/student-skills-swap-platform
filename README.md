# 🎓 Student Skills Swap Platform

> A modern, startup-grade full-stack web application designed for university and college students to exchange their skills peer-to-peer without monetary cost.

[![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20TailwindCSS-blue.svg)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express.js-green.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-Supabase%20%7C%20PostgreSQL-3ECF8E.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 🌟 1. Project Concept

In a university setting, students frequently encounter barriers to learning new tools due to high bootcamp and course fees. **SkillSwap** allows students to exchange knowledge directly:

- **Student A** knows HTML, CSS, and JavaScript and wants to learn React.
- **Student B** knows React and wants to learn Python and Machine Learning.
- They connect on SkillSwap, send an exchange proposal, chat in real-time, and mentor each other 1-on-1 for free!

---

## 🚀 2. Technology Stack

### Frontend
- **Framework**: React.js 18 with Vite
- **Styling**: Tailwind CSS (Modern startup aesthetic: Blue, Purple, Off-White)
- **Routing**: React Router DOM v6 (All 12 pages with Protected Routes)
- **HTTP Client**: Axios with JWT authentication interceptors
- **Icons**: Lucide React & React Icons
- **Micro-Interactions**: Canvas Confetti for swap celebrations

### Backend
- **Runtime**: Node.js & Express.js REST API
- **Security**: Helmet, CORS, JWT authentication, bcryptjs password hashing
- **Smart Engine**: Algorithmic skill matching matrix (ranks mutual swaps at 95%+)

### Database
- **Platform**: Supabase (PostgreSQL relational database)
- **Security**: Row Level Security (RLS) policies on all tables
- **Schema**: Tables for `profiles`, `skills`, `student_skills`, `swap_requests`, `connections`, and `messages`
- **Dual-Mode Data Layer**: Works seamlessly out of the box with realistic mock persistence even before Supabase API keys are supplied!

---

## 📱 3. All 12 Functional Pages

1. **Home Page (`/`)**:
   - Hero section with interactive live search
   - How It Works 3-step visual cards
   - Popular skills directory with student counts
   - Why Choose Us startup values
   - Real-time platform statistics counter
   - Responsive footer

2. **Register Page (`/register`)**:
   - Student onboarding with full name, college email, password, college, course
   - Dynamic tag inputs for "Skills You Can Teach" (with proficiency level selector)
   - Dynamic tag inputs for "Skills You Want to Learn"
   - Client-side validation and instant redirect to dashboard

3. **Login Page (`/login`)**:
   - Email & password authentication with show/hide password toggle
   - One-click demo student profiles (Alex Rivera, Priya Sharma) for instant testing
   - Working "Forgot Password" modal

4. **Student Dashboard (`/dashboard`)**:
   - Time-sensitive welcome greeting with profile overview
   - KPI Stat cards: Active Connections, Pending Requests, Skills Taught, Skills Wanted
   - Interactive skills portfolio breakdown
   - Smart Recommended Matches cards
   - Recent swap activity feed

5. **Explore Students Page (`/explore`)**:
   - Live search by student name, college, or skill
   - Filter by University/College dropdown
   - Filter by Technical Skill dropdown
   - "Mutual Matches Only" toggle filter
   - Student cards with match percentage ribbons

6. **Student Profile Page (`/profile/:id`)**:
   - Large avatar, university verified badge, rating, college, and major
   - About me biography
   - Skills I can teach with proficiency tags
   - Skills I want to learn with level tags
   - Direct "Propose Skill Swap" modal trigger and chat link

7. **Skill Swap Requests Page (`/requests`)**:
   - Tabs: Incoming Proposals, Sent by You, Completed History
   - Accept or Decline incoming requests with celebratory confetti
   - Cancel outgoing pending proposals
   - Direct link to open chat upon acceptance

8. **My Connections Page (`/connections`)**:
   - Grid of students you have accepted swaps with
   - Unread message counters
   - Quick "Open Chat" and "View Profile" triggers

9. **Chat Page (`/chat`)**:
   - Functional messaging system between connected peers
   - Left sidebar with conversation list, online indicators, and search
   - Chat thread with speech bubbles, timestamps, and read receipts
   - Send input with enter-to-send support

10. **Edit Profile Page (`/edit-profile`)**:
    - Update name, college, course, bio, and avatar
    - One-click randomized avatar generator
    - Add and delete skills you can teach (Beginner, Intermediate, Advanced, Expert)
    - Add and delete skills you want to learn

11. **About Us Page (`/about`)**:
    - Project origin, mission, and student empowerment principles
    - Interactive FAQ accordions
    - Architecture overview

12. **Contact Us Page (`/contact`)**:
    - Contact form with client validation
    - Campus ambassador information & response time SLAs

---

## 🛠️ 4. Quick Start: Running the Project Locally

### Prerequisites
- Node.js (v18 or higher installed)
- npm or yarn

### Step 1: Clone or Navigate to the Workspace
```powershell
cd c:\Users\USER\OneDrive\Desktop\skills
```

### Step 2: Install All Dependencies
```powershell
npm run install:all
```
*(Or install in server and client individually: `npm install --prefix server` and `npm install --prefix client`)*

### Step 3: Run Both Frontend and Backend Concurrently
```powershell
npm run dev
```

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:5000/api](http://localhost:5000/api)
- **API Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 🗄️ 5. Supabase Database Setup Instructions

The platform includes a complete SQL schema script located at:
`supabase/schema.sql`

### How to Apply the Schema in Supabase:
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard) and create a new project.
2. Go to the **SQL Editor** tab from the left sidebar.
3. Open `supabase/schema.sql` in this project, copy its entire contents, paste it into the Supabase SQL Editor, and click **Run**.
4. This will automatically:
   - Create tables: `profiles`, `skills`, `student_skills`, `swap_requests`, `connections`, `messages`
   - Configure Row Level Security (RLS) policies
   - Populate 40+ trending university tech skills
5. Go to **Project Settings** -> **API** in Supabase and copy:
   - `Project URL`
   - `anon public` key
   - `service_role` key (optional)
6. Open `.env` in the root and in `/server`:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key
```

*Note: The platform is built with a dual-mode data layer. If keys are not set, it operates seamlessly with local persistent memory so all features work immediately!*

---

## 🧪 6. Testing Walkthrough

1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Click **Log In** -> Click **Quick 1-Click Demo Profiles** -> Click **Alex Rivera**.
3. You will be authenticated and redirected to the **Dashboard** with live metrics.
4. Go to **Explore Students** -> Filter by "MIT" or search for "Python".
5. Click **Swap Skills** on Priya Sharma's card -> Select what you teach ("React.js") and what you want ("Python Programming") -> Click **Send Swap Request**.
6. Switch user or log in as Priya -> Go to **Swap Requests** -> Click **Accept & Connect** (enjoy the confetti!).
7. Click **Open Chat** -> Send messages in real-time!
8. Go to **Edit Profile** -> Add a new skill or click **Randomize Avatar** -> Save.

---

## 🚢 7. Vercel Deployment Guide

1. Push the repository to GitHub:
   `https://github.com/kumarisonam000126-ctrl/student-skills-swap-platform`
2. Open your [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Import the `student-skills-swap-platform` repository.
4. Set the Build & Output settings:
   - **Framework Preset**: Vite
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
5. Under **Environment Variables**, add:
   - `PORT=5000`
   - `NODE_ENV=production`
   - `JWT_SECRET=your-secret-key`
   - `SUPABASE_URL` (optional for live Supabase)
   - `SUPABASE_ANON_KEY` (optional)
6. Click **Deploy**!

---

## 👨‍💻 Author & Repository

- **GitHub Username**: `kumarisonam000126-ctrl`
- **Repository Name**: `student-skills-swap-platform`
- **Target URL**: `https://github.com/kumarisonam000126-ctrl/student-skills-swap-platform`
