import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTicketContext } from "../../api/ticketApi"; // Import useTicketContext hook

export const UpdateTicket = ({ _id }) => {
  const { updateReplyTicket } = useTicketContext(); // Get the updateReplyTicket function from context
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Handle the absence of user information
    const sender = "Anonymous"; // Set a default sender name
    // Alternatively, you can simply skip sending the sender's name if it's not available

    const msgObj = {
      message,
      sender,
    };

    try {
      // Call the updateReplyTicket function from context
      await updateReplyTicket(_id, msgObj);
      setMessage("");
    } catch (error) {
      console.error("Error updating reply:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Reply
        </label>
        <p className="mt-2 text-sm text-gray-500">Please reply your message here or update the ticket</p>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={handleOnChange}
          rows="5"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mt-1"
        ></textarea>
        <div className="text-right mt-3 mb-3">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reply
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateTicket.propTypes = {
  _id: PropTypes.string.isRequired,
};
