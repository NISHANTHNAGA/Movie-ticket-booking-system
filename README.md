# CineBook — Movie Ticket Booking Platform

A full-stack movie ticket booking web app with two sides: a **customer flow** (browse movies → pick a theatre → pick a showtime → select seats → book → get a QR-code e-ticket) and an **admin flow** (manage movies, theatres, shows, and users from a dashboard).

Built with a **Django REST Framework** backend and a **React (Vite)** frontend.

---

## Features

**Customer**
- Register / login (session-based auth)
- Browse movies, filter by city and price range
- View theatres and showtimes for a movie
- Interactive seat selection with live booked-seat status
- Book tickets (with seat-conflict and past-date validation)
- Booking confirmation email (HTML + plaintext) with ticket details
- QR-code e-ticket, verifiable via a public ticket-check page
- View personal booking history ("My Bookings")

**Admin**
- Dashboard with movie/user/theatre/show counts
- CRUD for movies (with poster upload), theatres, and shows
- Assign movies to theatres
- Manage user roles (Admin / Owner / Customer / Staff)

---

## Tech Stack

**Backend**
- Python, Django 6.0.8
- Django REST Framework 3.17.1
- django-cors-headers 4.9.0
- Pillow 12.3.0 (image handling)
- SQLite3

**Frontend**
- React 19.2.8 + React DOM
- React Router DOM 7.18.2
- Axios 1.19.0
- qrcode.react 4.2.0 (QR code generation)
- Vite 8.2.0 (dev server / build tool)

---

## Project Structure

```
MovieTicketBooking/
├── backend/          # Django project config (settings, urls, wsgi/asgi)
├── users/            # Custom user model, auth, admin user management
├── movies/           # Movie catalog, admin movie CRUD, dashboard stats
├── theatres/         # Theatre records, theatre↔movie assignment
├── screens/           # Screens belonging to a theatre
├── shows/              # Showtimes (movie + theatre + date/time + price)
├── bookings/            # Booking creation, seat locking, ticket verification, email
├── media/                 # Uploaded movie posters (gitignored)
├── manage.py
└── frontend/               # React + Vite SPA
    └── src/
        ├── pages/         # One folder per screen
        ├── components/   # Navbar, Toast, ProtectedRoute
        └── services/       # Axios/fetch wrappers per backend resource
```

---

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### Backend setup

```bash
cd MovieTicketBooking
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install django djangorestframework django-cors-headers pillow

python manage.py migrate
python manage.py createsuperuser   # optional, for /admin access
python manage.py runserver
```

The API will run at `http://127.0.0.1:8000`.

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173` and proxy `/api` requests to the Django backend (see `vite.config.js`).

### Environment variables

This project currently reads sensitive values (secret key, email credentials) directly from `backend/settings.py` for local development. **Before deploying**, move the following into environment variables:

- `SECRET_KEY`
- `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD`
- `DEBUG` (set to `False` in production)
- `ALLOWED_HOSTS`

---

## API Overview

All endpoints are prefixed with `/api/`.

| Resource | Endpoints |
|---|---|
| Auth | `POST /register/`, `POST /login/`, `POST /logout/` |
| Movies | `GET /movies/`, `GET /movies/<id>/`, admin CRUD under `/admin/movies/` |
| Theatres | `GET /movies/<id>/theatres/`, admin CRUD under `/admin/theatres/` |
| Shows | `GET /movies/<id>/theatres/<id>/shows/`, admin CRUD under `/admin/shows/` |
| Bookings | `GET /shows/<id>/booked-seats/`, `POST /book/`, `GET /bookings/`, `GET /tickets/<uuid>/` |

Authentication is **session/cookie-based** (Django's built-in `authenticate()`/`login()`), not JWT.

---

## License

This project is for educational/personal use. Add a license of your choice if you plan to distribute it.
