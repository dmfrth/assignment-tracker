# Assignment Tracker (Milestone 2)

This assignment tracker uses a React single page app which talks to an Express REST API. Assignments have a name, course, due date, and completion status.

Created by Danielle Forth and Ryan Sobocienski

## Project Outline
```
assignment-tracker/
    client/         React single page application
    server/         Express REST API and Vitest tests
    docs/           API contract and debugging analysis
```

## Prerequisites
- Node.js
- Git

## Setup

From the project's root folder, install each tier's dependencies using these commands:

```bash
cd client
npm install
cd ..
cd server
npm install
cd ..
```

## Running the application

This application needs both client and server running at the same time, so we need to use two separate terminals.

**Terminal 1: API (localhost:3001)**
```bash
cd server
npm run dev
```
**Terminal 2: React app (localhost:5173)**
```bash
cd client
npm run dev
```

Then, open **http://localhost:5173/** in your browser.

To stop a server, click into its terminal and press 'Ctrl + C'.

## Running the tests

```bash
cd server
npm test
```

All tests should pass, the tests do not need the server to be running.

## Notes

- Data is stored in memory, so the two sample assignments will be reset every time the API server restarts.
