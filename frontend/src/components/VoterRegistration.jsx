// src/components/VoterRegistration.jsx

import React, { useState } from "react";
import { registerVoter } from "../services/voterService";
import { validateRegistrationForm } from "../utils/formValidation"; // Note: remove .jsx extension

const VoterRegistration = () => {
    const [formData, setFormData] = useState({ voterId: "", name: ""});
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateRegistrationForm(formData);
        if (validationError) {
            setError(validationError);
            return;
        }
        try {
            await registerVoter(formData);
            setSuccessMessage("Voter registered successfully!");
            setFormData({ voterId: "", name: "" });
        } catch (error) {
            setError("Failed to register voter. Try again.");
        }
    };

    return (
        <div>
            <h2>Voter Registration</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Voter ID:
                    <input
                        type="text"
                        name="voterId"
                        value={formData.voterId}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
    );
};

export default VoterRegistration;
