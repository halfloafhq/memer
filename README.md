![Test status](https://github.com/halfloafhq/memer/actions/workflows/ci.yml/badge.svg)

# Memer

### One stop meme workshop

## Overview

This project is a comprehensive meme management platform that allows users to search for memes, edit them, and create personal collections. It also includes an admin dashboard for meme management and user administration.

## Features

- **Meme Search**: Easily find memes from our extensive database.
- **Meme Editing**: Edit and customize memes to your liking with Excalidraw integrated.
- **Collection Creation**: Users can create and manage their own meme collections.
- **Admin Dashboard**:
  - Upload and edit memes
  - Manage user accounts and permissions
- **User Authentication**: Secure user accounts and login system.

## Tech Stack

- **Frontend**:
  - NextJS 14
  - TypeScript
  - TailwindCSS
  - ShadCN UI
- **Backend**:
  - NextJS API Routes + Server Actions
  - Prisma (ORM)
- **Authentication**: ClerkJS
- **File Upload**: UploadThing
- **Database**: MongoDB

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Set up environment variables (for Clerk, UploadThing, and database connection)
4. Run the development server:
   ```
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Setting up with Docker

You can develop with Docker as well with the following commands:

1. Build image
   ```
   docker build -t memer .
   ```
2. Run the image
   ```
   docker run -p 3000:3000 memer
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

For any questions or issues, please open an issue in the GitHub repository.
