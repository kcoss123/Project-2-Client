import React from "react";
import { PageBreadcrumb } from "../../components/BreadCrumb/BreadCrumb";
import AddTicketForm from "../../components/AddTicketForm/AddTicketForm";

export const AddTicket = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <PageBreadcrumb page="New Ticket" />
      </div>
      <div>
        <AddTicketForm />
      </div>
    </div>
  );
};