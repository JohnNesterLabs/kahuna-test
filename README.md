# Kahuna Labs Website

A high-performance React application featuring complex scroll-based animations and a responsive design. This project uses a custom-built WebP sequence player to deliver smooth, app-like experiences on the web.

## 🚀 Key Features

*   **High-Performance Scroll Animation**: Uses a highly optimized custom hook (`useWebPSequence`) that synchronizes frame playback with user scroll, minimizing React re-renders by ~99%.
*   **Responsive Design**: distinct animation sequences and behaviors for Desktop and Mobile devices.
*   **Smart Asset Loading**: Preloads critical assets to ensure smooth playback without buffering.
*   **Centralized Configuration**: All animation parameters, routes, and content constants are managed in a dedicated `config` directory.
*   **Deep Linking**: Support for sharing specific states of the animation via URL parameters (e.g., `/?ticket=2`).

## 🛠 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── homepage/   # Components specific to the homepage (WebPSequence, VideoModal, etc.)
│   └── common/     # Shared components (Header, Footer, Loader, etc.)
├── config/         # Centralized configuration files
│   ├── app/        # App-wide settings (routes, loader constants)
│   └── homepage/   # Animation settings (frame counts, pause points, video links)
├── hooks/          # Custom React hooks
│   └── homepage/   # Logic for scroll handling, video modals, and sequence control
├── pages/          # Page-level components (HomePage, Blog, etc.)
└── utils/          # Helper functions and loggers
```

## ⚙️ Configuration

You can customize the application behavior by editing files in `src/config/`.

### Animation & Homepage Settings
**File:** `src/config/homepage/constants.js`

*   **Frame Counts**: Update `totalFramesDesktop` or `totalFramesMobile`.
*   **Pause Points**: Add frame numbers to `pauseFramesDesktop` or `pauseFramesMobile` to stop the animation and show the "Play" icon.
*   **Video Links**: Update `VIDEO_MAPPING` to change which video plays at each pause point.
*   **Animation Speed**: Adjust `framesPerSecond`.

### Routes
**File:** `src/config/app/routes.js`

Add or remove pages from the `publicRoutes` or `protectedRoutes` arrays.

## 📦 Getting Started

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Start the development server**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

3.  **Build for production**
    ```bash
    npm run build
    ```
    Builds the app for production to the `build` folder.
