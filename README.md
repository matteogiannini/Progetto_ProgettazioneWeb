# Space Invaders — Web Programming Project

A web-based remake of the arcade classic **Space Invaders**, built as a full PHP/MySQL web application with a JavaScript game engine. Developed for the *Web Programming* (Progettazione Web) course, Bachelor's Degree, University of Pisa.

Users register and log in, play the game in the browser, and the application persists their results — exposing personal statistics, match history, and global leaderboards.

## Features

- **User accounts** — registration and login with client-side validation (`regValidation.js`, `logValidation.js`) and server-side handling, session management.
- **The game** — a Space Invaders clone implemented in JavaScript on `<canvas>` (`gameLogic.js`): player ship, alien waves, shooting, scoring.
- **Score persistence** — completed games are saved to the database (`gameSave.php`).
- **Statistics & history** — per-user stats and a personal match history, plus aggregate/general statistics and leaderboards.
- **Private area** — an authenticated user area for profile and personal data.

## Tech stack

- **Frontend:** HTML5 (`<canvas>`), CSS3, vanilla JavaScript
- **Backend:** PHP (sessions, form handling, data access)
- **Database:** MySQL (schema/data in `giannini_615729.sql`)

## Repository structure

```
.
├── index.php            # Homepage
├── html/                # Page views
│   ├── login.php  register.php  areaPrivata.php
│   ├── gioco.php  gameGuide.html  gameHeader.php
│   ├── generalStats.php  historyPage.php
├── php/                 # Backend logic
│   ├── config.php  sessionVar.php           # DB config & session helpers
│   ├── loginData.php  registerData.php  logout.php
│   ├── gameSave.php  getStats.php  userStats.php
├── js/                  # Client-side scripts (game engine, validation, UI)
├── css/                 # Per-page stylesheets
├── images/  media/      # Sprites, icons, assets
└── giannini_615729.sql  # MySQL database dump (schema + data)
```

## Setup & run

Requires a PHP-capable web server with MySQL (e.g. XAMPP).

1. Import the database:

   ```shell
   mysql -u root -p < giannini_615729.sql
   ```

2. Configure database credentials in `php/config.php`.

3. Serve the project directory with PHP, e.g.:

   ```shell
   php -S localhost:8000
   ```

4. Open `http://localhost:8000/index.php` in a browser.

## Author

Matteo Giannini
