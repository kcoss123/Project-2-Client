import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageBreadcrumb } from "../../components/BreadCrumb/BreadCrumb";
import { TicketTable } from "../../components/TicketTable/TicketTable";
import { useTicketContext } from "../../api/ticketApi";

export const Dashboard = () => {
  const { getAllTickets } = useTicketContext(); // Accessing getAllTickets function from TicketContext
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const allTickets = await getAllTickets(); // Using getAllTickets function from TicketContext
        setTickets(allTickets);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    if (tickets.length === 0 && loading) {
      fetchTickets();
    }
  }, [getAllTickets, tickets, loading]);

  const pendingTickets = tickets.filter((row) => row.status !== "closed");
  const totalTickets = tickets.length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <PageBreadcrumb page="Dashboard" />

      <div className="text-center mt-5">
        <Link to="/AddTicket">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Add New Ticket
          </button>
        </Link>
      </div>

      <div className="text-center mt-4">
        <div>Total tickets: {totalTickets}</div>
        <div>Pending tickets: {pendingTickets.length}</div>
      </div>

      <hr className="my-6" />

      <div className="mt-6">Recently Added tickets</div>

      <div className="mt-6">
        <TicketTable tickets={tickets} />
      </div>
    </div>
  );
};
