# Toolinger Backend

Welcome to the backend repository for **Toolinger** – a comprehensive suite of web utility tools including YouTube to MP3/MP4 conversion, URL shortener, audio cutter, plagiarism checker, and more.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Integrations & Paid Services](#api-integrations--paid-services)
- [Tool Status & Maintenance](#tool-status--maintenance)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

Toolinger Backend provides RESTful APIs for a variety of web tools, supporting both free and paid features. The backend is built with Node.js, Express, and MongoDB, and is designed for scalability and maintainability.

---

## Features

- YouTube to MP3/MP4 Converter
- URL Shortener
- Audio Cutter
- Plagiarism Checker
- Keyword Suggestion Tool
- Google Page Speed Insights
- Google Index Checker
- Whois Lookup
- Broken Link Finder
- URL Encoder/Decoder
- Meta Tag Generator & Analyzer
- Online MD5 Generator
- Browser Info Tool
- Word Counter
- Domain Age Checker
- Backlink Maker
- Online Ping Tool
- Link Analyzer
- Keyword Density Checker
- Google Malware Checker
- Domain to IP Converter
- Server Status Checker
- Webpage Screen Resolution Simulator
- Page Size Checker
- Blacklist Lookup
- Suspicious Domain Checker
- Link Price Calculator
- Code to Text Ratio Checker
- Website Links Count Checker
- Email Privacy Checker
- Robots.txt & XML Sitemap Generator
- Search Engine Spider Simulator
- Google Cache Checker
- DNS Record Finder
- Class C IP Checker
- Get Source Code of Webpage

---

## Tech Stack

- **Node.js** (v18+)
- **Express.js**
- **MongoDB** (Mongoose)
- **TypeScript**
- **Winston** (Logging)
- **Axios, Cheerio, Proxy-Agent** (Web scraping)
- **Jest** (Testing)

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/toolinger-backend.git
   cd toolinger-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   For plagiarism checker and web scraping tools, also install:
   ```bash
   npm install axios cheerio proxy-agent
   npm install --save-dev @types/cheerio
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## Environment Variables

Create a `.env` file in the root directory. Example variables:
