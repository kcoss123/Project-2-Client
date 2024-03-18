import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTicketContext } from "../../api/ticketApi";

export const TicketTable = () => {
  const { getAllTickets } = useTicketContext(); // Get the getAllTickets function from the context
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const allTickets = await getAllTickets();
        setTickets(allTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [getAllTickets]);

  if (!tickets || tickets.length === 0) {
    return <h3>No tickets to show</h3>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opened Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4 whitespace-nowrap">{row.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/ticket/${row.id}`} className="text-indigo-600 hover:text-indigo-900">
                  {row.subject}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{row.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {row.addedAt && new Date(row.addedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
