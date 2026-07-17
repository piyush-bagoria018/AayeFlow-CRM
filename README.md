# AayeFlow CRM

A responsive SaaS CRM landing page with a complete product inquiry system — built as an assessment submission for **HelloAaye**.

Visitors read the landing page and submit an inquiry. The inquiry is validated, saved to MongoDB, and appears in an admin dashboard where the sales team can search, filter and delete leads.

**Built by Piyush Bagoria**

---

## Live Demo

| | URL |
|---|---|
| Landing Page | https://aaye-flow-crm.vercel.app |
| Admin Dashboard | https://aaye-flow-crm.vercel.app/admin |
| Backend API | https://plankton-app-ogmq5.ondigitalocean.app/api |
| API Health Check | https://plankton-app-ogmq5.ondigitalocean.app/api/health |

> The admin dashboard is intentionally open (no login). Authentication was out of scope for this assessment.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js 16 (App Router), React 19 | Allowed by the brief, and server components mean less JavaScript ships to the browser |
| Language | JavaScript | Specified as mandatory in the brief |
| Styling | Tailwind CSS v4 + CSS variables | Design tokens in one place, which makes dark mode a variable swap |
| Fonts | Mulish + Sora (`next/font`) | Self-hosted at build time, no external request, no layout shift |
| Backend | Node.js + Express 4 | Specified as preferred in the brief |
| Database | MongoDB Atlas + Mongoose | Specified as preferred in the brief |
| Testing | Vitest | Validation is a pure function, so it needs no browser or mocks |
| Hosting | Vercel (frontend) + DigitalOcean App Platform (backend) | Both give HTTPS by default, and neither sleeps on idle |

---

## Features

**Landing page**
- Hero, Features, Pricing, Testimonials, FAQ, Contact form, Footer
- Fully responsive (mobile, tablet, desktop)
- Accordion FAQ, sticky header with mobile menu
- Light and dark mode, remembered between visits

**Inquiry form** — all 8 required fields
- Full Name, Company Name, Email, Phone, Country, Industry, Company Size, Message
- Client-side validation with per-field messages
- Errors clear as the user types
- Loading, success and error states

**Admin dashboard** (`/admin`)
- Table of every inquiry, newest first
- Search across name, company and email (case-insensitive)
- Filter by industry and company size, combinable
- Delete with confirmation
- Loading, empty, error and no-results states
- Debounced search — one request when typing stops, not one per keystroke

---

## Project Structure

```
AayeFlow-CRM/
├── src/                          # Express backend
│   ├── controllers/
│   │   └── inquiry.controller.js # Request handling logic
│   ├── models/
│   │   └── inquiry.model.js      # Mongoose schema + validation
│   ├── routes/
│   │   └── inquiry.routes.js     # URL to controller mapping
│   ├── db/
│   │   └── index.js              # MongoDB connection
│   ├── utils/
│   │   ├── ApiError.js           # Error class carrying an HTTP status
│   │   ├── ApiResponse.js        # One response shape for every endpoint
│   │   └── asyncHandler.js       # Removes try/catch from controllers
│   ├── app.js                    # Express app, CORS, routes, error handler
│   ├── constants.js
│   └── index.js                  # Entry point
│
├── frontend/                     # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js         # Fonts, Header, Footer
│   │   │   ├── page.js           # Landing page
│   │   │   ├── globals.css       # Design tokens
│   │   │   └── admin/page.js     # Admin dashboard
│   │   ├── components/
│   │   │   ├── ui/               # Button, Input, Select, Textarea, Badge, Spinner
│   │   │   ├── common/           # Container, Section, Header, Footer, Logo, ThemeToggle
│   │   │   ├── home/             # Hero, Features, Pricing, Testimonials, FAQ
│   │   │   ├── inquiry/          # InquiryForm, ContactSection
│   │   │   └── admin/            # InquiryTable, InquiryFilters
│   │   ├── config/
│   │   │   ├── api.js            # The only place fetch is called
│   │   │   └── site.js           # Brand name, nav links, footer links
│   │   ├── data/                 # Static content (features, pricing, faq, ...)
│   │   ├── services/
│   │   │   └── inquiry.service.js # All inquiry API calls
│   │   └── utils/
│   │       ├── validateInquiry.js      # Form validation rules
│   │       ├── validateInquiry.test.js # 15 unit tests
│   │       └── formatDate.js
│   └── .env.local.example
│
├── .env.example
└── README.md
```

