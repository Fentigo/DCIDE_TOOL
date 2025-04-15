import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ExchangeTable from './exchanges';
import NetworkTable from './network';
import FacilityTable from './facility';
import FacilityLeadGenerator from './leadGenerator';

const ProtectedComponent = () => {
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const correctPassword = "jordanisking"; // Replace with your actual password

    // Check localStorage for the password verification state
    useEffect(() => {
        const savedVerificationState = localStorage.getItem('isPasswordVerified');
        if (savedVerificationState === 'true') {
            setIsPasswordVerified(true);
        }
    }, []);

    // Function to handle password verification
    const handlePasswordSubmit = (e) => {
        e.preventDefault(); // Prevent form submission

        if (enteredPassword === correctPassword) {
            setIsPasswordVerified(true);
            localStorage.setItem('isPasswordVerified', 'true'); // Save the verification state
            setErrorMessage(''); // Clear any previous error messages
        } else {
            setErrorMessage('Incorrect password. Please try again.');
            setEnteredPassword(''); // Clear the password input field
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('isPasswordVerified'); // Clear the verification state
        setIsPasswordVerified(false);
    };

    // If the password is not verified, render the password input field
    if (!isPasswordVerified) {
        return (
            <div>
                <h2>Please Enter Password</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <input
                        type="password"
                        value={enteredPassword}
                        onChange={(e) => setEnteredPassword(e.target.value)}
                        placeholder="Enter your password"
                        style={{ marginRight: '10px', padding: '5px' }}
                    />
                    <button type="submit" style={{ padding: '5px 10px' }}>
                        Submit
                    </button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        );
    }

    // Render the navigation and protected routes after password verification
    return (
        <Router>
            <div>
                {/* Navigation Bar */}
                <nav style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <Link to="/exchanges" style={{ marginRight: '20px' }}>Exchanges</Link>
                    <Link to="/networks" style={{ marginRight: '20px' }}>Networks</Link>
                    <Link to="/facilities" style={{ marginRight: '20px' }}>Facilities</Link>
                    <Link to="/leadgenerator" style={{ marginRight: '20px' }}>Lead Generator</Link>
                    <button
                        onClick={handleLogout}
                        style={{
                            marginLeft: '20px',
                            padding: '5px 10px',
                            backgroundColor: '#d9534f',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Logout
                    </button>
                </nav>

                {/* Protected Routes */}
                <Routes>
                    <Route path="/" element={<Navigate to="/exchanges" />} />
                    <Route path="/exchanges" element={<ExchangeTable />} />
                    <Route path="/networks" element={<NetworkTable />} />
                    <Route path="/facilities" element={<FacilityTable />} />
                    <Route path="/leadgenerator" element={<FacilityLeadGenerator/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default ProtectedComponent;