import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";

const ActivityForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  // Get the current date in YYYY-MM-DD format for the date input
  const today = format(new Date(), "yyyy-MM-dd");
  const currentTime = format(new Date(), "HH:mm");
  
  // Create validation schema for the form
  const validationSchema = Yup.object({
    date: Yup.date().required("Date is required"),
    employeeName: Yup.string().required("Your name is required"),
    employeeId: Yup.string().required("Employee ID is required"),
    location: Yup.string().required("City is required"),
    gpsLocation: Yup.string().required("GPS location is required"),
    timeOfReporting: Yup.string().required("Time is required"),
    clientName: Yup.string().required("Client/Lead name is required"),
    contactPersonName: Yup.string().required("Contact person name is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9+\-\s]+$/, "Invalid phone number format")
      .required("Contact number is required"),
    meetingAgenda: Yup.string().required("Meeting agenda is required"),
    discussionSummary: Yup.string()
      .min(10, "Summary is too short")
      .required("Discussion summary is required"),
    nextActionPlan: Yup.string().required("Next action plan is required"),
    milestoneAchieved: Yup.string().required("Milestone achieved is required"),
    proofOfVisitPhoto: Yup.mixed().required("Proof of visit photo is required"),
  });
  
  // Function to get the current GPS location
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° W`);
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setCurrentLocation("Location access denied. Please enter manually.");
          setIsGettingLocation(false);
        }
      );
    } else {
      setCurrentLocation("Geolocation is not supported by this browser.");
      setIsGettingLocation(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would be an API call to save the activity
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Form submitted with values:", values);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      resetForm();
      setPhotoPreview(null);
      
      // Hide success message after a few seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle photo upload preview
  const handlePhotoChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("proofOfVisitPhoto", file);
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Get location when component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">New Activity Report</h2>
        <p className="text-gray-600 mt-1">
          Submit your daily sales activity report with all required information
        </p>
      </div>
      
      {submitSuccess && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Activity report submitted successfully! Your manager will review it shortly.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <Formik
        initialValues={{
          date: today,
          employeeName: "",
          employeeId: "",
          location: "",
          gpsLocation: currentLocation,
          timeOfReporting: currentTime,
          clientName: "",
          contactPersonName: "",
          contactNumber: "",
          meetingAgenda: "",
          discussionSummary: "",
          nextActionPlan: "",
          nextMeetingDate: "",
          proofOfVisitPhoto: null,
          milestoneAchieved: "",
          issuesFaced: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, errors, touched, values }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date (DD-MM-YYYY) *
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                    errors.date && touched.date
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Time of Reporting */}
              <div>
                <label htmlFor="timeOfReporting" className="block text-sm font-medium text-gray-700 mb-1">
                  Time of Reporting (HH:MM) *
                </label>
                <Field
                  type="time"
                  id="timeOfReporting"
                  name="timeOfReporting"
                  className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                    errors.timeOfReporting && touched.timeOfReporting
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="timeOfReporting"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Salesperson Name */}
              <div>
                <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-1">
                  Salesperson Name *
                </label>
                <Field
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  placeholder="Your full name"
                  className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                    errors.employeeName && touched.employeeName
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="employeeName"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Employee ID */}
              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID *
                </label>
                <Field
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  placeholder="Your unique ID"
                  className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                    errors.employeeId && touched.employeeId
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="employeeId"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Location (City) */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location (City) *
                </label>
                <Field
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Current working city"
                  className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                    errors.location && touched.location
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* GPS Location */}
              <div>
                <label htmlFor="gpsLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Current GPS Location *
                </label>
                <div className="flex">
                  <Field
                    type="text"
                    id="gpsLocation"
                    name="gpsLocation"
                    placeholder="GPS coordinates"
                    className={`block w-full rounded-l-md shadow-sm sm:text-sm p-2 border ${
                      errors.gpsLocation && touched.gpsLocation
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isGettingLocation ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="128" y1="32" x2="128" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="224" y1="128" x2="192" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="195.88" y1="195.88" x2="173.25" y2="173.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="224" x2="128" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="60.12" y1="195.88" x2="82.75" y2="173.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="32" y1="128" x2="64" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="60.12" y1="60.12" x2="82.75" y2="82.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                        </span>
                        Getting...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="64" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="96" x2="128" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M172,139.75c35.44,6.37,60,20.21,60,36.25,0,22.09-46.56,40-104,40S24,198.09,24,176c0-16,24.56-29.88,60-36.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                        <span className="ml-1">Get Location</span>
                      </span>
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="gpsLocation"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Client/Lead Name */}
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                  Client/Lead Name *
                </label>
                <Field
                  type="text"
                  id="clientName"
                  name="clientName"
                  placeholder="Company or individual name"
                  className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                    errors.clientName && touched.clientName
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="clientName"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Contact Person Name */}
              <div>
                <label htmlFor="contactPersonName" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person Name *
                </label>
                <Field
                  type="text"
                  id="contactPersonName"
                  name="contactPersonName"
                  placeholder="Person you met with"
                  className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                    errors.contactPersonName && touched.contactPersonName
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="contactPersonName"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number *
                </label>
                <Field
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Mobile with STD code"
                  className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                    errors.contactNumber && touched.contactNumber
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="contactNumber"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Meeting Agenda */}
              <div>
                <label htmlFor="meetingAgenda" className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Agenda *
                </label>
                <Field
                  as="select"
                  id="meetingAgenda"
                  name="meetingAgenda"
                  className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                    errors.meetingAgenda && touched.meetingAgenda
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                >
                  <option value="">Select purpose of visit</option>
                  <option value="Follow up">Follow up</option>
                  <option value="New pitch">New pitch</option>
                  <option value="Renewal">Renewal</option>
                  <option value="Demo">Demo</option>
                  <option value="Payment collection">Payment collection</option>
                  <option value="Issue resolution">Issue resolution</option>
                </Field>
                <ErrorMessage
                  name="meetingAgenda"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
            </div>

            {/* Discussion Summary */}
            <div>
              <label htmlFor="discussionSummary" className="block text-sm font-medium text-gray-700 mb-1">
                Discussion Summary *
              </label>
              <Field
                as="textarea"
                id="discussionSummary"
                name="discussionSummary"
                rows="4"
                placeholder="Key points discussed during the meeting"
                className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                  errors.discussionSummary && touched.discussionSummary
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              <ErrorMessage
                name="discussionSummary"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Next Action Plan */}
            <div>
              <label htmlFor="nextActionPlan" className="block text-sm font-medium text-gray-700 mb-1">
                Next Action Plan *
              </label>
              <Field
                as="textarea"
                id="nextActionPlan"
                name="nextActionPlan"
                rows="3"
                placeholder="Follow up commitment or closing strategy"
                className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                  errors.nextActionPlan && touched.nextActionPlan
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              <ErrorMessage
                name="nextActionPlan"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Next Meeting Date */}
              <div>
                <label htmlFor="nextMeetingDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Next Meeting Date (if scheduled)
                </label>
                <Field
                  type="date"
                  id="nextMeetingDate"
                  name="nextMeetingDate"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>

              {/* Milestone Achieved */}
              <div>
                <label htmlFor="milestoneAchieved" className="block text-sm font-medium text-gray-700 mb-1">
                  Milestone Achieved Today *
                </label>
                <Field
                  type="text"
                  id="milestoneAchieved"
                  name="milestoneAchieved"
                  placeholder="e.g., Lead generated, demo delivered"
                  className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${
                    errors.milestoneAchieved && touched.milestoneAchieved
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="milestoneAchieved"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
            </div>

            {/* Issues Faced */}
            <div>
              <label htmlFor="issuesFaced" className="block text-sm font-medium text-gray-700 mb-1">
                Issues Faced (if any)
              </label>
              <Field
                as="textarea"
                id="issuesFaced"
                name="issuesFaced"
                rows="2"
                placeholder="Roadblock or support required from the team"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>

            {/* Proof of Visit Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proof of Visit Photo *
              </label>
              <div className="flex items-center justify-center">
                <label
                  htmlFor="photoUpload"
                  className={`cursor-pointer flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg ${
                    photoPreview ? "border-green-300 bg-green-50" : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {!photoPreview ? (
                      <>
                        <span className="mx-auto h-12 w-12 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><path d="M208,208H48a16,16,0,0,1-16-16V80A16,16,0,0,1,48,64H80L96,40h64l16,24h32a16,16,0,0,1,16,16V192A16,16,0,0,1,208,208Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="132" r="36" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                        </span>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          Photo with timestamp (geo-tagged preferred)
                        </p>
                      </>
                    ) : (
                      <div className="relative w-full h-full">
                        <img
                          src={photoPreview}
                          alt="Visit proof preview"
                          className="absolute inset-0 w-full h-full object-contain rounded-lg"
                        />
                        <div className="absolute bottom-2 right-2">
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoPreview(null);
                              setFieldValue("proofOfVisitPhoto", null);
                            }}
                            className="p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><line x1="216" y1="60" x2="40" y2="60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="20" x2="168" y2="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M200,60V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    id="photoUpload"
                    name="photoUpload"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(event) => handlePhotoChange(event, setFieldValue)}
                  />
                </label>
              </div>
              {errors.proofOfVisitPhoto && touched.proofOfVisitPhoto && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.proofOfVisitPhoto}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="128" y1="32" x2="128" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="224" y1="128" x2="192" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="195.88" y1="195.88" x2="173.25" y2="173.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="224" x2="128" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="60.12" y1="195.88" x2="82.75" y2="173.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="32" y1="128" x2="64" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="60.12" y1="60.12" x2="82.75" y2="82.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    </span>
                    Submitting...
                  </>
                ) : (
                  "Submit Activity Report"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ActivityForm;