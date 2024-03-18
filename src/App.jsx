// App.js

import React from "react";
import { Routes, Route } from 'react-router-dom'; 
import { DefaultLayout } from "./layout/DefaultLayout";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { AddTicket } from "./pages/NewTicket/AddTicket";
import { TicketLists } from "./pages/TicketList/TicketLists";
import { Ticket } from "./pages/Ticket/Ticket";
import Home from "./pages/Home/Home"; // Import the Home component
import { TicketProvider } from './api/ticketApi';

function App() {
  return (
    <TicketProvider>
      <div className="App">
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Route for the home page */}
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/AddTicket" element={<AddTicket />} />
            <Route path="/Ticket/:tId" element={<Ticket />} />
            <Route path="/ticketlists" element={<TicketLists />} />
            <Route path="*" element={<h1>404 Page not found</h1>} />
          </Routes>
        </DefaultLayout>
      </div>
    </TicketProvider>
  );
}

export default App;
