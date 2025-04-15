import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/facility.css'; // Add styles here if needed

const API_KEY = "Y7aR2DB4.heXriM0CyBgXICzrSlT9jdfkWHY3CYjl";
const headers = { Authorization: "Api-Key " + API_KEY };

const FacilitiesTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: "id", order: "asc" });
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ city: "", country: "" });

    useEffect(() => {
        axios
            .get('https://www.peeringdb.com/api/fac', { headers })
            .then((response) => {
                setData(response.data.data);
                setFilteredData(response.data.data); // Initialize filtered data
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleSort = (key) => {
        const order = sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc";
        const sorted = [...filteredData].sort((a, b) => {
            if (order === "asc") {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
        setFilteredData(sorted);
        setSortConfig({ key, order });
    };

    const handleRowsPerPageChange = (e) => {
        const value = e.target.value === "All" ? data.length : Number(e.target.value);
        setRowsPerPage(value);
        setCurrentPage(1); // Reset to first page
    };

    const restoreDefaultView = () => {
        setRowsPerPage(10);
        setCurrentPage(1);
        setFilters({ city: "", country: "" }); // Clear filters
        setFilteredData(data); // Reset to original data
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));

        // Filter the data dynamically
        const filtered = data.filter((item) => {
            const matchesCity = filters.city
                ? item.city.toLowerCase().includes(filters.city.toLowerCase())
                : true;
            const matchesCountry = filters.country
                ? item.country.toLowerCase().includes(filters.country.toLowerCase())
                : true;
            return matchesCity && matchesCountry;
        });
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page after filtering
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = rowsPerPage === data.length ? data.length : startIndex + rowsPerPage;
    const displayedData = filteredData.slice(startIndex, endIndex);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Facilities Data</h1>

            {/* Filters */}
            <div style={{ marginBottom: "20px" }}>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={filters.city}
                        onChange={handleFilterChange}
                        placeholder="Filter by city"
                        style={{ marginLeft: "10px", marginRight: "20px", padding: "5px" }}
                    />
                </label>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={filters.country}
                        onChange={handleFilterChange}
                        placeholder="Filter by country"
                        style={{ marginLeft: "10px", padding: "5px" }}
                    />
                </label>
            </div>

            {/* Row Limit Selector */}
            <div style={{ marginBottom: "20px" }}>
                <label>
                    Rows per page:
                    <select
                        value={rowsPerPage === data.length ? "All" : rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        style={{ marginLeft: "10px", padding: "5px" }}
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
                        padding: "5px 10px",
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

            {/* Table */}
            <table>
                <thead>
                    <tr>
                        <th>
                            ID
                            <button
                                onClick={() => handleSort("id")}
                                style={{
                                    marginLeft: "10px",
                                    padding: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Sort ({sortConfig.key === "id" ? (sortConfig.order === "asc" ? "↑" : "↓") : "↕"})
                            </button>
                        </th>
                        <th>Org Name</th>
                        <th>
                            City
                            <button
                                onClick={() => handleSort("city")}
                                style={{
                                    marginLeft: "10px",
                                    padding: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Sort ({sortConfig.key === "city" ? (sortConfig.order === "asc" ? "↑" : "↓") : "↕"})
                            </button>
                        </th>
                        <th>Country</th>
                        <th>
                            Net Count
                            <button
                                onClick={() => handleSort("net_count")}
                                style={{
                                    marginLeft: "10px",
                                    padding: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Sort ({sortConfig.key === "net_count" ? (sortConfig.order === "asc" ? "↑" : "↓") : "↕"})
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