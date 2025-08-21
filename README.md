# School Proximity API (Node.js + MySQL)

## Note
The repository also contains a `docker-compose.yml` and `Dockerfile`.  
These were added for local testing and containerization, but the deployed version on Railway uses the standard Node.js setup (not Docker).

Implements two APIs:

- **POST `/addSchool`** — Add a school after validating input.
- **GET `/listSchools?lat=<lat>&lon=<lon>`** — Return all schools sorted by distance from the provided coordinates (Haversine).

## 1) Setup

### Requirements
- Node.js >= 18
- MySQL 8+

### Configure env
Copy `.env.example` to `.env` and fill DB credentials.

```bash
cp .env.example .env
```

### Install deps
```bash
npm install
```

### Create DB + table
Import `schema.sql` into MySQL (via CLI or a GUI).

```bash
mysql -u root -p < schema.sql
```

## 2) Run
```bash
npm run start   # or: npm run dev
```

Server boots at `http://localhost:5000` (configurable with `PORT`).

## 3) Endpoints

### POST /addSchool
**Body (JSON)**
```json
{
  "name": "My School",
  "address": "123 Main St",
  "latitude": 28.61,
  "longitude": 77.20
}
```
**Responses**
- 201 + created row
- 400 on validation error with details

### GET /listSchools?lat=...&lon=...
**Query**
- `lat` float in [-90, 90]
- `lon` float in [-180, 180]

**Response**
- 200 JSON array of schools including `distance_km`, sorted closest-first

## 4) Postman
Import `postman/SchoolAPI.postman_collection.json` and use the two prepared requests.

## Notes
- Uses `mysql2/promise` pool.
- Validates with `Joi`.
- Distance computed server-side via Haversine great-circle formula.

