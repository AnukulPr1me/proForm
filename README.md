# Online Course Registration System

A **full-stack MERN application** that allows students to register for courses via a multi-step form, with an admin panel to manage registrations.

---

## 🎯 Features

✅ Multi-step registration form:
- **Step 1:** Personal Info (Name, Email)
- **Step 2:** Course Selection
- **Step 3:** Payment Info (Mock Data)
- **Step 4:** Review & Submit
- **Form persistence:** Saves progress to MongoDB if the user leaves before submission
- Shows **"User already exists"** if an email is already registered

✅ Admin Panel:
- **Static login**
- View all registrations
- Search and sort student registrations

✅ Backend REST API:
- `POST /api/register-course` - Register or save progress
- `GET /api/registrations` - List all registrations (with search/sort)

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **HTTP Client:** Axios

---

## 🚀 Running Locally

Follow these steps to set up the project on your machine.

---

### 🟢 1. Clone the Repository

```bash
git clone https://github.com/anukulpr1me/proForm.git
cd proForm
