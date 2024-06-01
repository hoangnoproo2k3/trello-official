# FE 
This is full stack Trello official with Nextjs, NextAuth. Skip the tedious part and get straight to developing your app.
## Features
- Client
  - React client with functional components and Hooks
  - DNDkit Drag and Drop
  - Integration api available
  - CSS agnostic, so you don't waste your time replacing my CSS framework with yours
  - Home, Dashboard, Detail Board
  - Protected routes with Higher order components
  - Different views for unauthenticated, authenticated and admin member (role)
  - Edit/Delete forms for Columns, Cards
  - Layout component, so you can have pages without Navbar
  - Loading states with Loader component

## Installation
Read on on how to set up this for development. Clone the repo.
```
$ git clone https://github.com/hoangnoproo2k3/trello-official.git
$ cd trello-official
```
#### .env file
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
# Phụ thuộc ở đây
API_ROOT=http://localhost:8024
# BUILD_MODE=production

### Client
Just install the dependencies and run the dev server. App will load on `https://localhost:3000`.

```
$ npm install
$ npm run dev / start
```
