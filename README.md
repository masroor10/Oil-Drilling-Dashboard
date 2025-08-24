# AI SaaS Platform for Well Drilling Data

**Author:** Masroor Ahmed  
**Date:** 2025-08-24  

---

## 1. Problem Statement

Drilling companies generate massive amounts of well data, including depths, rock composition, drilling times (DT), and gamma-ray (GR) measurements. Manual analysis and visualization are cumbersome, leading to slower decision-making.

**Goal:** Build a web-based AI SaaS platform that allows well drilling companies to:

- Manage and visualize well data interactively.
- Upload well data files and persist them.
- Query data via an AI chatbot for insights.
- Access a responsive UI across devices.

---

## 2. Requirements

### Functional Requirements

**Well List Panel:**
- Sidebar displaying a list of wells (mock data).
- Clickable well items to show well details dynamically in dashboard.

**File Upload & Data Visualization:**
- Upload Excel files with well data.
- Persist uploaded files (local storage / server folder).
- Visualize well metrics: depth (y-axis) vs rock composition, DT, GR.
- Show success/error messages on upload.

**Chatbot Integration:**
- Chat interface for asking questions about uploaded well data.
- Display user messages and AI responses.
- Use API for AI responses (Integrated but my quota limit reached).

**Responsive Design:**
- UI adjusts for desktop, tablet, and mobile.

**Deployment & Hosting:**
- Host frontend on GitHub Pages (Paid Feature).
- Host backend on AWS EC2 / Elastic Beanstalk.

### Non-Functional Requirements
- Scalable architecture for multiple wells.
- Easy maintenance and CI/CD integration.
- Monitoring of backend API health and frontend performance.

---

## 3. Proposed Architecture
<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/65ba67c0-f65c-43bf-aa3f-4d65fb671b24" />

**Explanation:**

- **Frontend:** React with MUI, organized into Layout (Header + Sidebar + Outlet) and Dashboard (Tabs: Data Visualization, Chatbot).  
- **Backend:** Express server handling file uploads, parsing Excel data using `xlsx` library, and providing API endpoints for chatbot integration.  
- **Persistence:** Currently stored in server file system; database can be added later (PostgreSQL, AWS RDS).  
- **Chatbot:** AI calls via API key; tested with Postman but API quota may limit live usage.

---

## 4. Component Design

| Component               | Description                                               |
|-------------------------|-----------------------------------------------------------|
| Layout                  | Header, Sidebar with well list, and Outlet for content.  |
| Dashboard               | Tabs: Data Visualization (charts), Chatbot (AI interface).|
| FileUpload              | Upload button, Excel parsing, backend POST request.       |
| WellDataVisualization   | Chart.js visualization of depth vs rock composition, DT, GR. |
| Chatbot                 | Messages list, input box, send button, AI response display.|

---

## 5. Data Flow
<img width="790" height="634" alt="image" src="https://github.com/user-attachments/assets/04c6c160-815c-48b7-8f65-f56c96e4e730" />


1. User selects a well from sidebar → Frontend fetches details from backend → Updates dashboard.  
2. User uploads Excel file → Frontend sends POST request to backend → Backend stores file and parses data → Sends success/failure → Frontend updates chart.  
3. User asks question in Chatbot → Frontend sends message + well data context to backend → Backend calls AI API → AI response returned → Displayed in chat UI (if quota limit is not full).  

---

## 6. Deployment Strategy

### Frontend
```bash
cd frontend
npm install
npm start
```
### Backend
```bash
cd backend
npm install
npm start
```
---

---
## 7. CI/CD Pipeline: Deploy Frontend to GitHub Pages

The frontend of this project is automatically built and deployed to GitHub Pages using GitHub Actions. The pipeline triggers on pushes to the `main` branch.

### Workflow Configuration

```yaml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: frontend
        run: npm install

      - name: Build
        working-directory: frontend
        run: NODE_OPTIONS="--max_old_space_size=4096" npm run build

      - name: Deploy
        working-directory: frontend
        run: |
          git config --global user.name "masroor10"
          git config --global user.email "102370535+masroor10@users.noreply.github.com"
          npx gh-pages -d build -r https://x-access-token:${{ secrets.OIL_TOKEN }}@github.com/${{ github.repository }}.git
```

## 8. Demo Video

A video demonstrating the working of the AI SaaS Platform for Well Drilling Data is available [here](https://drive.google.com/drive/folders/1haUIx0UFGZqtmkYW8fdML3lsuT-DYTCB?usp=sharing).




