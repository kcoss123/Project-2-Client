import React, { useState, useEffect } from "react";
import { useTicketContext } from "../../api/ticketApi"; // Adjust the import path if necessary

// Function to check if text length is greater than or equal to 3
const isTextValid = async (text) => {
  return text.length >= 3;
};

// Initial form data with current timestamp
const initialFormData = {
  subject: "",
  issueDate: "",
  description: "",
  status: "",
  addedAt: new Date().toISOString(), // Store timestamp with date and time
};

// Component for adding a new ticket
const AddTicketForm = () => {
  // Using ticket context for state management
  const {
    openNewTicket,
    isLoading,
    error,
    successMsg,
    resetSuccessMsg,
  } = useTicketContext();

  // State for form data and errors
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({ ...initialFormData });

  // Reset success message on unmount or success message change
  useEffect(() => {
    return () => {
      successMsg && resetSuccessMsg();
    };
  }, [resetSuccessMsg, successMsg]);

  // Handle input change in the form fields
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { subject, status } = formData;
    const isSubjectValid = await isTextValid(subject);

    // Validate subject length
    if (!isSubjectValid) {
      setFormErrors({
        ...initialFormData,
        subject: "Subject is required and must be at least 3 characters.",
      });
      return;
    }

    try {
      // Call openNewTicket function from context
      await openNewTicket({ ...formData });
      // Reset form data and success message on successful submission
      setFormData(initialFormData);
      resetSuccessMsg();
      // Set success message
      setSuccessMsg("Ticket submitted successfully!");
    } catch (error) {
      console.error("Error submitting ticket:", error);
      // Set error message on submission error
      setError("Error submitting ticket. Please try again.");
    }
  };

  // Render form
  return (
    <div className="mt-6 p-4 bg-gray-100">
      <h1 className="text-2xl text-center text-indigo-600 font-semibold">
        Add New Ticket
      </h1>
      <hr className="my-4" />
      {error && <div className="text-red-600">{error}</div>}
      {successMsg && <div className="text-green-600">{successMsg}</div>}
      {isLoading && <div className="text-indigo-600">Loading...</div>}
      <form
        className="space-y-4"
        autoComplete="off"
        onSubmit={handleOnSubmit}
      >
        {/* Subject field */}
        <div className="flex items-center">
          <label className="w-1/4 text-right" htmlFor="subject">
            Subject:
          </label>
          <input
            className="w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleOnChange}
            placeholder="Subject"
            required
          />
        </div>
        {formErrors.subject && (
          <div className="text-red-600">{formErrors.subject}</div>
        )}

        {/* Status field */}
        <div className="flex items-center">
          <label className="w-1/4 text-right" htmlFor="status">
            Status:
          </label>
          <select
            className="w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleOnChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Client response pending">Client Response Pending</option>
            <option value="In progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Issue Date field */}
        <div className="flex items-center">
          <label className="w-1/4 text-right" htmlFor="issueDate">
            Issue Found
          </label>
          <input
            className="w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="issueDate"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleOnChange}
            required
          />
        </div>

        {/* Message field */}
        <div>
          <label className="block" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleOnChange}
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Open Ticket
        </button>
      </form>
    </div>
  );
};

export default AddTicketForm;
