# Ticket Booking System - Concurrency Issue and Solution

## Problem Description

The QA Engineer found a critical issue with the seat booking flow preventing production deployment:

- Customer X selected seats A2, A3, and A4, then proceeded to checkout.
- While Customer X was in checkout, Customer Y saw A2, A3, and A4 still available.
- Customer Y selected seats A2 and A3 and proceeded to checkout.
- Both customers completed payment successfully.
- The system accepted two conflicting bookings for the same seats.

**Root Cause:**  
The system does not handle simultaneous seat bookings correctly. Multiple customers can select and pay for the same seats if they check out before the booking system marks the seats as taken.

---

## Solution Implementation

To fix this concurrency issue:

- When a customer initiates checkout, the seats’ `isTaken` flag is set to `true` to mark them as reserved.
- Subsequent booking attempts check if the seats are already taken:
  - If yes, the booking fails to prevent double booking.
  - If no, the booking proceeds.
- If payment is cancelled or fails, `isTaken` is reset to `false`.

This mechanism ensures no two customers can book the same seat simultaneously.

---

## Project Structure and Flow

The application structure is divided as follows:

- **Routes**: Handle HTTP requests and forward data to controllers.
- **Controllers**: Receive input from routes, validate and extract data, then call service functions.
- **Services**: Contain all business logic, e.g., buying tickets, creating orders, checking seat availability.
- **Models**: Define database schemas and interact with MongoDB via Mongoose.
- **Middleware**: Includes authentication and authorization layers, such as token verification to protect endpoints.

---

## Authentication & Authorization

- The `buyTicket` API requires the user to be logged in.
- Authentication is handled by verifying the Bearer JWT access token sent in the request header.
- The token identifies the customer, so the system knows which user is booking the seat.
- Only authenticated users can buy tickets, and their orders are linked to their customer ID.

---

## Summary

- The concurrency issue was fixed by locking seats during checkout using the `isTaken` flag.
- Proper architecture separation ensures clear responsibilities between routes, controllers, services, and models.
- Authentication via JWT guarantees secure seat booking tied to authenticated users.

---

## Packages Used

- `express` — HTTP server framework
- `mongoose` — MongoDB object modeling
- `jsonwebtoken` — JWT token creation and verification
- `bcrypt`/`bcryptjs` — Password hashing
- `dotenv` — Environment variable management
- `cors` — Cross-origin resource sharing
- `nodemon` — Development utility for auto restarting server
- `axios` — HTTP client for making requests
- `@faker-js/faker` — Fake data generation for testing

---

This document outlines the core problem, the implemented fix, and the overall system architecture for maintaining data integrity during ticket booking.
