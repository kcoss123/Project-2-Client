import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageBreadcrumb } from "../../components/BreadCrumb/BreadCrumb";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { TicketTable } from "../../components/TicketTable/TicketTable";
import { useTicketContext } from "../../api/ticketApi";

export const TicketLists = () => {
  const { getAllTickets } = useTicketContext();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const allTickets = await getAllTickets();
        setTickets(allTickets);
        setFilteredTickets(allTickets); // Initialize filteredTickets with all tickets
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchTickets();
    }
  }, [getAllTickets, loading]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = tickets.filter((ticket) =>
      ticket.subject.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTickets(filtered);
  };

  const pendingTickets = filteredTickets.filter((row) => row.status !== "closed");
  const totalTickets = filteredTickets.length;

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <PageBreadcrumb page="Ticket Lists" />
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <Link to="/AddTicket">
            <button className="btn btn-info">Add New Ticket</button>
          </Link>
        </div>
        <div className="text-right">
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
      <hr className="my-4" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <TicketTable tickets={filteredTickets} />
        </div>
      )}
    </div>
  );
};
