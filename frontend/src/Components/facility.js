import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/facility.css'; // Add styles here if needed

const API_KEY = "Y7aR2DB4.heXriM0CyBgXICzrSlT9jdfkWHY3CYjl";
const headers = { Authorization: "Api-Key " + API_KEY };

const FacilitiesTable = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get('https://www.peeringdb.com/api/fac', { headers })
            .then((response) => {
                setData(response.data.data);
                setSortedData(response.data.data); // Initialize sorted data
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleSort = () => {
        const order = sortOrder === "asc" ? "desc" : "asc"; // Toggle sort order
        const sorted = [...sortedData].sort((a, b) => {
            return order === "asc" ? a.net_count - b.net_count : b.net_count - a.net_count;
        });
        setSortedData(sorted);
        setSortOrder(order); // Update sort order
    };

    const handleRowsPerPageChange = (e) => {
        const value = e.target.value === "All" ? data.length : Number(e.target.value);
        setRowsPerPage(value);
        setCurrentPage(1); // Reset to first page
    };

    const restoreDefaultView = () => {
        setRowsPerPage(10); // Reset to default rows per page
        setCurrentPage(1); // Reset to first page
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = rowsPerPage === data.length ? data.length : startIndex + rowsPerPage;
    const displayedData = sortedData.slice(startIndex, endIndex);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Facilities Data</h1>

            {/* Row Limit Selector */}
            <div style={{ marginBottom: "20px" }}>
                <label>
                    Rows per page:
                    <select
                        value={rowsPerPage === data.length ? "All" : rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        style={{ marginLeft: "10px", padding: "4px 8px", fontSize: "14px" }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value="All">All</option>
                    </select>
                </label>

                <button
                    onClick={restoreDefaultView}
                    style={{
                        marginLeft: "20px",
                        padding: "4px 8px",
                        fontSize: "14px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Restore Default
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Org Name</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>
                            Net Count
                            <button
                                onClick={handleSort}
                                style={{
                                    marginLeft: "10px",
                                    padding: "4px 8px",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                }}
                            >
                                Sort ({sortOrder === "asc" ? "↑" : "↓"})
                            </button>
                        </th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>IX Count</th>
                        <th>Address 1</th>
                        <th>Address 2</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.org_name}</td>
                            <td>{item.city}</td>
                            <td>{item.country}</td>
                            <td>{item.net_count}</td>
                            <td>{item.latitude}</td>
                            <td>{item.longitude}</td>
                            <td>{item.ix_count}</td>
                            <td>{item.address1}</td>
                            <td>{item.address2}</td>
                            <td>{item.zipcode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FacilitiesTable;