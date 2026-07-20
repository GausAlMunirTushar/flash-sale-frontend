# 🎨 Flash Sale Reservation Engine
## Frontend UI/UX Design Specification

Version: 1.0

---

# 1. Design Goal

The application should feel like a premium e-commerce flash sale platform rather than a simple CRUD project.

The user should instantly understand:

- How many seats remain
- Whether they currently own a reservation
- How much time remains
- What action they should take next
- Whether the reservation has expired

The design should prioritize:

- Speed
- Clarity
- Real-time feedback
- Trust
- Accessibility
- Mobile-first experience

---

# 2. Design Principles

## Minimal

No unnecessary components.

Only information that helps users purchase quickly.

---

## Fast

Everything should feel instant.

Use optimistic UI whenever possible.

---

## Clear

Primary action should always be obvious.

Example:

Reserve Seat

↓

Mock Pay

↓

Completed

---

## High Contrast

Critical information should immediately stand out.

Example

Remaining Seats

Time Left

Payment Status

---

## Motion

Animations should be subtle.

Never distracting.

---

# 3. Color Palette

## Primary

Blue

#2563EB

---

## Success

Green

#16A34A

---

## Warning

Orange

#EA580C

---

## Danger

Red

#DC2626

---

## Information

Sky

#0284C7

---

## Background

Light

#F8FAFC

Dark

#09090B

---

## Card

White

Dark

#18181B

---

## Border

#E5E7EB

Dark

#27272A

---

# 4. Typography

Use

Inter

or

Geist

---

Heading

Bold

32px

---

Section Title

24px

SemiBold

---

Card Title

18px

Medium

---

Body

16px

Regular

---

Small

14px

---

Countdown

48px

Bold

Monospace

---

# 5. Border Radius

Card

20px

Button

14px

Input

12px

Badge

999px

---

# 6. Shadows

Cards

shadow-lg

Hover

shadow-xl

Modal

shadow-2xl

---

# 7. Icons

Use

Lucide React

Examples

Clock

Check

X

Shield

Lock

Credit Card

Alert

Refresh

User

Fingerprint

Timer

Loader

---

# 8. Animations

Framer Motion

Use

Fade

Scale

Slide

Layout

Number animation

Countdown animation

Toast animation

Modal animation

Avoid

Bounce

Heavy animation

Long animation

---

# 9. Layout

Desktop

--------------------------

Navbar

--------------------------

Hero

--------------------------

Reservation Card

--------------------------

Statistics

--------------------------

Activity

--------------------------

Footer

--------------------------

Mobile

Navbar

↓

Hero

↓

Reservation

↓

Statistics

↓

Footer

---

# 10. Responsive Breakpoints

Mobile

<640

Tablet

640+

Laptop

1024+

Desktop

1280+

Large

1536+

---

# 11. Pages

## 1. Landing Page

Purpose

Flash sale overview

---

Sections

Hero

Remaining Seats

Reserve Button

Statistics

Features

FAQ

Footer

---

Hero

Large heading

Example

Flash Sale

Only 50 Seats Available

Live Remaining Seats

Reserve Now button

Countdown until event ends

Background illustration

---

Statistics

Cards

Seats Remaining

Reserved

Sold

Visitors Online

---

Features

Fast Reservation

5 Minute Lock

Secure Payment

Real Time Updates

---

FAQ

Accordion

---

Footer

Links

Privacy

Terms

Github

Developer

---

# 2. Reservation Page

Purpose

Reserve a seat

---

Layout

Two Column

Desktop

--------------------------

Reservation Card

Activity Panel

--------------------------

Mobile

Stack

---

Reservation Card

Remaining Seats

Status Badge

Reserve Button

Progress Bar

Countdown

Reservation Details

---

Activity Panel

Recent Reservations

Live

Scrolling list

---

# 3. Countdown Page

Shown after successful reservation

---

Large Timer

04:59

Circular Progress

Reservation Status

Seat ID

Reserved At

Expire Time

Buttons

Mock Pay

Cancel Reservation

---

# 4. Payment Success

Large Check Animation

Success

Seat Reserved Successfully

Transaction ID

Seat Number

Go Dashboard

---

# 5. Reservation Expired

Large X Icon

Reservation Expired

Return Home

Reserve Again

---

# 6. 404

Minimal

Illustration

Back Home

---

# 7. Offline Page

Internet Lost

Reconnect

Retry

---

# 12. Components

Navbar

Footer

Hero

Statistics Card

Reservation Card

Countdown Timer

Circular Timer

Progress Bar

Status Badge

Toast

Button

Card

Modal

Drawer

Skeleton

Empty State

Spinner

Activity Feed

Avatar

Tooltip

Accordion

Tabs

