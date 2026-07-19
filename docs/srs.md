# Flash Sale Reservation Engine - Frontend SRS

**Version:** 1.0  
**Architecture:** Modern React Application  
**Framework:** Next.js 16+ (App Router)  
**Language:** TypeScript  
**Styling:** Tailwind CSS
**State Management:** Zustand  
**API:** REST API (NestJS Backend)  
**Authentication:** Better Auth + JWT + Guest Authentication

---

# 1. Project Overview

## Project Name

Flash Sale Reservation Engine Frontend

## Description

Build a modern, responsive, and production-ready frontend for a Flash Sale Reservation System.

Users can reserve one seat for 5 minutes. During this period, a countdown timer is displayed. If payment is completed before the timer expires, the reservation becomes permanent. Otherwise, the reservation expires automatically.

The application should provide a smooth user experience while accurately reflecting the backend state.

---

# 2. Objectives

- Responsive UI
- Fast user experience
- Real-time countdown
- Live seat availability
- Guest & Registered User support
- Secure Authentication
- Beautiful UI
- Accessible Design

---

# 3. Tech Stack

## Framework

- Next.js 16+ (App Router)
- React 19
- TypeScript

## Styling

- Tailwind CSS
- Lucide Icons
- Framer Motion

## State Management

- Zustand

## Forms

- React Hook Form
- Zod Validation

## Data Fetching

- TanStack Query
- Axios

## Authentication

- Better Auth Client
- JWT

## Utilities

- Day.js
- Sonner Toast
- React Countdown

---

# 4. Functional Requirements

## Guest User

Guest users should be able to:

- Visit without login
- Automatically receive Guest Session
- Reserve seat
- View countdown
- Complete mock payment
- View reservation status

---

## Registered User

Users should be able to:

- Register
- Login
- Logout
- View Profile
- Reserve seat
- Complete payment
- View reservation history

---

## Reservation

Users can

- Reserve one seat
- View remaining time
- Cancel reservation
- Complete payment

---

## Payment

Users can

- Perform Mock Payment
- View payment success
- View payment failed state

---

## Seat Status

Display

- Total Seats
- Available Seats
- Locked Seats
- Sold Seats

---

# 5. Non Functional Requirements

## Performance

- Initial load under 2 seconds
- Lighthouse score above 90
- Optimized bundle size

---

## Accessibility

- Keyboard Navigation
- ARIA Labels
- Focus Management

---

## Responsive

Support

- Mobile
- Tablet
- Desktop

---

## SEO

- Metadata
- Open Graph
- Sitemap
- Robots

---

# 6. Application Structure

```
Next.js

App Router

↓

Pages

↓

Components

↓

Hooks

↓

Services

↓

API
```

---

# 7. Folder Structure

```
src/

app/
│
├── (auth)/
│   ├── login/
│   └── register/
│
├── reservation/
│
├── payment/
│
├── profile/
│
├── dashboard/
│
├── layout.tsx
├── page.tsx
└── not-found.tsx

components/
│
├── ui/
├── layout/
├── common/
├── seat/
├── reservation/
├── countdown/
├── payment/
├── auth/
└── loading/

hooks/

services/

lib/

store/

types/

constants/

providers/

utils/
```

---

# 8. Application Pages

## Public

- Landing Page
- Login
- Register
- 404 Page

---

## User

- Reservation
- Payment
- Profile
- Reservation History

---

## Admin (Optional)

- Dashboard
- Reservation Management
- Seat Statistics

---

# 9. Landing Page Sections

## Hero Section

Display

- Flash Sale Banner
- Available Seats
- Reserve Button
- Countdown (if active)

---

## Statistics

Show

- Total Seats
- Available
- Locked
- Sold

---

## How It Works

Explain

1. Reserve
2. Countdown Starts
3. Mock Payment
4. Seat Confirmed

---

## FAQ

Common questions

---

## Footer

- Copyright
- Privacy
- Terms
- Contact

---

# 10. Reservation Flow

```
Landing Page

↓

Reserve Button

↓

API Request

↓

Reservation Success

↓

Countdown Starts

↓

Mock Payment

↓

Success
```

---

# 11. Countdown Flow

```
Reservation Success

↓

Receive expiresAt

↓

Calculate Remaining Time

↓

Update Every Second

↓

Time Finished

↓

Reservation Expired
```

---

# 12. Authentication Flow

## Guest

```
Visit Website

↓

Guest Session

↓

Guest JWT

↓

Reserve
```

---

## User

```
Register

↓

Login

↓

JWT

↓

Reserve
```

---

# 13. Global State

## Auth Store

```
user

guest

accessToken

isAuthenticated

loading
```

---

## Reservation Store

```
reservation

expiresAt

remainingTime

status

loading
```

---

## Seat Store

```
total

available

locked

sold
```

---

# 14. API Integration

## Authentication

```
POST /auth/register

POST /auth/login

POST /auth/logout

POST /auth/refresh
```

---

## Guest

```
POST /guest/init

GET /guest/me
```

---

## Seat

```
GET /seats

GET /seats/statistics
```

---

## Reservation

```
POST /reservations

GET /reservations/me

DELETE /reservations/:id
```

---

## Payment

```
POST /payments/mock
```

---

# 15. Components

## Layout

- Navbar
- Footer
- Sidebar (Optional)

---

## Authentication

- Login Form
- Register Form

---

## Reservation

- Reserve Button
- Reservation Card
- Reservation Status
- Countdown Timer

---

## Seat

- Seat Statistics Card
- Seat Counter
- Seat Status Badge

---

## Payment

- Payment Card
- Payment Success
- Payment Failed

---

## Common

- Loader
- Empty State
- Error State
- Modal
- Confirm Dialog
- Toast
- Skeleton

---

# 16. UI States

## Loading

- Skeleton
- Spinner

---

## Empty

- No Reservation
- No History

---

## Error

- API Error
- Network Error

---

## Success

- Reservation Success
- Payment Success

---

# 17. Notifications

Use Toast Notifications

Examples

- Reservation Created
- Reservation Expired
- Payment Successful
- Payment Failed
- Login Successful
- Logout Successful

---

# 18. Error Handling

Handle

- Network Error
- Unauthorized
- Reservation Expired
- Seat Sold Out
- Validation Error

---

# 19. Security

- Secure Cookies
- Protected Routes
- Token Refresh
- Route Middleware
- API Error Handling
- XSS Protection

---

# 20. Production Features

- App Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- Responsive Design
- Dark Mode
- Zustand
- TanStack Query
- Better Auth
- JWT Authentication
- Axios Instance
- Error Boundary
- Loading Skeletons
- Toast Notifications
- SEO Optimization
- Lazy Loading
- Image Optimization
- Suspense
- Route Protection
- Code Splitting

---

# 21. Future Enhancements

- WebSocket Live Updates
- Real-time Seat Counter
- Push Notifications
- Multi-language (i18n)
- PWA Support
- Offline Mode
- QR Code Ticket
- User Dashboard Analytics
- Theme Customizer
- Admin Analytics Dashboard
