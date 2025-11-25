# 🕵️‍♂️ QR Detective (Threat Detection System)

**QR Detective** is a full-stack security application designed to protect users from malicious QR codes. It analyzes scanned QR codes in real-time to detect insecure protocols (HTTP) and potentially dangerous file extensions.

## 🚀 Features
* **Real-time Analysis:** Instantly decodes QR images and evaluates their safety.
* **Secure Uploads:** Uses `Multer` for safe file handling on the server.
* **Protocol Validation:** Flags insecure `http://` links as dangerous and validates `https://` as safe.
* **Dark Mode UI:** A modern, hacker-themed React interface.

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, CSS3
* **Backend:** Node.js, Express.js
* **Security & Utils:** Jimp (Image Processing), Multer (File Uploads), QR-Code-Reader

## ⚙️ How to Run Locally

**1. Clone the Repository**
```bash
git clone [https://github.com/Pranavi-Gote/QR-Detective.git](https://github.com/Pranavi-Gote/QR-Detective.git)
cd QR-Detective
```

**2. Setup Backend**
```bash
cd backend
npm install
node server.js
# Server runs on http://localhost:5000
```

**3. Setup Frontend (Open a new terminal)**
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```


*Built by Pranavi Gote*

