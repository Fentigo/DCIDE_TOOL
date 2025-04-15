import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/leadgenerator.css';

const FacilityLeadGenerator = () => {
    const API_KEY = "Y7aR2DB4.heXriM0CyBgXICzrSlT9jdfkWHY3CYjl";
    const headers = { Authorization: "Api-Key " + API_KEY };

    const [formData, setFormData] = useState({
        companyName: '',
        dataCenterName: '',
        latitude: '',
        longitude: '',
        availableVoltageServices: '',
    });

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Build the GET request query string
        const queryParams = {
            name: formData.companyName,
            latitude: formData.latitude,
            longitude: formData.longitude,
            fac__available_voltage_services: formData.availableVoltageServices, // Correct field
        };

        // Remove empty fields from query
        const filteredParams = Object.entries(queryParams)
            .filter(([_, value]) => value.trim() !== '')
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        const url = `https://www.peeringdb.com/api/fac?${filteredParams}`;

        try {
            const response = await axios.get(url, { headers });

            console.log("🔵 Facility API Response:", response.data);

            if (!response.data.data || response.data.data.length === 0) {
                console.warn("⚠️ No data returned from API.");
                setError("No data found for the given filters.");
                setResults([]);
                return;
            }

            // Map the response data
            let facilityData = response.data.data.map((facility) => ({
                companyName: facility.name_long || facility.name || 'N/A',
                latitude: facility.latitude || 'N/A',
                longitude: facility.longitude || 'N/A',
                availableVoltageServices: facility.fac__available_voltage_services || 'N/A',
            }));

            console.log("🟢 Data BEFORE filtering voltage:", facilityData);

            // Only filter out "N/A" for voltage services, keep everything else
            let filteredData = facilityData;
            if (formData.availableVoltageServices) {
                filteredData = facilityData.filter(
                    facility => facility.availableVoltageServices !== 'N/A' && facility.availableVoltageServices !== null
                );
            }

            console.log("🟢 Data AFTER filtering voltage:", filteredData);

            setResults(filteredData);
        } catch (err) {
            console.error("❌ API Fetch Error:", err);
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Data Center Lead Generator</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Company Name:
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter company name"
                    />
                </label>
                <label>
                    Data Center Name:
                    <input
                        type="text"
                        name="dataCenterName"
                        value={formData.dataCenterName}
                        onChange={handleChange}
                        placeholder="Enter data center name"
                    />
                </label>
                <label>
                    Latitude:
                    <input
                        type="text"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        placeholder="Enter latitude"
                    />
                </label>
                <label>
                    Longitude:
                    <input
                        type="text"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        placeholder="Enter longitude"
                    />
                </label>
                <label>
                    Available Voltage Services:
                    <select
                        name="availableVoltageServices"
                        value={formData.availableVoltageServices}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="48 VDC">48 VDC</option>
                        <option value="400 VAC">400 VAC</option>
                        <option value="480 VAC">480 VAC</option>
                    </select>
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Generate Leads'}
                </button>
            </form>

            {/* Error message */}
            {error && <p className="error">{error}</p>}

            {/* Results Table */}
            {results.length > 0 && (
                <div className="results">
                    <h3>Generated Leads</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Available Voltage Services</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.companyName}</td>
                                    <td>{result.latitude}</td>
                                    <td>{result.longitude}</td>
                                    <td>{result.availableVoltageServices}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FacilityLeadGenerator;
