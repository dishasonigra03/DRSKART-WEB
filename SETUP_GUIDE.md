# Dr's Kart Setup & Running Guide

This project consists of:
- **Backend**: Node.js + Express + PostgreSQL + Socket.IO (Port 3000)
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS (Port 5173)

---

## 1. Setup Status

- [x] Repository cloned into workspace
- [x] Backend dependencies installed (`npm install`)
- [x] Frontend dependencies installed (`npm install --prefix frontend`)
- [x] Frontend production build verified (`npm run build`)
- [x] Environment files configured:
  - Root: `.env` and `.env.example`
  - Frontend: `frontend/.env` and `frontend/.env.example`
- [x] Database initialisation script created (`npm run init-db`)

---

## 2. Environment Configuration

### Root `.env` (Backend)
Open `.env` in the root directory and update your PostgreSQL connection string:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/drskart
JWT_SECRET=your_jwt_secret_key_here

# Optional: Google OAuth
GOOGLE_CLIENT_ID=

# Optional: Email & SMS (if left empty, OTP will print directly in terminal console)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

> **Note**: If `SMTP_*` or `TWILIO_*` are not set, the app will conveniently mock OTP delivery and log the OTP code straight to your server console for testing!

### Frontend `.env` (`frontend/.env`)
```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=
```

---

## 3. Database Initialization

Make sure you have PostgreSQL running and a database created (e.g. `drskart`). Then run:

```bash
npm run init-db
```
This will automatically execute `database/setup.sql` and run all required migrations.

### Creating an Admin Account (Optional)
To promote or create an admin account:
```bash
npm run set-admin -- your_email@example.com +919876543210
```

---

## 4. Starting the Application

You can start both backend and frontend concurrently with a single command:

```bash
npm run dev
```

Or run them individually in separate terminals:
- **Backend**: `npm run server`
- **Frontend**: `npm run client`

### URLs:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000](http://localhost:3000)
- **API Documentation (Swagger UI)**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

