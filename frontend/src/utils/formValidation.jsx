// src/utils/formValidation.jsx

// Example validation function
export const validateRegistrationForm = (formData) => {
  // Basic validation logic
  if (!formData.voterId || !formData.name) {
      return "Voter ID and Name are required."; // Return error message if validation fails
  }
  return null; // Return null if validation passes
};
