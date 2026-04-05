# 🚀 GenThumb AI – Complete Development Roadmap

This document outlines the end-to-end, phase-wise workflow for building the **GenThumb AI** project using the MERN stack and Google Gemini API. It serves as a comprehensive guide from initial setup to final deployment and project submission.

---

## 🧭 Phase 1: Project Planning & Setup (Days 1–2)
**Objective:** Define the architecture, finalize requirements, and initialize the development environments.

- [ ] Finalize the Product Requirements Document (PRD).
- [ ] Design the System Architecture and Database ER diagrams.
- [ ] Initialize the Git repository.
- [ ] Setup the frontend folder (`client`) using Vite + React.
- [ ] Setup the backend folder (`server`) initializing Node.js and Express.
- [ ] Install essential dependencies (React Router, Tailwind CSS/Bootstrap, Axios, Express, Mongoose, dotenv).

---

## 🗄️ Phase 2: Database & Backend Architecture (Days 3–4)
**Objective:** Set up the MongoDB database and create foundational backend models.

- [ ] Create a MongoDB Atlas cluster.
- [ ] Set up the database connection (`mongoose.connect`) in the Node server.
- [ ] Define the `User` Schema (name, email, password hashes, role).
- [ ] Define the `Thumbnail` Schema (user logic, AI prompt, image URL, CTR score, metadata).
- [ ] Create basic CRUD REST APIs for user management and thumbnails.

---

## 🔐 Phase 3: Authentication System (Days 5–7)
**Objective:** Secure the application so that only registered users can generate thumbnails.

- [ ] Implement password hashing using `bcryptjs`.
- [ ] Build the User Signup and Login controllers.
- [ ] Generate JSON Web Tokens (JWT) for session management.
- [ ] Build middleware to protect specific API routes.
- [ ] Implement JWT token storage in frontend (Cookies/LocalStorage) and build the authentication context in React.

---

## 🤖 Phase 4: AI Integration – Gemini API (Days 8–11)
**Objective:** Integrate the core Artificial Intelligence functionality.

- [ ] Obtain and securely configure the Google Gemini API keys.
- [ ] **Step 1:** Create the Prompt Enhancement module.
  - *Flow:* User's basic text -> Gemini Text API -> Detailed, enriched design prompt.
- [ ] **Step 2:** Create the Thumbnail Generation module.
  - *Flow:* Enriched prompt -> Gemini Image API -> Generates Base64 image/URL.
- [ ] Write robust error handling to manage rate limits and API failures.

---

## ☁️ Phase 5: Cloud Image Storage (Days 12–13)
**Objective:** Permanently store AI-generated thumbnails.

- [ ] Set up a Cloudinary or AWS S3 account.
- [ ] Create image upload controllers in the backend.
- [ ] *Flow:* AI returns raw image data -> Buffer sent to Cloudinary -> Cloudinary returns public URL -> Save URL to MongoDB `Thumbnail` document.

---

## 🎨 Phase 6: Frontend Development & UI (Days 14–18)
**Objective:** Build the user-facing web application.

- [ ] Design the Navigation Bar and global layouts.
- [ ] Build the **Home Page / Landing Page** detailing product features.
- [ ] Build the **Login/Signup Pages**.
- [ ] Build the **User Dashboard** (showing generated thumbnail history).
- [ ] Build the **Generation Interface** (text prompt inputs, loading spinners during API calls, thumbnail preview).

---

## 🖌️ Phase 7: Thumbnail Editor Integration (Days 19–21)
**Objective:** Allow users to customize the AI-generated images.

- [ ] Integrate a canvas library (like `Fabric.js` or `Konva.js`).
- [ ] Allow users to load generated thumbnails as backgrounds.
- [ ] Build tools to add customizable text, change fonts, and adjust colors.
- [ ] Add emoji and shape overlay layers.
- [ ] Implement a feature to export/download the edited canvas as a 1080p high-resolution file.

---

## 📊 Phase 8: CTR Prediction Module (Days 22–24)
**Objective:** Build the advanced predictive feature for academic grading.

- [ ] Analyze image properties (brightness, contrast, text clarity) on the backend or via frontend canvas extraction.
- [ ] Feed parameters into a simple scoring algorithm or a trained ML model wrapper.
- [ ] Display the "Predicted CTR Score" in the UI immediately after thumbnail generation.
- [ ] Provide AI-based suggestions on how to improve the thumbnail.

---

## 🧪 Phase 9: Testing & Refinement (Days 25–27)
**Objective:** Ensure application stability and bug-free user flows.

- [ ] Test the Complete User Workflow: Signup -> Login -> Generate -> Edit -> Download -> View History.
- [ ] Test API endpoints using Postman or ThunderClient.
- [ ] Handle UI edge cases (e.g., empty prompts, expired sessions).
- [ ] Ensure mobile responsiveness and cross-browser compatibility.

---

## 🚀 Phase 10: Deployment & Final Year Submission (Days 28–30)
**Objective:** Take the application live and prepare documentation for the viva.

- [ ] **Frontend Deployment:** Build the React app and deploy it on Vercel or Netlify.
- [ ] **Backend Deployment:** Deploy the Express server on Render, Railway, or Heroku.
- [ ] **Database Setup:** Whitelist production IP addresses on MongoDB Atlas.
- [ ] Ensure environment variables (`.env`) are securely added to production servers.
- [ ] Compile the final Project Report, IEEE format paper (if needed), and Presentation slides for the final evaluation.
