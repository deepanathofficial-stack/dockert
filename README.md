# Deepanath's Personal Website

A responsive personal website and portfolio built with **HTML5**, **CSS3**, **JavaScript (ES6+)**, and a **Node.js / Express** backend.

---

## 🚀 Features

- **Personalized for Deepanath**: Hero banner, developer terminal animation, skills showcase, featured projects, and contact section.
- **Node.js & Express Backend**:
  - Serves static assets efficiently from the `public/` directory.
  - REST API endpoint `GET /api/profile` to provide profile data.
  - REST API endpoint `POST /api/contact` with input validation to handle contact form submissions.
- **Modern Responsive Design**:
  - CSS Grid and Flexbox layouts optimized for mobile, tablet, and desktop screens.
  - Dark mode and Light mode with persistent state using `localStorage`.
  - Modern animations, glassmorphism cards, and interactive hover effects.
- **Dynamic Frontend Interactivity**:
  - Asynchronous form submissions using the `Fetch API` without refreshing the page.
  - Active navigation links that update as you scroll.
  - Live server connectivity indicator.

---

## 📁 Project Structure

```text
├── package.json         # Node.js dependencies and project scripts
├── server.js            # Express server and backend REST API routes
├── README.md            # Project documentation and instructions
└── public/              # Static frontend assets
    ├── index.html       # Main webpage structure
    ├── style.css        # Stylesheet (dark/light themes, responsive layout)
    └── script.js        # Client-side JavaScript (theme toggle, API fetch, form handling)
```

---

## 🛠️ How to Run the Website

### 1. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed, then run:

```bash
npm install
```

### 2. Start the Server
Run the following command in the project directory:

```bash
npm start
```

### 3. Open in Browser
Open your browser and navigate to:
```http://localhost:3000
http://localhost:3000
```

