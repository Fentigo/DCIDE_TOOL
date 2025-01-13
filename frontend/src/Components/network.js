import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import '../Styles/network.css';


const API_KEY = "Y7aR2DB4.heXriM0CyBgXICzrSlT9jdfkWHY3CYjl";
const headers = { Authorization: "Api-Key " + API_KEY };

const NetworkTable = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: "id", order: "asc" }); // Default sort: by ID, ascending
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get('https://www.peeringdb.com/api/net', { headers })
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

    const handleSort = (key) => {
        const order = sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc"; // Toggle sort order
        const sorted = [...sortedData].sort((a, b) => {
            if (order === "asc") {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
        setSortedData(sorted);
        setSortConfig({ key, order }); // Update sort configuration
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
            <h1>Networks Data</h1>

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
                        <th>
                            ID
                            <button
                                onClick={() => handleSort("id")}
                                style={{
                                    marginLeft: "10px",
                                    padding: "4px 8px",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                }}
                            >
                                Sort ({sortConfig.key === "id" ? (sortConfig.order === "asc" ? "↑" : "↓") : "↕"})
                            </button>
                        </th>
                        <th>Name</th>
                        <th>
                            ASN
                            <button
                                onClick={() => handleSort("asn")}
                                style={{
                                    marginLeft: "10px",
                                    padding: "4px 8px",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                }}
                            >
                                Sort ({sortConfig.key === "asn" ? (sortConfig.order === "asc" ? "↑" : "↓") : "↕"})
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.asn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NetworkTable;
