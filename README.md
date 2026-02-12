# BlueCred - Decentralized Blue Carbon Registry

This is a production-grade MVP for a decentralized blue carbon registry platform.

## Tech Stack
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (Prisma ORM) - Changed from PostgreSQL for easier local demo.
- **Auth**: JWT + bcrypt
- **AI**: OpenAI API Integration

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```
   *Note: If `npm install` was interrupted, run it again.*

2. **Database Setup**
   - The project is configured to use a local SQLite file (`dev.db`).
   - Run migrations:
     ```bash
     npx prisma generate
     npx prisma db push
     ```

3. **Environment Variables**
   - Check `.env` and fill in `OPENAI_API_KEY` for AI features.
   - `JWT_SECRET` is set to a default for development.

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Features
- **User Auth**: Signup/Login (Community, NGO, Buyer, Admin roles).
- **Dashboard**: Stats and Recent Activity.
- **Projects**: Upload blue carbon projects (Mangroves, Seagrass, etc.).
- **AI Verification**: Automatic analysis of project data using OpenAI.
- **Marketplace**: Buy carbon credits generated from verified projects.
- **Blockchain Explorer**: View immutable records of credit minting and transfers.
- **Admin Panel**: Approve projects to mint credits.

## Simulation Notes
- **AI**: Uses OpenAI API. If key is missing, returns mock data.
- **Blockchain**: Simulates a blockchain using SHA-256 hashing and a linked list in the database.
- **Payments**: Simulates credit purchase (transfer of ownership).

## Folder Structure
- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable UI components.
- `lib/`: Utilities (Prisma, Auth, AI, Blockchain).
- `prisma/`: Database schema.
