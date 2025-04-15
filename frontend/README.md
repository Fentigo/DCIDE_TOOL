# Protected React Dashboard with Tables

This project is a React-based dashboard that displays data for exchanges, networks, and facilities in interactive tables. It features password protection, sorting, filtering, and adjustable row limits. The project is deployed on Netlify for easy access.

---

## Features

### Password Protection
- A password-protected entry ensures only authorized users can access the dashboard.
- Once logged in, the session persists via `localStorage` so users don’t need to re-enter the password after refreshing the page.

### Interactive Tables
- **Exchanges**: Displays exchange data with sorting and filtering options for facility count and ID.
- **Networks**: Displays network data with sorting options for ASN and ID.
- **Facilities**: Displays facility data with sorting options for network count and ID.

### Adjustable Row Limits
- Users can adjust the number of rows displayed per table (5, 10, 25, 50, or All).
- Includes a "Restore Default" button to reset the row limit to the default value.

### Fully Responsive
- Designed to work seamlessly on both desktop and mobile devices.

---

## Tech Stack

- **Frontend**: React.js
- **Styling**: CSS
- **Deployment**: Netlify

---

## Installation and Setup

### Prerequisites
- Node.js installed (LTS version recommended)
- Git installed

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open your browser and navigate to:

arduino
Copy code
http://localhost:3000
Deployment
This project is deployed on Netlify. You can access it at: Your Netlify URL

Steps for Deployment
Build the project:

bash
Copy code
npm run build
Deploy the build folder to Netlify:

Drag and drop the folder to Netlify’s deployment area, or connect your GitHub repository for automatic deployment.
Usage
Login:

Enter the password to access the dashboard. The default password is jordanisking.
Password is stored in localStorage to persist the session.
Navigation:

Use the navigation bar to access:
Exchanges: /exchanges
Networks: /networks
Facilities: /facilities
Tables:

Sort columns by clicking the "Sort" button in the table headers.
Adjust row limits using the dropdown menu.
Logout:

Click the "Logout" button in the navigation bar to clear the session.
Project Structure
scss
Copy code
src/
├── components/
│   ├── ExchangeTable.js
│   ├── NetworkTable.js
│   ├── FacilityTable.js
│   ├── ProtectedComponent.js
├── App.js
├── index.js
├── styles/
│   ├── ExchangeTable.css
│   ├── NetworkTable.css
│   ├── FacilityTable.css
├── utils/
│   └── dataFetching.js (optional utility for API calls)
Future Enhancements
Role-Based Authentication: Different levels of access for users.
Pagination: Add advanced pagination for large datasets.
API Integration: Extend functionality to support live updates from APIs.