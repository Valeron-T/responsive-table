# Responsive Table Demo

This is a demo of a responsive table built with Next.js, TypeScript, shadcn / Dice UI components and Tailwind CSS.

## Approach
First we build a simple table using shadcn/ui components and tanstack data table (Headless UI) to handle operations such as filtering, sorting, and pagination. 

Since a table can be quite wide with 7 columns, I made use of a custom scrollable component to display the data on mobile devices. This uses the same headless UI components from the desktop UI for performing operations on data but just has a different layout instead of the table.

Also added a simple api which to return data as required for server sided filtering.

As the focus was on creating a responsive table, I haven't implemented pagination or sorting in this demo. However, the filtered API calls for these are made as required and any UI changes when filtering data are also visible.

## Project Structure

The root directory contains the following folders:
- `app/`: Contains the Next.js application code.
    - `api/`: Contains the API routes for server-side data fetching.
    - `layout.tsx`: The main layout file for the application.
    - `page.tsx`: The main page file that renders the table.
    - `table.jsx`: Contains the table components and logic.
- `components/`: Contains reusable components such as the table and scrollable table.
    - `data-table/`: Contains the TanStack Data Table components.
    - `ui/`: Contains the shadcn/ui components used in the table.
    - `app-sidebar/`: Contains the sidebar component for mobile view.
    - Other components like ticker card, navbar and time filter for the table.
- `hooks/`: Contains custom hooks for data fetching and state management.

## Running the Project
To run this project, you need to have Node.js (v24) and npm (v11+)installed on your machine. Follow these steps:
1. Clone the repository:

```bash
git clone <project-repo-url>
```

2. Navigate to the project directory:

```bash
cd responsive-table
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```
5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

