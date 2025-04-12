# 🌟 FutureFlow – Your AI-Powered Financial Planning Dashboard 💸

Welcome to **FutureFlow** – a modern, intelligent, and interactive platform that empowers individuals to visualize and improve their financial future using real-time insights and AI suggestions. This project leverages the power of **Gemini AI**, advanced charting, and responsive UI to deliver a seamless personal finance experience.

---
##  📌 Deployed site - https://furure-flow.netlify.app/
---
## walk-through of the project - https://youtu.be/wTnDPBzZiug
---
## 📌 Features

### ✅ Dashboard Highlights
- 🎯 **Interactive Financial Planner**  
  Submit your current savings, income, and expenses to see personalized projections.

- 🧠 **Gemini AI Integration**  
  Get instant financial suggestions tailored to your inputs and goals.

- 📊 **10-Year Financial Projections**  
  Visualized through elegant charts powered by `Recharts`.

- 🔄 **Scenario Planning**  
  Simulate real-life financial decisions like starting a business or switching careers.

- 🔐 **Local Auth with Email**  
  Secure local login with restricted domain validation for popular email providers.

---

## 🚀 Live Flow

1. **Landing Page**  
   `"/"` – Intro screen with branding and a "Launch Dashboard" CTA.

2. **Sign In**  
   `"/launch-dashboard"` – Secure login with only valid email domains accepted.

3. **Planner**  
   `"/planner"` – Fill out your financial form, explore AI insights, and view charts.

4. **Collated Dashboard**  
   `"/dashboard"` – Review your financial planning summary.

5. **Gemini AI Dashboard**  
   `"/dashboard-home"` – Ask open-ended financial questions powered by Gemini AI.

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS + Custom gradients + Animations
- **AI Integration:** [Gemini API](https://ai.google.dev/)
- **Charts:** Recharts
- **Auth:** LocalStorage-based validation
- **Routing:** React Router DOM
- **UX Animations:** Framer Motion

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repo
https://github.com/Shivamshrivaastava/futureflow.git
cd futureflow

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev
