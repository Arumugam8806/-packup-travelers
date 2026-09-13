# PackUp Travelers

A 3-in-1 **Train + Bus + Flight** ticket booking system.
Frontend: **Angular 17**. Backend: **Java Spring Boot 3** with an in-memory **H2** database (zero DB setup required).

---

## ✨ What's included

- Brown & gold travel-themed UI with a custom logo, hand-drawn line icons, scroll-reveal
  animations, 3D tilt cards, and floating/drifting vehicle animations.
- Home page with a tabbed Train / Bus / Flight search widget, "how it works" steps,
  feature highlights, popular routes and testimonials.
- Search results page with sorting (departure / price / rating) and live seat counts.
- Booking form with passenger details, ticket stepper, and a live fare breakdown
  (base fare + 5% tax = total).
- Ticket-style booking confirmation page with a PNR, printable via the browser.
- Spring Boot REST API with search, booking creation, PNR lookup, and seat-availability
  enforcement, backed by seed data for real Indian train/bus/flight routes.

---

## 1. Run the backend (Spring Boot)

**Requirements:** Java 17+ and Maven (or use the Maven Wrapper if you add one).

```bash
cd backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080**. Sample endpoints:

- `GET  /api/trips/search?mode=TRAIN&source=Chennai&destination=Bengaluru`
- `GET  /api/trips/{id}`
- `GET  /api/trips/locations`
- `POST /api/bookings`  → `{ tripId, travelDate, numberOfTickets, passengerName, email, phone }`
- `GET  /api/bookings/{pnr}`

An H2 web console is available at `http://localhost:8080/h2-console`
(JDBC URL: `jdbc:h2:mem:packupdb`, user `sa`, no password) if you want to inspect the seeded data.

The database is seeded automatically on first run with 6 trains, 6 buses and 6 flights
across major Indian cities (Chennai, Bengaluru, Mumbai, Delhi, Hyderabad, Kolkata, etc.).
Data resets every time the app restarts (in-memory DB) — that's expected for a demo build.

## 2. Run the frontend (Angular)

**Requirements:** Node.js 18+ and npm.

```bash
cd frontend
npm install
npm start
```

This opens **http://localhost:4200** and proxies API calls to `http://localhost:8080/api`
(see `src/environments/environment.ts` if you need to change the backend URL).

> Make sure the backend is already running — the search page will show a friendly
> error if it can't reach the API.

## 3. Build for production

```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/packup-travelers`. Deploy that folder to any static host
(Nginx, Netlify, S3, etc.) and point `environment.prod.ts` at your deployed backend URL.

For the backend, package a runnable jar with:

```bash
cd backend
mvn clean package
java -jar target/packup-travelers.jar
```

---

## Project structure

```
packup-travelers/
├── backend/                     Spring Boot API (Java 17, Maven, H2)
│   └── src/main/java/com/packup/travelers/
│       ├── controller/          REST endpoints + global exception handling
│       ├── service/             Search + booking/fare business logic
│       ├── repository/          Spring Data JPA repositories
│       ├── model/                Trip & Booking JPA entities
│       ├── dto/                  Request/response payloads
│       └── loader/               Seeds sample trips on startup
└── frontend/                    Angular 17 app
    └── src/app/
        ├── components/
        │   ├── header, footer    Site chrome + animated nav
        │   ├── home               Hero, search widget, marketing sections
        │   ├── search-results     Trip listing, sorting, seat availability
        │   ├── booking-form        Passenger details + fare summary
        │   ├── confirmation        Ticket-style booking confirmation
        │   └── not-found
        ├── core/
        │   ├── models              Trip / Booking TypeScript interfaces
        │   └── services            HTTP services + shared booking state
        └── shared/directives       Scroll-reveal (IntersectionObserver)
```

---

## Notes & possible next steps

This is a fully working demo/prototype meant to be run locally and extended:

- **Payments** aren't wired up — `POST /api/bookings` marks a booking as `CONFIRMED`
  immediately. Plug in a real payment gateway before going live.
- **Per-date seat inventory** isn't modelled — each Trip is a recurring route/schedule
  and seat counts decrement globally rather than per travel date. For production,
  add a `TripSchedule` table keyed by date.
- **Authentication** isn't included — bookings are created anonymously by email/phone.
- Swap H2 for PostgreSQL/MySQL in `application.properties` for a persistent database.