**The rule that holds it together:** a component never calls `fetch`. It calls a service, the service calls `apiRequest`, and `apiRequest` is the single place that talks to the backend. If an endpoint changes, one file changes.

---

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A MongoDB connection string (MongoDB Atlas free tier is fine)

### 1. Clone

```bash
git clone https://github.com/piyush-bagoria018/AayeFlow-CRM.git
cd AayeFlow-CRM
```

### 2. Backend

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```env
PORT=5000
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net
CORS_ORIGIN=http://localhost:3000
```

> Leave the database name out of the connection string — the app sets it from `src/constants.js`.
> In MongoDB Atlas, add your IP under **Network Access**, or the connection will time out.

```bash
npm run dev      # http://localhost:5000
```

### 3. Frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

Fill in `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

```bash
npm run dev      # http://localhost:3000
```

Both servers must be running. Landing page at `/`, dashboard at `/admin`.

---

## Running the Tests

```bash
cd frontend
npm test
```

15 unit tests covering the inquiry form validation:

```
 ✓ src/utils/validateInquiry.test.js (15 tests) 7ms

 Test Files  1 passed (1)
      Tests  15 passed (15)
```

They cover a valid submission, an empty form returning exactly eight errors, and each field's rules — name length, email format, phone format, unselected dropdowns, and message length — plus a check that only the invalid field reports an error and the others stay clean.

`validateInquiry` is a pure function: values in, errors out, with no React, no DOM and no network. That is what makes it testable without rendering a component or mocking a browser, and it is why the validation lives outside the form rather than inside it.

Use `npm run test:watch` to re-run them as you edit.

---

## API Documentation

**Base URL:** `http://localhost:5000/api`

Every response — success or failure — uses the same shape, so the frontend always knows what to expect:

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Success",
  "success": true
}
```

---

### `POST /api/inquiry`

Save a new inquiry.

**Body** — all fields required:

| Field | Type | Rules |
|---|---|---|
| `fullName` | string | 2–80 characters |
| `companyName` | string | max 100 characters |
| `email` | string | valid email |
| `phone` | string | 7–20 chars, digits and `+ - ( )` |
| `country` | string | — |
| `industry` | string | — |
| `companySize` | string | one of `1-10`, `11-50`, `51-200`, `201-500`, `500+` |
| `message` | string | 10–1000 characters |

**Request**

```bash
curl -X POST http://localhost:5000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Ananya Rao",
    "companyName": "Nimbus Retail",
    "email": "ananya@nimbusretail.in",
    "phone": "+91 98450 12345",
    "country": "India",
    "industry": "Retail & E-commerce",
    "companySize": "51-200",
    "message": "We run 12 stores and want to move our sales team onto a CRM."
  }'
