# M1Corp

M1Corp is a community-building mobile application that empowers users to come together and complete real-world tasks.

## Tech Stack

- **Framework:** React Native with Expo (TypeScript)
- **Backend:** Supabase (PostgreSQL, Authentication)
- **Authentication:** Google Sign-In via Supabase

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the app:**
    ```bash
    npx expo start
    ```

## Configuration

-   The app is configured to use Supabase for authentication.
-   Google Sign-In is set up using the `m1corp` URL scheme.
-   Ensure you have the correct Supabase credentials in `lib/supabase.ts`.

## Features

-   **Authentication:** Sign in with Google securely.
-   **Session Management:** Persistent user sessions using secure storage.
