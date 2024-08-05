# Marvel Characters App

This project is a web application that showcases Marvel characters using data from the [Marvel API](http://gateway.marvel.com/v1/). Users can browse characters, view details and associated comics, and mark characters as favorites. The application is built with Next.js, TypeScript, Sass, and includes unit and integration tests using Jest and React Testing Library. It also uses ESLint and Prettier for code formatting and Context API for global state management.

## Features

- **Character Listing:** Browse a list of Marvel characters.
- **Character Detail Page:** View detailed information about a character, including the comics they have appeared in.
- **Favorites:** Mark characters as favorites and easily access them via the header's heart icon.
- **Responsive Design:** The application is fully responsive and works across different devices.
- **Global State Management:** Handled using Context API.
- **Unit and Integration Tests:** Tests are written using Jest and React Testing Library.
- **Code Formatting:** Enforced using ESLint and Prettier.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Architecture and Structure](#project-architecture-and-structure)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Formatting and Linting](#formatting-and-linting)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pvelezp/marvel-app.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Project Architecture and Structure

The project follows a modular and scalable architecture with the following structure:

```bash
.
├── components            # Reusable UI components
├── context               # Context API for global state management
├── hooks                 # Custom hooks for reusable logic
├── pages                 # Next.js pages
│   ├── _app.tsx          # Custom App component
│   ├── index.tsx         # Home page
│   └── character/[id]    # Character detail pages
├── public                # Public assets such as images and icons
├── styles                # Global styles and theme settings
├── types                 # TypeScript types and interfaces
├── utils                 # Utility functions
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── jest.config.js        # Jest configuration
└── README.md             # Project documentation
```

### Key Concepts:

- **Context API:** Used for managing global state, particularly for handling favorites functionality.
- **Custom Hooks:** Reusable logic is encapsulated in custom hooks (e.g., fetching data, handling accessibility).
- **Component-based Architecture:** Components are organized in a way that promotes reusability and maintainability.

## Technologies Used

- **Next.js:** React framework for building server-rendered applications.
- **TypeScript:** Static type checking for JavaScript.
- **Sass:** CSS preprocessor for styling.
- **Jest:** JavaScript testing framework.
- **React Testing Library:** Testing utilities for React components.
- **ESLint:** Linter for identifying and fixing problems in JavaScript/TypeScript code.
- **Prettier:** Code formatter for consistent code style.

## Testing

### Running Tests

1. To run the tests, use the following command:

   ```bash
   npm run test
   ```

   or

   ```bash
   yarn test
   ```

2. Tests are written using Jest and React Testing Library and are located alongside their respective components.

## Formatting and Linting

- **ESLint:** Used for linting the codebase. You can run ESLint using:

  ```bash
  npm run lint
  ```

- **Prettier:** Used for code formatting. To format your code, run:

  ```bash
  npm run format
  ```

## Image Optimization

Next.js provides built-in image optimization to enhance performance and user experience:

Automatic Optimization: Images are automatically resized, compressed, and served in the best format (e.g., WebP or AVIF) based on the user's device and browser.
Responsive Images: The <Image> component generates different image sizes for various screen resolutions and devices.
Lazy Loading: Images are lazy-loaded, meaning they only load when they enter the viewport, reducing initial load time.
Blur-Up Placeholder: Displays a low-quality, blurred version of the image while the full image loads, improving perceived performance.

## API Integration

The application fetches data from the [Marvel API](http://gateway.marvel.com/v1/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README file should provide a comprehensive overview of your project and guide users through installation, usage, and contribution processes.
