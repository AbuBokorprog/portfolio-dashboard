# Personal Portfolio Project Documentation

Welcome to the **Personal Portfolio Project**! This project showcases my professional profile, including authentication, personal details, education, experience, skills, projects, certifications, and project categories. Below, you'll find a detailed overview of the project setup, features, and deployment.

---

## 🚀 Live Links

- **Portfolio Website**: [https://abubokor-wheat.vercel.app/](https://abubokor-wheat.vercel.app/)
- **Dashboard Panel**: [https://portfolio-dashboard-zeta-six.vercel.app/](https://portfolio-dashboard-zeta-six.vercel.app/)

---

## 📂 Features

### 1. **Authentication**

- Admin authentication for managing portfolio content.
- **Credentials**:
  - Email: `admin@gmail.com`
  - Password: `admin123@`

### 2. **Portfolio Sections**

- **Banner**: This is Hero section or banner section.
- **About**: Highlight personal and professional details.
- **Skills**: Technical and soft skills.
- **Education**: Academic background and qualifications.
- **Experience**: Work experience with key roles and responsibilities.
- **Projects**: Detailed descriptions of projects with links and technologies used.
- **Certificates**: Professional certifications and achievements.
- **Blogs**: Publish and manage personal blog posts.

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```plaintext
PORT=5000
DATABASE_URL=mongodb+srv://database1abu:nbAzmSC1g0XdwZg6@cluster0.kq57d4a.mongodb.net/abubokor-portfolio?retryWrites=true&w=majority&appName=Cluster0
ACCESS_TOKEN='59aaf1b026f5d7f9428656210cc7b16d8c8dda1923613d50862a7d44d88f4083'
SALT=12
EXPIRES_IN=1d
REFRESH_TOKEN='3787326cada7cb5ad6f670c39533d4dd6683f5e5ae6f9328af2fd458126c2f03'
NODE_ENV=development
```

### 4. Run the Application

Start the server locally:

```bash
npm start
```

The server will run on `http://localhost:5000`.

---

## 📦 Project Structure

```
.
├── .vercel/            # Vercel configuration files
├── node_modules/       # Project dependencies
├── src/
│   ├── app/
│   │   ├── config/       # Configuration files (e.g., database)
│   │   ├── errors/       # Custom error handling
│   │   ├── middleware/   # Middleware for request processing
│   │   ├── modules/      # Feature modules
│   │   │   ├── about/           # About section
│   │   │   ├── auth/            # Authentication
│   │   │   ├── blogs/           # Blog management
│   │   │   ├── education/       # Education section
│   │   │   ├── experience/      # Experience section
│   │   │   ├── projectCategory/ # Project categories
│   │   │   ├── projects/        # Projects section
│   │   │   ├── reports/         # Report generation
│   │   │   ├── sendEmail/       # Email utilities
│   │   │   ├── skills/          # Skills section
│   │   │   └── users/           # User management
│   │   ├── route/       # API routes
│   │   └── utils/       # Utility functions
│   ├── uploads/         # Uploaded files
│   └── app.js           # Application setup
├── .env.example         # Environment variable template
├── .eslintrc.json       # ESLint configuration
├── .gitignore           # Git ignored files
├── package.json         # Project dependencies
├── package-lock.json    # Dependency lock file
├── server.js            # Server entry point
└── README.md            # Project documentation

```

---

## 📖 API Documentation

### **Authentication**

- **POST** `/api/auth/login`  
  Authenticate the admin user.

### **User**

- **POST** `/api/user/create-admin`  
  Create the admin user.

  ### **Reports Management**

- **GET** `/api/reports`  
  Fetch all reports sections.

### **About Management**

- **GET** `/api/about`  
  Fetch all about sections.
- **POST** `/api/about/`  
  Add content to a specific section.
- **PUT** `/api/about/:id`  
  Update content in a specific section.
- **DELETE** `/api/about/:id`  
  Delete content from a specific section.

  ### **Project Category Management**

- **GET** `/api/projects-category`  
  Fetch all projects-category sections.
- **POST** `/api/projects-category`  
  Add content to a specific section.
- **PUT** `/api/projects-category/:id`  
  Update content in a specific section.
- **DELETE** `/api/projects-category/:id`  
  Delete content from a specific section.

### **Skills Management**

- **GET** `/api/skills`  
  Fetch all skills sections.
- **POST** `/api/skills`  
  Add content to a specific section.
- **PUT** `/api/skills/:id`  
  Update content in a specific section.
- **DELETE** `/api/skills/:id`  
  Delete content from a specific section.

  ### **Education Management**

- **GET** `/api/education`  
  Fetch all education sections.
- **POST** `/api/education`  
  Add content to a specific section.
- **PUT** `/api/education/:id`  
  Update content in a specific section.
- **DELETE** `/api/education/:id`  
  Delete content from a specific section.

### **Experience Management**

- **GET** `/api/experience`  
  Fetch all experience sections.
- **POST** `/api/experience`  
  Add content to a specific section.
- **PUT** `/api/experience/:id`  
  Update content in a specific section.
- **DELETE** `/api/experience/:id`  
  Delete content from a specific section.

### **Portfolio Management**

- **GET** `/api/portfolio`  
  Fetch all portfolio sections.
- **POST** `/api/portfolio/`  
  Add content to a specific section.
- **PUT** `/api/portfolio/:id`  
  Update content in a specific section.
- **DELETE** `/api/portfolio/:id`  
  Delete content from a specific section.

### **Certificate Management** (Processing)

- **GET** `/api/certificate`  
  Fetch all certificate sections.
- **POST** `/api/certificate/`  
  Add content to a specific section.
- **PUT** `/api/certificate/:id`  
  Update content in a specific section.
- **DELETE** `/api/certificate/:id`  
  Delete content from a specific section.

### **Blog Management**

- **GET** `/api/blogs`  
  Fetch all blogs sections.
- **POST** `/api/blogs`  
  Add content to a specific section.
- **PUT** `/api/blogs/:id`  
  Update content in a specific section.
- **DELETE** `/api/blogs/:id`  
  Delete content from a specific section.

---

## 🔒 Security

- **Password Hashing**: Passwords are hashed using `bcrypt` with a salt value of `12`.
- **Tokens**:
  - Access tokens expire in `1 day`.
  - Refresh tokens ensure secure re-authentication.

---

## 🌐 Deployment

- **Frontend**: Deployed on Vercel.
- **Backend**: Hosted on a Node.js server with MongoDB Atlas as the database.
- Ensure all environment variables are configured correctly during deployment.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

---

## 📧 Contact

For any questions or suggestions, feel free to reach out:

- **Email**: abubokor1066@gmail.com

---

**Thank you for visiting my portfolio!** 😊
