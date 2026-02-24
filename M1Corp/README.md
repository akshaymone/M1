# M1Corp

M1Corp is a community-building mobile application that empowers users to come together and complete real-world tasks.

## Tech Stack

- **Framework:** React Native with Expo (TypeScript)
- **Backend:** Supabase (PostgreSQL, Authentication)
- **Authentication:** Google Sign-In via Supabase
- **Maps:** React Native Maps, Expo Location
- **Testing:** Detox (E2E), Jest

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

3.  **Run E2E Tests (Detox):**
    *   Build the app for testing:
        ```bash
        detox build -c android.emu.debug
        ```
    *   Run the tests:
        ```bash
        detox test -c android.emu.debug
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
