/**
 * Form Validation Utility Functions
 * Contains validation utilities for sales activity tracking forms
 */

/**
 * Validates an email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email format is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format (allows various formats with country codes)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number format is valid
 */
export const isValidPhone = (phone) => {
  // Allows formats like: +1 (555) 123-4567, 555-123-4567, (555) 123-4567, etc.
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

/**
 * Validates that a string has a minimum length
 * @param {string} value - String to check
 * @param {number} minLength - Minimum required length
 * @returns {boolean} True if string meets minimum length
 */
export const meetsMinLength = (value, minLength) => {
  return value && value.trim().length >= minLength;
};

/**
 * Validates that a date is not in the future
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {boolean} True if date is today or in the past
 */
export const isNotFutureDate = (dateStr) => {
  if (!dateStr) return false;
  
  const inputDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time portion for date comparison
  
  return inputDate <= today;
};

/**
 * Validates that a date is not before a specific cutoff date
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @param {string} cutoffDateStr - Cutoff date string in YYYY-MM-DD format
 * @returns {boolean} True if date is on or after the cutoff date
 */
export const isNotBeforeDate = (dateStr, cutoffDateStr) => {
  if (!dateStr || !cutoffDateStr) return false;
  
  const inputDate = new Date(dateStr);
  const cutoffDate = new Date(cutoffDateStr);
  
  return inputDate >= cutoffDate;
};

/**
 * Validates that a GPS location string is properly formatted
 * @param {string} gpsStr - GPS location string (e.g., "40.7128° N, 74.0060° W")
 * @returns {boolean} True if GPS format is valid
 */
export const isValidGPSFormat = (gpsStr) => {
  // Simple check for GPS format like "40.7128° N, 74.0060° W"
  const gpsRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*°\s*[NS],\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)\s*°\s*[EW]$/i;
  return gpsRegex.test(gpsStr);
};

/**
 * Validates an employee ID based on specific format rules
 * @param {string} empId - Employee ID to validate
 * @returns {boolean} True if ID format is valid
 */
export const isValidEmployeeId = (empId) => {
  // Validates employee IDs in format EMP123, MGR456, etc.
  const empIdRegex = /^(EMP|MGR)[0-9]{3,6}$/;
  return empIdRegex.test(empId);
};

/**
 * Format a date string from YYYY-MM-DD to DD-MM-YYYY
 * @param {string} dateStr - Date in YYYY-MM-DD format
 * @returns {string} Date in DD-MM-YYYY format
 */
export const formatDateForDisplay = (dateStr) => {
  if (!dateStr) return "";
  
  try {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateStr; // Return original if parsing fails
  }
};

/**
 * Format a date string from DD-MM-YYYY to YYYY-MM-DD (for inputs)
 * @param {string} dateStr - Date in DD-MM-YYYY format
 * @returns {string} Date in YYYY-MM-DD format
 */
export const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  
  try {
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error formatting date for input:", error);
    return dateStr; // Return original if parsing fails
  }
};

/**
 * Get current date in YYYY-MM-DD format
 * @returns {string} Today's date in YYYY-MM-DD format
 */
export const getTodayFormatted = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  
  return `${year}-${month}-${day}`;
};

/**
 * Get current time in HH:MM format
 * @returns {string} Current time in HH:MM format
 */
export const getCurrentTimeFormatted = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  
  return `${hours}:${minutes}`;
};

/**
 * Truncate text with ellipsis if it exceeds max length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Validates that a string contains only alphanumeric characters and spaces
 * @param {string} value - String to validate
 * @returns {boolean} True if string contains only allowed characters
 */
export const isAlphanumeric = (value) => {
  const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
  return alphanumericRegex.test(value);
};

/**
 * Sanitizes input to prevent XSS attacks
 * @param {string} input - String to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (!input) return "";
  
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Validate the data for a complete activity form submission
 * @param {Object} formData - The form data object
 * @returns {Object} Object with isValid flag and errors object
 */
export const validateActivityForm = (formData) => {
  const errors = {};
  
  // Required fields
  if (!formData.date) errors.date = "Date is required";
  if (!formData.employeeName) errors.employeeName = "Name is required";
  if (!formData.employeeId) errors.employeeId = "Employee ID is required";
  if (!formData.location) errors.location = "Location is required";
  if (!formData.gpsLocation) errors.gpsLocation = "GPS location is required";
  if (!formData.timeOfReporting) errors.timeOfReporting = "Time is required";
  if (!formData.clientName) errors.clientName = "Client name is required";
  if (!formData.contactPersonName) errors.contactPersonName = "Contact person is required";
  if (!formData.contactNumber) errors.contactNumber = "Contact number is required";
  if (!formData.meetingAgenda) errors.meetingAgenda = "Meeting agenda is required";
  if (!formData.discussionSummary) errors.discussionSummary = "Discussion summary is required";
  if (!formData.nextActionPlan) errors.nextActionPlan = "Next action plan is required";
  if (!formData.milestoneAchieved) errors.milestoneAchieved = "Milestone is required";
  if (!formData.proofOfVisitPhoto) errors.proofOfVisitPhoto = "Proof of visit photo is required";
  
  // Format validations
  if (formData.contactNumber && !isValidPhone(formData.contactNumber)) {
    errors.contactNumber = "Invalid phone number format";
  }
  
  if (formData.employeeId && !isValidEmployeeId(formData.employeeId)) {
    errors.employeeId = "Invalid employee ID format";
  }
  
  if (formData.date && !isNotFutureDate(formData.date)) {
    errors.date = "Date cannot be in the future";
  }
  
  if (formData.discussionSummary && !meetsMinLength(formData.discussionSummary, 10)) {
    errors.discussionSummary = "Summary must be at least 10 characters";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Format file size in a human-readable way
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size (e.g., "2.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Check if a file is an accepted image type
 * @param {File} file - The file object to check
 * @returns {boolean} True if file is an accepted image type
 */
export const isAcceptedImageType = (file) => {
  const acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
  return file && acceptedTypes.includes(file.type);
};