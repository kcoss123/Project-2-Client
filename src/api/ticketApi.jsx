import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Backend_url from '../Services/Backend_URL';

const TicketContext = createContext();

export const useTicketContext = () => useContext(TicketContext);

const rootUrl = Backend_url;
const ticketUrl = `${rootUrl}/tickets`;

const TicketProvider = ({ children }) => {
  const [error, setError] = useState(""); // Define error state

  const getAllTickets = async () => {
    try {
      const response = await axios.get(ticketUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching all tickets:", error);
      setError("Error fetching all tickets"); // Set error state
      throw error;
    }
  };

  const getSingleTicket = async (ticketId) => {
    try {
      const response = await axios.get(`${ticketUrl}/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching single ticket:", error);
      setError("Error fetching single ticket"); // Set error state
      throw error;
    }
  };

  const updateReplyTicket = async (ticketId, messageObj) => {
    try {
      // Fetch the existing ticket data
      const existingTicket = await axios.get(`${ticketUrl}/${ticketId}`);
      // Merge the new message with the existing ticket data
      const updatedTicketData = {
        ...existingTicket.data,
        history: [
          ...(existingTicket.data.history || []),
          messageObj,
        ],
      };
      // Update the ticket with the merged data
      const response = await axios.put(`${ticketUrl}/${ticketId}`, updatedTicketData);
      return response.data;
    } catch (error) {
      console.error("Error updating ticket reply:", error);
      throw error;
    }
  };  

  const filterTicketsBySearch = async (searchStr) => {
    try {
      const response = await axios.get(`${ticketUrl}?search=${searchStr}`);
      return response.data;
    } catch (error) {
      console.error("Error filtering tickets by search:", error);
      setError("Error filtering tickets by search"); // Set error state
      throw error;
    }
  };

  const openNewTicket = async (ticketData) => {
    try {
      const response = await axios.post(ticketUrl, ticketData);
      return response.data;
    } catch (error) {
      console.error("Error opening new ticket:", error);
      setError("Error opening new ticket"); // Set error state
      throw error;
    }
  };

  const updateTicketStatusClosed = async (ticketId) => {
    try {
      const response = await axios.delete(`${ticketUrl}/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error("Error closing ticket:", error);
      setError("Error closing ticket");
      throw error;
    }
  };  

  const updateTicket = async (ticketId, ticketData) => {
    try {
      const response = await axios.put(`${ticketUrl}/${ticketId}`, ticketData);
      return response.data;
    } catch (error) {
      console.error("Error updating ticket:", error);
      setError("Error updating ticket"); // Set error state
      throw error;
    }
  };

  const resetError = () => {
    setError(""); // Reset error state
  };

  return (
    <TicketContext.Provider value={{ getAllTickets, getSingleTicket, updateReplyTicket, filterTicketsBySearch, openNewTicket, updateTicketStatusClosed, updateTicket, error, resetError }}>
      {children}
    </TicketContext.Provider>
  );
};

export { TicketProvider };
