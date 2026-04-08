"use client";

import { useEffect, useState } from "react";
import { getContactMessages, deleteContactMessage } from "../actions/email";
import { toast } from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminDashboard() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteClick = (msg: any) => {
    setSelectedMessage(msg);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedMessage) return;
    setDeleting(true);
    try {
      await deleteContactMessage(selectedMessage.id);
      toast.success("Message deleted");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to delete message");
    }
    setDeleting(false);
    setShowConfirm(false);
    setSelectedMessage(null);
  };

  if (loading) return <div className="text-white p-4">Loading messages...</div>;

  return (
    <div className="container">
      <h2 className="text-white mb-4">Contact Form Messages</h2>
      {messages.length === 0 ? (
        <p className="text-muted">No messages yet.</p>
      ) : (
        <div className="row">
          {messages.map(msg => (
            <div key={msg.id} className="col-12 mb-3">
              <div className="card bg-dark text-white border-secondary">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title fw-bold text-info mb-0">{msg.name}</h5>
                      <h6 className="card-subtitle mt-1 mb-3 text-muted">
                        {msg.email} &bull; {msg.phone}
                      </h6>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      style={{ borderRadius: '8px' }}
                      title="Delete message"
                      onClick={() => handleDeleteClick(msg)}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                  <p className="card-text border-start border-info ps-3">{msg.message}</p>
                  <p className="text-muted small mb-0 mt-3">
                    Received: {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirm && selectedMessage && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-danger text-white border-0">
                <h5 className="modal-title fw-bold">Delete Message</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowConfirm(false)}
                  disabled={deleting}
                ></button>
              </div>
              <div className="modal-body p-4 text-center">
                <p className="fs-5 mb-1">Are you sure you want to delete this message from</p>
                <p className="fw-bold fs-4 text-danger">"{selectedMessage.name}"?</p>
                <p className="text-muted small">This action is permanent and cannot be undone.</p>
              </div>
              <div className="modal-footer border-0 d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-secondary px-4"
                  onClick={() => setShowConfirm(false)}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger px-4"
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Yes, Delete It"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
