import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { supabase } from "../Pages/Authentication";
import { Link } from "react-router-dom";

export default function LoanRequest() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loanDatas, setLoanDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); 

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("Event")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching loans:", error.message);
      } else {
        setLoanDatas(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateStatus = async (id, newStatus) => {
    if (newStatus === "Rejected") {
      const { error } = await supabase.from("Event").delete().eq("id", id);

      if (error) {
        console.log("Error deleting rejected event: " + error.message);
      } else {
        setLoanDatas((prev) => prev.filter((loan) => loan.id !== id));
        if (selectedEvent?.id === id) setSelectedEvent(null);
      }
    } else {
      const { error } = await supabase
        .from("Event")
        .update({ Status: newStatus })
        .eq("id", id);
      if (error) {
        console.log("Error updating status: " + error.message);
      } else {
        setLoanDatas((prev) =>
          prev.map((loan) =>
            loan.id === id ? { ...loan, Status: newStatus } : loan
          )
        );
      }
    }
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="d-md-none p-2 bg-light border-bottom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">My Loan Requests</h5>
        <button className="btn btn-outline-primary" onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>

      <div className="dashboard-container d-flex">
        {/* Sidebar */}
        <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <Sidebar />
        </div>
        {sidebarOpen && (
          <div className="backdrop d-md-none" onClick={closeSidebar}></div>
        )}

        {/* Main Content */}
        <div className="flex-grow-1 p-3">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h3 className="mb-2 text-success">My Event Requests</h3>
            <Link to="/newloan">
              <button className="btn btn-success">Add new event</button>
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th className="text-success">Request ID</th>
                  <th className="text-success">Title</th>
                  <th className="text-success">Description</th>
                  <th className="text-success">Date</th>
                  <th className="text-success">Category</th>
                  <th className="text-success">Location</th>
                  <th className="text-success">Status</th>
                  <th className="text-success">Actions Perform</th>
                  <th className="text-success">View</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : loanDatas.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No loan requests found.
                    </td>
                  </tr>
                ) : (
                  loanDatas.map((event) => (
                    <tr key={event.id}>
                      <td>{event.id}</td>
                      <td>{event.title}</td>
                      <td>{event.description}</td>
                      <td>{event.date}</td>
                      <td>{event.Category}</td>
                      <td>{event.location}</td>
                      <td>
                        <span
                          className={`badge ${
                            event.Status === "Pending"
                              ? "bg-warning text-dark"
                              : event.Status === "Reviewing Documents"
                                ? "bg-primary"
                                : event.Status === "Accepted"
                                  ? "bg-success"
                                  : event.Status === "Rejected"
                                    ? "bg-danger"
                                    : "bg-secondary"
                          }`}
                        >
                          {event.Status}
                        </span>
                      </td>
                      <td>
                        {event.Status === "Pending" ? (
                          <>
                            <button
                              className="btn btn-sm btn-outline-primary me-1"
                              onClick={() =>
                                updateStatus(event.id, "Reviewing Documents")
                              }
                            >
                              <i className="fas fa-file-alt"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-success me-1"
                              onClick={() => updateStatus(event.id, "Accepted")}
                            >
                              <i className="fas fa-check"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => updateStatus(event.id, "Rejected")}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </>
                        ) : (
                          <span className="text-muted">No actions</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-info"
                          onClick={() => setSelectedEvent(event)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Selected Event Card */}
          {selectedEvent && (
            <div className="card mt-4 col-4" style={{marginLeft : "25%"}}>
              <div className="card-body">
                <h2 className="card-title text-success text-center">
                  {selectedEvent.title}
                </h2>
                <p className="card-text text-center">{selectedEvent.description}</p>

                {selectedEvent.image && (
                  <img
                    src={
                      selectedEvent.image
                    }
                    alt="Event"
                    className="img-fluid"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
