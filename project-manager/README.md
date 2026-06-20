# ORR Project Manager Dashboard

A modern, high-performance Project Management Dashboard built to oversee operations, manage scopes, and coordinate with consultants.

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** Tailwind CSS (with custom themes: Light, Dark, Blue)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Auth, Toasts, General App State)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **Drag & Drop:** [@dnd-kit/core](https://dndkit.com/)

## Features
- **Secure Authentication:** Complete authentication flows including Login, Registration, Forgot Password, and 2FA Verification simulations.
- **Multilingual Support:** Fully interpolated text allowing seamless switching between English and Italian across all pages.
- **Dynamic Theming:** Deeply integrated theme toggle (Light, Dark, and Blue modes) that automatically enforces text contrast and readability.
- **Interactive UI Components:** Reusable, animated `Modal` windows and a global `Toast` notification system for user feedback.
- **Comprehensive Dashboards:**
  - **Overview:** Real-time metrics and quick links.
  - **Projects & Tasks:** Kanban-style drag-and-drop task management.
  - **Approvals & Requests:** Queues for document verification and consultant onboarding.
  - **Calendar & Messages:** Scheduling syncs and secure chat interfaces.
  - **Reports & Analytics:** Visualized project completion and utilization metrics.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
