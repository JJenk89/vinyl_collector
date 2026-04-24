# My Vinyl

**An app to help record hunters find records and track their collections.**

![My Vinyl](placeholder-for-screenshot.png)

*Live site: [URL to be added after deployment]*

---

## Table of Contents

- [My Vinyl](#my-vinyl)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Architecture Overview](#architecture-overview)
    - [How It Works](#how-it-works)
    - [Directory Structure (simplified)](#directory-structure-simplified)
    - [Design Decisions](#design-decisions)
  - [Screenshots](#screenshots)
  - [Deployment](#deployment)

---

## About

My Vinyl is a full-stack, single-page application built for vinyl record enthusiasts. It allows users to search the [Discogs](https://www.discogs.com/) database, browse album details, and save records to a personal wishlist or collection. The app was developed as a portfolio project to demonstrate modern full-stack development practices using a monolith architecture.

---

## Features

- **User Authentication**  
  Registration, log-in, and session management with Laravel's built-in auth scaffolding.

- **Discogs API Integration**  
  Search the Discogs database for vinyl albums by artist, title, or catalogue number. Album details are displayed using a clean, responsive UI.

- **Collection & Wishlist Management**  
  Authenticated users can save albums to their personal collection or wishlist. Entries are persisted in a MySQL database.

- **Responsive Design**  
  Fully responsive layout built with Tailwind CSS, optimised for mobile, tablet, and desktop.

- **Modern React Patterns**  
  Component-based architecture using React with TypeScript. Shared state is managed via Inertia's server-side props; no additional client-side state library is used.

- **Single-Page Application Experience**  
  Page transitions are handled by Inertia.js, providing a fast, SPA-like experience without a separate API layer.

---

## Tech Stack

| Layer            | Technology                          |
|------------------|-------------------------------------|
| Backend          | Laravel (11.31, PHP 8.2)            |
| Frontend         | React 18, TypeScript                |
| SPA Bridge       | Inertia.js                          |
| CSS Framework    | Tailwind CSS                        |
| Database         | MySQL                               |
| External API     | Discogs API (personal access token) |
| Server           | Nginx on Oracle Cloud VM (Ubuntu)   |
| Build Tool       | Vite                                |

---

## Architecture Overview

My Vinyl follows a **monolithic, server-rendered** architecture.

### How It Works

1. The browser sends a request to the Laravel application.
2. Laravel handles routing, authentication, and business logic.
3. Data is passed to React components via Inertia's server-side props.
4. React renders the UI and hydrates on the client, enabling interactivity.
5. API calls to Discogs are proxied through Laravel to protect API credentials.

### Directory Structure (simplified)
App
├───Http
│   ├───Controllers
│   │   └───Auth
│   ├───Middleware
│   └───Requests
│       └───Auth
├───Models
├───Providers
└───Traits
Bootstrap
Config
Database
├───factories
├───migrations
└───seeders
Public
├───assets
└───build
    └───assets
Resources
├───css
├───js
│   ├───Components
│   ├───Hooks
│   ├───Layouts
│   ├───Pages
│   │   ├───album
│   │   ├───Auth
│   │   └───Profile
│   │       └───Partials
│   └───types
└───views
Routes
Storage
Tests



### Design Decisions

- **No client-side state library:** All state originates from the server and is passed as Inertia props. This keeps the client thin and avoids synchronisation issues.
- **Discogs API proxied through Laravel:** API keys are stored in environment variables and never exposed to the browser.
- **Tailwind CSS:** Rapid design and style decisions can be made in-line rather than in separate CSS files.

---

## Screenshots

*Screenshots to be added after deployment.*

---

## Deployment

The application is deployed on an Oracle Cloud virtual machine:

- **Server:** Nginx
- **OS:** Ubuntu
- **PHP:** 8.2
- **Node.js:** 18.13.0 (for build step only)
- **Database:** MySQL