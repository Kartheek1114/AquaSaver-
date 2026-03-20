# 💧 AquaSaver: Smart Water Conservation Platform

<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="AquaSaver Banner" width="1000">
</div>

---

## 🚀 Overview
**AquaSaver** is an AI-powered smart water conservation platform designed to help consumers, service providers, and water experts collaborate for a more sustainable future. The platform tracks water consumption through IoT devices, provides AI-driven conservation insights, and facilitates a marketplace for water-saving services.

---

## ✨ Key Features
- **📊 Real-time Dashboard**: Monitor water consumption with interactive charts and live usage data.
- **🔐 Secure Authentication**: Integrated with **Google OAuth** for quick sign-in and standard email/password registration.
- **🛡️ Admin Panel**: Exclusive management dashboard for authorized users to validate providers and system logs.
- **🤖 AI Insights**: Powered by **Google Gemini AI** to provide personalized water-saving suggestions based on usage patterns.
- **📱 Device Management**: Connect and monitor IoT water meters, tank monitors, and leak detectors.
- **🎯 Conservation Goals**: Set and track personalized water reduction targets.
- **💼 Marketplace**: Connect with water experts and professional plumbing services.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Recharts, Lucide Icons.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (with JSON fallback for local development).
- **AI Integration**: Google Generative AI (Gemini).
- **Authentication**: JWT & Google OAuth 2.0.

---

## ⚙️ Getting Started

### **Prerequisites**
- **Node.js** (v18 or higher)
- **Git**

### **1. Clone & Install**
```bash
git clone https://github.com/Kartheek1114/AquaSaver-.git
cd AquaSaver-
npm install
cd backend && npm install
```

### **2. Setup Environment Variables**
Create a `.env` file in the **root** folder and a `.env` file in the **backend** folder.

**Root `.env`**:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_API_URL=http://localhost:5000/api
```

**Backend `.env`**:
```env
GOOGLE_CLIENT_ID=your_google_client_id
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### **3. Run Locally**
To start both frontend and backend simultaneously:
```bash
# In the root directory
npm run dev
# In the backend directory
npm start
```

---

## ☁️ Deployment Guide

### **Backend (Render.com)**
1. Connect your repo to Render as a **Web Service**.
2. **Root Directory**: `aquasaver-smart-platform/backend`.
3. **Build Command**: `npm install`.
4. **Start Command**: `node server.js`.
5. Add all Backend environment variables in the Render dashboard.

### **Frontend (Vercel)**
1. Connect your repo to Vercel.
2. **Root Directory**: `aquasaver-smart-platform`.
3. **Build Command**: `npm run build`.
4. **Output Directory**: `dist`.
5. Add Frontend environment variables in the Vercel dashboard.

---

## 🛡️ Administrative Access
The platform's Administration tab is restricted. To gain Admin privileges, the account must be registered with:
**`kartheek04112004@gmail.com`**

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  Made with ❤️ for a Water-Secure Future
</div>
