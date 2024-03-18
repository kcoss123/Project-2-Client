import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageBreadcrumb } from "../../components/BreadCrumb/BreadCrumb";
import { MessageHistory } from "../../components/MessageHistory/MessageHistory";
import { UpdateTicket } from "../../components/UpdateTicket/UpdateTicket";
import { useTicketContext } from "../../api/ticketApi"; // Import useTicketContext hook

export const Ticket = () => {
  const { tId } = useParams();
  const {
    getSingleTicket,
    updateTicketStatusClosed,
    resetResponseMessages,
    updateTicket
  } = useTicketContext(); // Get the necessary functions from context

  const [selectedTicket, setSelectedTicket] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [replyMsg, setReplyMsg] = useState("");
  const [replyTicketError, setReplyTicketError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to track if the ticket is being edited
  const [editedTicket, setEditedTicket] = useState({}); // State to store edited ticket data

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setIsLoading(true);
        const ticket = await getSingleTicket(tId); // Use getSingleTicket function from context
        setSelectedTicket(ticket);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error fetching ticket");
      }
    };

    fetchTicket();

    return () => {
      // Reset response messages when component unmounts
      (replyMsg || replyTicketError) && resetResponseMessages();
    };
  }, [tId, getSingleTicket, resetResponseMessages]);

  const closeTicketHandler = async () => {
    try {
      await updateTicketStatusClosed(tId); // Use updateTicketStatusClosed function from context
      setSelectedTicket({ ...selectedTicket, status: "Closed" });
    } catch (error) {
      setReplyTicketError("Error closing ticket");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTicket(selectedTicket); // Initialize edited ticket with current ticket data
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTicket({}); // Reset edited ticket data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTicket(tId, editedTicket); // Use updateTicket function from context to update ticket
      setIsEditing(false);
      setReplyMsg("Ticket updated successfully");
      setSelectedTicket(editedTicket); // Update selected ticket with edited ticket data
    } catch (error) {
      setReplyTicketError("Error updating ticket");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <PageBreadcrumb page="Ticket" />
      </div>
      <div>
        {isLoading && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        {replyTicketError && (
          <div className="alert alert-danger">{replyTicketError}</div>
        )}
        {replyMsg && <div className="alert alert-success">{replyMsg}</div>}
      </div>
      <div className="flex justify-between">
        <div className="text-weight-bolder text-secondary">
          <div className="subject">Subject: {selectedTicket.subject}</div>
          <div className="date">
            Ticket Opened:{" "}
            {selectedTicket.addedAt &&
              new Date(selectedTicket.addedAt).toLocaleString()}
          </div>
          <div className="status">Status: {selectedTicket.status}</div>
        </div>
        <div className="text-right">
          {isEditing ? (
            <>
              <button
                className="btn btn-outline-info mr-2"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn btn-outline-info"
              onClick={handleEdit}
              disabled={selectedTicket.status === "Closed"}
            >
              Edit Ticket
            </button>
          )}
          <button
            className="btn btn-outline-info"
            onClick={closeTicketHandler}
            disabled={selectedTicket.status === "Closed"}
          >
            Close Ticket
          </button>
        </div>
      </div>
      <div className="mt-4">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={editedTicket.subject || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={editedTicket.description || ""}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        ) : (
          <div>
            {!isEditing && selectedTicket.history && (
              <MessageHistory messages={selectedTicket.history} />
            )}
          </div>
        )}
      </div>
      <hr className="my-4" />
      <div className="mt-4">
        <UpdateTicket _id={tId} />
      </div>
    </div>
  );
};
