# M1Corp

M1Corp is a community-building mobile application that empowers users to come together and complete real-world tasks.

## Tech Stack

- **Framework:** React Native with Expo (TypeScript)
- **Backend:** Supabase (PostgreSQL, Authentication)
- **Authentication:** Google Sign-In via Supabase
- **Maps:** React Native Maps, Expo Location
- **Testing:** Maestro (E2E)

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the app (Development Build):**
    ```bash
    npx expo run:android
    ```
    *Note: This requires Android Studio and an emulator to be set up.*

3.  **Run E2E Tests (Maestro):**
    *   Install Maestro:
        ```bash
        powershell -Command "iwr -useb https://get.maestro.mobile.dev | iex"
        ```
    *   Run the tests (with the app running):
        ```bash
        maestro test .maestro/login.yaml
        ```

## Configuration

-   The app is configured to use Supabase for authentication.
-   Google Sign-In is set up using the `m1corp` URL scheme.
-   Ensure you have the correct Supabase credentials in `lib/supabase.ts`.

## Features

-   **Authentication:** Sign in with Google securely.
-   **Session Management:** Persistent user sessions using secure storage.
-   **Community:** See list of active users.
-   **Live Location:** Track users on a map in real-time.
