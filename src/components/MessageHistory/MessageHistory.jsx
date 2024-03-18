import React from "react";
import PropTypes from "prop-types";

export const MessageHistory = ({ msg }) => {
  if (!msg) return null;

  return msg.map((row, i) => (
    <div key={i} className={`message-history mt-3 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
      <div className="send font-bold text-gray-600">
        <div className="sender">{row.sender}</div>
        <div className="date">{row.addedAt && new Date(row.addedAt).toLocaleString()}</div>
      </div>
      <div className="message p-4 w-80 border border-gray-300 rounded">{row.message}</div>
    </div>
  ));
};

MessageHistory.propTypes = {
  msg: PropTypes.array.isRequired,
};
