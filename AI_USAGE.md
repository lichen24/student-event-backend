# AI Usage Documentation

## 1. Overview

During the development of this backend project, AI tools (such as ChatGPT) were used as a **supportive learning and development aid**. The purpose of using AI was to improve understanding, debug issues, and accelerate development, while all final decisions, implementations, and integrations were performed by the team members.

AI was not used to automatically generate the full project. Instead, it was used in a controlled and responsible way to assist specific tasks.

---

## 2. How AI Was Used

AI was mainly used in the following areas:

### **Debugging and Problem Solving**

* Understanding error messages (e.g., Prisma errors, authentication issues, CI failures)
* Identifying causes of HTTP status errors (401, 500, etc.)
* Fixing issues related to middleware and token handling

### **Learning and Concept Clarification**

* Understanding how JWT authentication works
* Learning how to structure RESTful APIs correctly
* Clarifying how Prisma ORM interacts with PostgreSQL
* Understanding how CI/CD pipelines work (GitHub Actions)

### **Testing Support**

* Assisting in writing integration tests using Jest and Supertest
* Helping structure test cases for authentication, events, and registrations
* Suggesting improvements for making tests CI-compatible

### **Configuration Assistance**

* Helping configure Jest for TypeScript and ES Modules
* Supporting setup of GitHub Actions CI workflow
* Providing guidance on Docker and environment configuration

---

## 3. Human Contribution and Critical Thinking

All AI-generated suggestions were:

* **Reviewed and validated manually**
* **Modified to fit the project structure**
* **Tested locally before being accepted**

The team made all architectural decisions, including:

* API design and endpoint structure
* Database schema design (Prisma models)
* Authentication and authorization logic
* Error handling and response structure

AI outputs were often incomplete or incorrect and required adjustments. Therefore, **human understanding and decision-making played a central role** in the development process.

---

## 4. Limitations of AI Usage

* AI sometimes suggested incorrect or outdated solutions
* Some generated code did not match the project’s architecture
* Debugging still required manual investigation and testing

Because of this, AI was treated strictly as a **tool**, not a source of truth.

---

## 5. Conclusion

AI was used responsibly to support learning, debugging, and development efficiency. The final system is the result of the team’s own implementation, testing, and decision-making.

The use of AI enhanced productivity but did not replace the need for programming knowledge, problem-solving skills, or teamwork.
