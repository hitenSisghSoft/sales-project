/**
 * Date Utility Functions
 * Helper functions for date formatting and time calculations
 */

/**
 * Format a date object to DD-MM-YYYY string
 * @param {Date} date - The date object to format
 * @returns {string} Formatted date string
 */
export const formatToDisplayDate = (date) => {
  if (!date) return "";
  
  try {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

/**
 * Parse a DD-MM-YYYY string to Date object
 * @param {string} dateString - Date string in DD-MM-YYYY format
 * @returns {Date|null} Date object or null if invalid
 */
export const parseDisplayDate = (dateString) => {
  if (!dateString) return null;
  
  try {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
};

/**
 * Format a date object to YYYY-MM-DD string (for input fields)
 * @param {Date} date - The date object to format
 * @returns {string} Formatted date string for input fields
 */
export const formatToInputDate = (date) => {
  if (!date) return "";
  
  try {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error formatting date for input:", error);
    return "";
  }
};

/**
 * Parse a YYYY-MM-DD string to Date object
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {Date|null} Date object or null if invalid
 */
export const parseInputDate = (dateString) => {
  if (!dateString) return null;
  
  try {
    return new Date(dateString);
  } catch (error) {
    console.error("Error parsing input date:", error);
    return null;
  }
};

/**
 * Convert a DD-MM-YYYY string to YYYY-MM-DD format
 * @param {string} dateString - Date string in DD-MM-YYYY format
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const convertDisplayToInputFormat = (dateString) => {
  if (!dateString) return "";
  
  try {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error converting date format:", error);
    return dateString;
  }
};

/**
 * Convert a YYYY-MM-DD string to DD-MM-YYYY format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Date string in DD-MM-YYYY format
 */
export const convertInputToDisplayFormat = (dateString) => {
  if (!dateString) return "";
  
  try {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error("Error converting date format:", error);
    return dateString;
  }
};

/**
 * Get current date as a Date object
 * @returns {Date} Current date object
 */
export const getCurrentDate = () => {
  return new Date();
};

/**
 * Get current date in DD-MM-YYYY format
 * @returns {string} Current date in DD-MM-YYYY format
 */
export const getCurrentDisplayDate = () => {
  return formatToDisplayDate(new Date());
};

/**
 * Get current date in YYYY-MM-DD format (for inputs)
 * @returns {string} Current date in YYYY-MM-DD format
 */
export const getCurrentInputDate = () => {
  return formatToInputDate(new Date());
};

/**
 * Format a date object to HH:MM format
 * @param {Date} date - The date object to format
 * @returns {string} Time in HH:MM format
 */
export const formatTime = (date) => {
  if (!date) return "";
  
  try {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    
    return `${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "";
  }
};

/**
 * Format a date object to HH:MM AM/PM format
 * @param {Date} date - The date object to format
 * @returns {string} Time in HH:MM AM/PM format
 */
export const formatTimeAmPm = (date) => {
  if (!date) return "";
  
  try {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursStr = String(hours).padStart(2, "0");
    
    return `${hoursStr}:${minutes} ${ampm}`;
  } catch (error) {
    console.error("Error formatting time with AM/PM:", error);
    return "";
  }
};

/**
 * Get current time in HH:MM format
 * @returns {string} Current time in HH:MM format
 */
export const getCurrentTime = () => {
  return formatTime(new Date());
};

/**
 * Get current time in HH:MM AM/PM format
 * @returns {string} Current time in HH:MM AM/PM format
 */
export const getCurrentTimeAmPm = () => {
  return formatTimeAmPm(new Date());
};

/**
 * Format a date object to "Day of week, Month Day, Year" format (e.g., "Monday, January 1, 2023")
 * @param {Date} date - The date object to format
 * @returns {string} Formatted date string
 */
export const formatLongDate = (date) => {
  if (!date) return "";
  
  try {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    console.error("Error formatting long date:", error);
    return "";
  }
};

/**
 * Calculate difference in days between two dates
 * @param {Date|string} date1 - First date (Date object or YYYY-MM-DD string)
 * @param {Date|string} date2 - Second date (Date object or YYYY-MM-DD string)
 * @returns {number} Difference in days (positive if date2 is after date1)
 */
export const getDaysDifference = (date1, date2) => {
  try {
    // Convert to Date objects if strings
    const d1 = typeof date1 === "string" ? new Date(date1) : date1;
    const d2 = typeof date2 === "string" ? new Date(date2) : date2;
    
    // Clear time portion to get exact day difference
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
    
    // Calculate difference in milliseconds and convert to days
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    return Math.floor((utc2 - utc1) / MS_PER_DAY);
  } catch (error) {
    console.error("Error calculating days difference:", error);
    return null;
  }
};

/**
 * Check if a date is in the past
 * @param {Date|string} date - Date to check (Date object or YYYY-MM-DD string)
 * @returns {boolean} True if date is in the past
 */
export const isDateInPast = (date) => {
  try {
    const checkDate = typeof date === "string" ? new Date(date) : date;
    const today = new Date();
    
    // Clear time portion for both dates
    today.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);
    
    return checkDate < today;
  } catch (error) {
    console.error("Error checking if date is in past:", error);
    return false;
  }
};

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check (Date object or YYYY-MM-DD string)
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  try {
    const checkDate = typeof date === "string" ? new Date(date) : date;
    const today = new Date();
    
    return (
      checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear()
    );
  } catch (error) {
    console.error("Error checking if date is today:", error);
    return false;
  }
};

/**
 * Add specified number of days to a date
 * @param {Date} date - The base date
 * @param {number} days - Number of days to add (negative to subtract)
 * @returns {Date} New date with days added
 */
export const addDays = (date, days) => {
  try {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  } catch (error) {
    console.error("Error adding days to date:", error);
    return date;
  }
};

/**
 * Get start of week (Sunday) for a given date
 * @param {Date} date - The date to find the week start for
 * @returns {Date} Date representing the start of the week
 */
export const getStartOfWeek = (date) => {
  try {
    const result = new Date(date);
    const day = result.getDay(); // 0 for Sunday
    result.setDate(result.getDate() - day);
    return result;
  } catch (error) {
    console.error("Error getting start of week:", error);
    return date;
  }
};

/**
 * Check if a date falls within a date range
 * @param {Date|string} date - Date to check
 * @param {Date|string} startDate - Start of range
 * @param {Date|string} endDate - End of range
 * @returns {boolean} True if date falls within the range (inclusive)
 */
export const isDateInRange = (date, startDate, endDate) => {
  try {
    const checkDate = typeof date === "string" ? new Date(date) : date;
    const start = typeof startDate === "string" ? new Date(startDate) : startDate;
    const end = typeof endDate === "string" ? new Date(endDate) : endDate;
    
    // Clear time portion for all dates
    checkDate.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    return checkDate >= start && checkDate <= end;
  } catch (error) {
    console.error("Error checking if date is in range:", error);
    return false;
  }
};

/**
 * Format a relative date (today, yesterday, or date format)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted relative date
 */
export const formatRelativeDate = (date) => {
  try {
    const checkDate = typeof date === "string" ? new Date(date) : date;
    
    if (isToday(checkDate)) {
      return "Today";
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (
      checkDate.getDate() === yesterday.getDate() &&
      checkDate.getMonth() === yesterday.getMonth() &&
      checkDate.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }
    
    return formatToDisplayDate(checkDate);
  } catch (error) {
    console.error("Error formatting relative date:", error);
    return "";
  }
};

/**
 * Get a formatted date range
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  try {
    const start = typeof startDate === "string" ? new Date(startDate) : startDate;
    const end = typeof endDate === "string" ? new Date(endDate) : endDate;
    
    const startStr = formatToDisplayDate(start);
    const endStr = formatToDisplayDate(end);
    
    return `${startStr} to ${endStr}`;
  } catch (error) {
    console.error("Error formatting date range:", error);
    return "";
  }
};

/**
 * Parse time string in HH:MM format to date object with today's date
 * @param {string} timeStr - Time string in HH:MM format
 * @returns {Date|null} Date object with specified time, or null if invalid
 */
export const parseTimeToDate = (timeStr) => {
  if (!timeStr) return null;
  
  try {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  } catch (error) {
    console.error("Error parsing time to date:", error);
    return null;
  }
};

/**
 * Calculate duration in hours and minutes between two time strings
 * @param {string} startTime - Start time in HH:MM format
 * @param {string} endTime - End time in HH:MM format
 * @returns {string} Duration in format "X hrs Y mins"
 */
export const calculateDuration = (startTime, endTime) => {
  try {
    const start = parseTimeToDate(startTime);
    const end = parseTimeToDate(endTime);
    
    if (!start || !end) return "";
    
    // Handle case where end time is on the next day
    let diffMs = end - start;
    if (diffMs < 0) {
      diffMs += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
    }
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs === 0) {
      return `${diffMins} mins`;
    } else if (diffMins === 0) {
      return `${diffHrs} hrs`;
    } else {
      return `${diffHrs} hrs ${diffMins} mins`;
    }
  } catch (error) {
    console.error("Error calculating duration:", error);
    return "";
  }
};

/**
 * Get an array of date strings for each day in a month
 * @param {number} year - Year (e.g., 2023)
 * @param {number} month - Month (1-12)
 * @returns {Array<string>} Array of date strings in YYYY-MM-DD format
 */
export const getDatesInMonth = (year, month) => {
  try {
    const dates = [];
    const daysInMonth = new Date(year, month, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      const day = String(i).padStart(2, "0");
      const monthStr = String(month).padStart(2, "0");
      dates.push(`${year}-${monthStr}-${day}`);
    }
    
    return dates;
  } catch (error) {
    console.error("Error getting dates in month:", error);
    return [];
  }
};

/**
 * Get week number for a given date
 * @param {Date} date - The date to find the week number for
 * @returns {number} Week number (1-53)
 */
export const getWeekNumber = (date) => {
  try {
    // Copy date to avoid modifying the original
    const d = new Date(date);
    // Set to the nearest Thursday (to match ISO week date definition)
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    const yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate week number: Week 1 + number of weeks
    const weekNumber = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    
    return weekNumber;
  } catch (error) {
    console.error("Error calculating week number:", error);
    return null;
  }
};

/**
 * Calculate the age based on a birth date
 * @param {Date|string} birthDate - Birth date
 * @returns {number} Age in years
 */
export const calculateAge = (birthDate) => {
  try {
    const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
    const today = new Date();
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    // Adjust age if birth month and day have not occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  } catch (error) {
    console.error("Error calculating age:", error);
    return null;
  }
};