```

**201 Created**

```json
{
  "statusCode": 201,
  "data": {
    "_id": "6a57b75d9bec5c2039fb8cc0",
    "fullName": "Ananya Rao",
    "companyName": "Nimbus Retail",
    "email": "ananya@nimbusretail.in",
    "phone": "+91 98450 12345",
    "country": "India",
    "industry": "Retail & E-commerce",
    "companySize": "51-200",
    "message": "We run 12 stores and want to move our sales team onto a CRM.",
    "status": "new",
    "createdAt": "2026-07-16T10:30:00.000Z",
    "updatedAt": "2026-07-16T10:30:00.000Z"
  },
  "message": "Inquiry submitted successfully",
  "success": true
}
```

**400 Bad Request** — missing fields

```json
{
  "statusCode": 400,
  "data": null,
  "message": "All fields are required",
  "errors": [],
  "success": false
}
```

**400 Bad Request** — invalid values

```json
{
  "statusCode": 400,
  "data": null,
  "message": "Validation failed",
  "errors": [
    "Please provide a valid email",
    "Message must be at least 10 characters"
  ],
  "success": false
}
```

---

### `GET /api/inquiry`

Retrieve all inquiries, newest first.

**Query parameters** — all optional, combinable:

| Parameter | Description |
|---|---|
| `search` | Case-insensitive match on name, company **or** email |
| `industry` | Exact industry match |
| `companySize` | Exact size match |

**Requests**

```bash
curl http://localhost:5000/api/inquiry
curl "http://localhost:5000/api/inquiry?search=nimbus"
curl "http://localhost:5000/api/inquiry?industry=Logistics&companySize=11-50"
```

**200 OK**

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "6a57b75d9bec5c2039fb8cc0",
      "fullName": "Ananya Rao",
      "companyName": "Nimbus Retail",
      "email": "ananya@nimbusretail.in",
      "phone": "+91 98450 12345",
      "country": "India",
      "industry": "Retail & E-commerce",
      "companySize": "51-200",
      "message": "We run 12 stores and want to move our sales team onto a CRM.",
      "status": "new",
      "createdAt": "2026-07-16T10:30:00.000Z",
      "updatedAt": "2026-07-16T10:30:00.000Z"
    }
  ],
  "message": "Inquiries fetched successfully",
  "success": true
}
```

No matches returns `data: []` with status 200 — an empty result is not an error.

---

### `DELETE /api/inquiry/:id`

Delete one inquiry. Returns the deleted document.

**Request**

```bash
curl -X DELETE http://localhost:5000/api/inquiry/6a57b75d9bec5c2039fb8cc0
```

**200 OK**

```json
{
  "statusCode": 200,
  "data": { "_id": "6a57b75d9bec5c2039fb8cc0", "fullName": "Ananya Rao" },
  "message": "Inquiry deleted successfully",
  "success": true
}
```

**400 Bad Request** — malformed id

```json
{ "statusCode": 400, "data": null, "message": "Invalid inquiry id", "success": false }
```

**404 Not Found** — valid id, no such inquiry

```json
{ "statusCode": 404, "data": null, "message": "Inquiry not found", "success": false }
```

---

### `GET /api/health`

Confirms the server is running.

```json
{ "status": "ok", "message": "AayeFlow API is running" }
```

---

## Design Decisions

**Validation runs on both sides, and the rules are kept in sync.**
`frontend/src/utils/validateInquiry.js` mirrors the rules in `src/models/inquiry.model.js`. The client check exists for fast, friendly feedback. The server check is the one that protects the data, because anyone can bypass the browser and call the API directly. Client-side validation is UX; server-side validation is security.

**One response shape for every endpoint.**
`ApiResponse` and `ApiError` mean success and failure look identical in structure. `apiRequest` on the frontend unwraps that envelope once and throws on failure, so components use plain `try/catch` instead of checking `success` everywhere.

**Colours are CSS variables, not hardcoded values.**
Every colour is defined once in `globals.css` and mapped to Tailwind through `@theme`. No component contains a hex code.

**Navy text on teal buttons, not white.**
The brand teal (`#25cdc7`) is bright. White text on it gives a contrast ratio of 1.97:1, which fails accessibility guidelines. Navy on teal gives 6.89:1, which passes comfortably — and stays on brand.

**Content is separated from presentation.**
The `data/` folder holds features, pricing, testimonials and FAQ as plain arrays. Sections map over them, so adding a feature is a data change, not a JSX change, and every card is guaranteed to look the same.

**Only three components use `"use client"`.**
The header (mobile menu), the FAQ (accordion) and the admin page (fetching, filters). Everything else renders on the server, so no unnecessary JavaScript is shipped.

**Admin search runs in the database, not the browser.**
`GET /api/inquiry` does the filtering with MongoDB `$regex` and `$or`. Filtering client-side would mean downloading every inquiry first, which stops working the moment there are thousands.

**Icons are inline SVG paths.**
Stored as path strings in `data/features.js` and drawn directly. No icon library, so no dependency and no bundle cost for six icons.

---

## Notes

Testimonials, company names and statistics on the landing page are fictional sample content for a demo product. AayeFlow is not a real product and is not affiliated with HelloAaye.
