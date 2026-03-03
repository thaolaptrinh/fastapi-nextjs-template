# Technical Assignment Specification

**User Management System with TOTP Authentication**

---

## 1. Overview

This assignment evaluates your ability to design and implement a web application with user management and TOTP authentication features. The assessment focuses not on completion level, but on your approach to the problem and the progress you achieve.

---

## 2. Technical Requirements

### 2.1 Technology Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Frontend | Next.js + TypeScript | React-based framework |
| Backend | Python | Framework of your choice (FastAPI, Flask, Django, etc.) |
| Database | MySQL | Required |
| Infrastructure | Docker / Docker Compose | Containerization required |
| Version Control | GitHub | Public repository |

---

## 3. Functional Requirements

### 3.1 User Management

- **Create user**: Register new users
- **User list**: Display list of registered users
- **Delete user**: Remove users from the system
- **User authentication**: Login and logout functionality

### 3.2 Authentication Requirements

Authentication must be two-factor authentication (2FA) implemented in two stages:

- **First factor**: ID (username or email) + Password
- **Second factor**: TOTP authentication (Time-based One-Time Password)

TOTP authentication must be compatible with popular authentication apps such as Google Authenticator and Microsoft Authenticator.

### 3.3 Access Control

Unauthenticated users cannot perform any of the above operations. After authentication, all users have equal permissions (role-based access control is not required).

---

## 4. Development Requirements

### 4.1 Timeline

- **Deadline**: 1 week (5 working days)
- **Start date**: Monday, March 2, 2026
- **End date**: Friday, March 6, 2026

> ⚠️ **Note**: You may implement or research before the start date. Preparation in advance is allowed.

### 4.2 Version Control

- Create a GitHub account (or use an existing account)
- Manage source code in a public repository
- Maintain appropriate commit messages and history
- Include basic project description in README.md

### 4.3 Testing

Test code is mandatory. Consider the following aspects and determine the test scope yourself:

- **Unit Tests**: Test individual functions and modules
- **Integration Tests**: Test API endpoints and database integration
- **E2E Tests**: User scenario-based testing (optional)

> ⚠️ **Note**: Determine the scope and depth of testing yourself and document your reasoning.

### 4.4 Documentation

Create the following documentation in English:

- **README.md**: Project overview and installation guide
- **Deployment guide**: Instructions for running in Docker environment
- **Testing guide**: How to run tests and verify results
- **API specification**: List of endpoints and usage (Swagger/OpenAPI recommended)

### 4.5 Implementation Report

Create an implementation report including the following:

#### A. Approach and Rationale

- What methods and processes did you use for implementation?
- Why did you choose these methods? (Reasons for technology choices)
- Design decisions and their rationale
- References and resources consulted

#### B. Reflection and Challenges

- Features that could not be implemented, with reasons
- How you would implement if you had more time
- What didn't work well and how you could do it differently
- Areas for future improvement

#### C. Lessons and Insights

- What you learned through this assignment
- New technologies or tools learned
- Points to apply when solving similar assignments in the future

> ⚠️ **Important**: This report is a critical assessment component. We prioritize the quality of the thinking process and self-analysis over completion level.

---

## 5. Docker Requirements

Configure the application to run on Docker:

- docker-compose.yml with multi-container configuration
- Containerize Frontend, Backend, and MySQL services
- Manage configuration through environment variables (provide .env.example)
- Initialize database on first startup

**Sample startup command:**

```bash
docker-compose up --build
```

---

## 6. Evaluation Criteria

> ⚠️ **Important**: This assignment evaluates not completion itself, but the following aspects comprehensively.

| Criteria | Evaluation Focus |
|----------|------------------|
| Approach | Design philosophy, reasons for technology choices |
| Code quality | Readability, maintainability, appropriate structure |
| Testing strategy | Appropriateness of test scope, quality of test code |
| Documentation | Clarity, reproducibility, completeness |
| Progress management | Commit history, use of Issue/PR (optional) |
| Problem-solving ability | Handling uncertainties, validity of decisions |
| Implementation report | Clarity of thinking process, quality of self-analysis, depth of reflection |

---

## 7. Recommended Architecture

```
+-------------------------------------------------------------+
|                      Docker Compose                         |
|  +---------------+  +---------------+  +---------------+    |
|  |   Frontend    |  |   Backend     |  |    MySQL      |    |
|  |  (Next.js)    |->|   (Python)    |->|   Database    |    |
|  |  Port: 3000   |  |  Port: 8000   |  |  Port: 3306   |    |
|  +---------------+  +---------------+  +---------------+    |
+-------------------------------------------------------------+
```

**Recommended directory structure:**

```
project-root/
├── frontend/          # Next.js application
│   ├── src/
│   ├── __tests__/
│   └── Dockerfile
├── backend/           # Python API server
│   ├── app/
│   ├── tests/
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 8. Important Notes

- Questions related to this document will not be accepted
- Research unclear points yourself or make your own decisions
- Document decisions and reasons in documentation or commit messages
- Library and tool choices are flexible
- Consider security best practices if possible

---

## 9. Submission

- GitHub repository URL
- Working Docker environment
- Required documentation (README, deployment guide, testing guide)
- **Implementation Report (Mandatory)**: Report including content from section 4.5
- (Optional) Demo video or screenshots

---

**Good luck!**