Dropdown

Breadcrumb

Pagination

Theme Toggle

Language Switcher

---

# 13. Navbar

Logo

Flash Sale

Remaining Seats Badge

Theme Toggle

Github

Login (Optional)

Sticky

Blur Background

---

# 14. Reservation Card

Should include

Seat Status

Remaining Seats

Reserve Button

Loading State

Success State

Failure State

---

# 15. Reserve Button States

Default

Reserve Seat

Loading

Reserving...

Success

Reserved

Expired

Expired

Disabled

Sold Out

---

# 16. Mock Payment Button

Default

Mock Pay

Loading

Processing...

Completed

Paid

Disabled

Expired

---

# 17. Status Badges

Available

Green

Reserved

Orange

Expired

Red

Sold

Blue

Processing

Purple

---

# 18. Countdown

Large

Centered

Animated

Format

04:59

Color Changes

5-3 minutes

Blue

3-1 minutes

Orange

1 minute

Red

Blink last 10 seconds

---

# 19. Toast Messages

Reservation Successful

Reservation Failed

Payment Successful

Payment Failed

Reservation Expired

Already Reserved

Network Error

Server Error

Copied

---

# 20. Dialogs

Cancel Reservation

Confirm Payment

Session Expired

Sold Out

---

# 21. Empty States

No Reservation

No Activity

No Seats

---

# 22. Loading States

Skeleton

Cards

Buttons

Timer

Statistics

Activity

---

# 23. Error States

Network Lost

API Failed

Server Down

Reservation Failed

Seat Sold Out

---

# 24. Activity Feed

Live

Example

User reserved Seat

2 seconds ago

Payment completed

Reservation expired

New seat available

Auto refresh

---

# 25. Statistics Cards

Remaining Seats

Reserved Seats

Sold Seats

Visitors Online

Total Reservations

Conversion Rate

---

# 26. Progress Indicators

Seats Sold

Example

██████████░░░░

20%

---

Reservation Progress

Reserved

↓

Paid

↓

Completed

---

# 27. Accessibility

Keyboard navigation

Focus ring

ARIA labels

Screen reader support

Contrast AA

Reduced motion

---

# 28. UX Rules

Disable duplicate clicks

Prevent double payment

Show loading instantly

Never freeze UI

Always explain errors

Retry option

Undo when possible

---

# 29. Theme

Light

Dark

System

Persist preference

---

# 30. State Management

Use Zustand

Separate stores

Reservation Store

Countdown Store

Theme Store

Guest Store

Socket Store

---

# 31. Realtime Updates

WebSocket

Update

Remaining Seats

Recent Activity

Reservation Status

Countdown Sync

Payment Status

---

# 32. Notifications

Browser Notification

Reservation Expired

Payment Completed

Reconnect Success

---

# 33. Micro Interactions

Hover buttons

Card lift

Progress animation

Counter animation

Countdown pulse

Badge animation

Toast slide

---

# 34. Mobile UX

Sticky Reserve Button

Bottom Sheet

Large Touch Targets

Safe Area Support

Swipe Drawer

---

# 35. Suggested Folder Structure

src/

app/

components/

layout/

features/

reservation/

payment/

countdown/

statistics/

activity/

shared/

hooks/

services/

stores/

types/

lib/

styles/

assets/

---

# 36. Recommended Libraries

Next.js

TypeScript

Tailwind CSS

Shadcn UI

Framer Motion

Zustand

TanStack Query

React Hook Form

Zod

React Hot Toast

React CountUp

React Circular Progressbar

Lucide React

Socket.io Client

Next Themes

Date-fns

React Use

Class Variance Authority

clsx

tailwind-merge

---

# 37. UI Inspiration

Stripe

Vercel

Linear

Clerk

GitHub

Raycast

Notion

Apple

Airbnb

---

# 38. Final UX Flow

Landing

↓

Reserve Seat

↓

Loading

↓

Reserved

↓

5 Minute Countdown

↓

Mock Payment

↓

Payment Processing

↓

Success

↓

Seat Permanently Reserved

OR

Landing

↓

Reserve

↓

Countdown

↓

Timeout

↓

Reservation Expired

↓

Seat Released

↓

Reserve Again

---

# 39. Performance Goals

First Load < 2 seconds

Lighthouse > 95

CLS < 0.1

LCP < 2.5s

TTI < 3s

Image Optimization

Lazy Loading

Code Splitting

Route Prefetching

---

# 40. Deliverables

✔ Responsive Design

✔ Dark Mode

✔ Real-time Updates

✔ Countdown

✔ Activity Feed

✔ Accessibility

✔ Loading States

✔ Error States

✔ Skeletons

✔ Animations

✔ Production Ready UI

✔ Premium UX