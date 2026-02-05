# Bühler Online Store 🌾

Hey there! This is a single-page web application I built for Bühler customers to explore industrial products and manage orders. The goal was to create a smooth, high-performance experience that feels modern and professional.

**🔗 [View Live Demo](https://sapyati.github.io/vue-buhler-online-store/)**

---

## 🛠 My Tech Stack

I chose these tools because they work great together for building scalable apps:

- **Vue 3 (Composition API)** - For a reactive and modular UI.
- **Pinia** - To handle state management (I used the Setup Store syntax for better readability).
- **Vite** - For a lightning-fast development experience.
- **TypeScript** - To keep the code type-safe and catch bugs early.
- **Vitest** - For unit testing the logic.

---

## 🚀 How to Run it Locally

If you want to pull this down and play with the code, here’s how to get started:

1. **Clone the project:**

   ```bash
   git clone [https://github.com/sapyati/vue-buhler-online-store.git](https://github.com/sapyati/vue-buhler-online-store.git)
   cd vue-buhler-online-store

   ```

2. **Install everything:**
   npm install

3. **Fire up the dev server:**
   npm run dev

Now just open http://localhost:5173 in your browser.

What's Under the Hood?
Smart Data Management
Instead of just dumping a list of products, I built a dedicated Product Store in Pinia. It handles the "heavy lifting" like:

Grouping: I used computed properties to automatically categorize products (Rollers, Sorters, Dryers) so the UI stays clean.

Loading States: Even though the data is local for this demo, I implemented a simulated network delay and proper loading/error states so the app feels like it’s talking to a real API.

Quality Control
I’m a bit obsessive about clean code, so I’ve integrated:

Linting: Using ESLint and Oxlint to keep things consistent.

Formatting: Prettier is set up to handle the "tabs vs spaces" arguments.

Type Checking: Every build runs through vue-tsc to ensure no weird type errors sneak into production.

Useful Commands
npm run build - Preps the app for production (runs type-checks and minifies).

npm run test:unit - Runs the test suite and shows coverage.

npm run lint - Checks the code for common issues and fixes them.

npm run deploy - Pushes the latest build live to GitHub Pages.

Deployment Note
The app is currently hosted on GitHub Pages. I used the gh-pages package to automate the deployment from the dist folder.

Thanks for checking it out!
