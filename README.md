# 🚀 HireSense AI

> An AI-powered Interview Preparation & Resume Optimization Platform that analyzes resumes, evaluates job compatibility, generates interview questions, preparation roadmaps, and creates ATS-friendly resumes tailored to any job description.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Google Gemini](https://img.shields.io/badge/Google-Gemini-red?logo=google)
![License](https://img.shields.io/badge/License-MIT-blue)

---
![Home Page](home.png)
---
# ✨ Features

## 📄 Resume Upload
- Upload your resume in PDF format.
- Extracts resume content automatically.
- Uses AI to understand candidate profile.

---

## 🎯 ATS Match Score
- Compares resume with Job Description.
- Generates an AI Match Score.
- Shows how well your profile matches the role.

---

## 💻 Technical Interview Questions
- AI generates role-specific technical questions.
- Includes:
  - Expected Answer
  - Interviewer's Intention
  - Best Approach

---

## 🧠 Behavioral Questions
Generates HR interview questions with:
- Purpose of the question
- Sample answers
- Answering strategy

---

## 📈 Skill Gap Analysis
Identifies missing skills and categorizes them into:

- 🟢 Low
- 🟡 Medium
- 🔴 High Priority

---

## 🛣️ Personalized Preparation Roadmap

Generates a day-wise preparation plan including:

- Topics to study
- Daily goals
- Practice tasks
- Interview preparation strategy

---

## 📄 AI Resume Generator

Generate an ATS-friendly resume based on:

- Existing Resume
- Self Description
- Job Description

Features:

- One-page ATS Resume
- Professional formatting
- PDF Download
- Tailored according to JD

---

# 🖼️ Screenshots
## Register Page
![Register Page](login.png)
## Home Page

![Home Page](home.png)

---

## Interview Report

![Interview Page](interview.png)

---

## Resume Generator

![Resume Page](resume.png)


---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- SCSS
- Axios

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## AI

- Google Gemini 2.5 Flash API

---

## PDF Generation

- Puppeteer Core
- Sparticuz Chromium

---

## Authentication

- JWT Authentication
- HTTP Only Cookies

---

# 📂 Project Structure

```
HireSense/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---



---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# API Flow

```
Resume Upload
        │
        ▼
Resume Parsing
        │
        ▼
Google Gemini API
        │
        ▼
Interview Report
        │
        ├── ATS Score
        ├── Technical Questions
        ├── Behavioral Questions
        ├── Skill Gaps
        └── Preparation Roadmap
```

Resume Generator Flow

```
Resume
      │
Self Description
      │
Job Description
      │
      ▼
Google Gemini
      │
HTML Resume
      │
Puppeteer
      │
PDF Download
```



---

# 📈 Learning Outcomes

Through this project I learned:

- Full Stack MERN Development
- JWT Authentication
- REST APIs
- MongoDB Integration
- Google Gemini API
- Resume Parsing
- Prompt Engineering
- Puppeteer PDF Generation
- Production Deployment
- Render & Vercel Deployment
- Cookie Authentication
- AI Response Structuring

---


# 👨‍💻 Author

**Divyanshi Upreti**

B.Tech Computer Science Engineering

Graphic Era Hill University, Bhimtal

GitHub:
https://github.com/divyanshiupreti11

LinkedIn:
(Add LinkedIn)

---

# ⭐ Show your support

If you like this project,

⭐ Star this repository.

It motivates me to build more awesome AI-powered projects ❤️
