import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ActivityReview = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      setLoading(true);
      // In a real application, this would be an API call
      setTimeout(() => {
        // Mock data for the activity
        const mockActivity = {
          id: activityId || "ACT001",
          date: "2023-11-01",
          employeeName: "John Smith",
          employeeId: "EMP123",
          location: "New York",
          gpsLocation: "40.7128° N, 74.0060° W",
          timeOfReporting: "10:30 AM",
          clientName: "Acme Corporation",
          contactPerson: "Jane Doe",
          contactNumber: "+1 234-567-8900",
          meetingAgenda: "New product demo",
          discussionSummary: "Presented our latest software solution. Client showed interest in premium features but had concerns about the implementation timeline. They requested a more detailed breakdown of the onboarding process and training requirements. We also discussed potential integration with their existing CRM system.",
          nextActionPlan: "Send pricing proposal and implementation timeline by Friday. Schedule technical assessment call with their IT team.",
          nextMeetingDate: "2023-11-15",
          proofOfVisitPhoto: "https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA1ODB8&ixlib=rb-4.1.0&q=80&w=1080",
          milestoneAchieved: "Demo successfully delivered, technical requirements gathered",
          issuesFaced: "Client expressed concerns about implementation timeline and training requirements",
          managerComments: "Good progress. Address timeline concerns in the follow-up proposal. Consider offering a phased implementation approach.",
          status: "Reviewed",
          createdAt: "2023-11-01T10:45:00Z",
          lastUpdated: "2023-11-02T14:30:00Z",
          reviewedBy: "Sarah Johnson",
          reviewedAt: "2023-11-02T14:30:00Z"
        };
        
        setActivity(mockActivity);
        setComments(mockActivity.managerComments || "");
        setLoading(false);
      }, 1000);
    };

    fetchActivityDetails();
  }, [activityId]);

  const handleCommentChange = (e) => {
    setComments(e.target.value);
  };

  const saveComments = async () => {
    setSaving(true);
    
    // In a real application, this would be an API call to update the activity
    setTimeout(() => {
      // Update the local state to reflect the changes
      setActivity({
        ...activity,
        managerComments: comments,
        status: "Reviewed",
        reviewedBy: "Sarah Johnson", // In a real app, this would be the current user
        reviewedAt: new Date().toISOString()
      });
      
      setSaving(false);
      setSaveSuccess(true);
      
      // Reset the success message after a few seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd-MM-yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const formatDateTime = (dateTimeString) => {
    try {
      return format(new Date(dateTimeString), "dd-MM-yyyy HH:mm");
    } catch (error) {
      return dateTimeString;
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Activity Review</h2>
        <button
          onClick={goBack}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" transform="translate(256 0) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="144 96 96 96 96 144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="160" x2="96" y2="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> Back
        </button>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="124" cy="84" r="16"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M120,124a8,8,0,0,1,8,8v36a8,8,0,0,0,8,8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              You are reviewing activity report <span className="font-semibold">{activity.id}</span> by{" "}
              <span className="font-semibold">{activity.employeeName}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date</h3>
              <p className="mt-1 text-base text-gray-900">{formatDate(activity.date)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Time of Reporting</h3>
              <p className="mt-1 text-base text-gray-900">{activity.timeOfReporting}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Salesperson</h3>
              <p className="mt-1 text-base text-gray-900">{activity.employeeName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Employee ID</h3>
              <p className="mt-1 text-base text-gray-900">{activity.employeeId}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Location (City)</h3>
              <p className="mt-1 text-base text-gray-900">{activity.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">GPS Location</h3>
              <p className="mt-1 text-base text-gray-900">{activity.gpsLocation}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Client/Lead Name</h3>
              <p className="mt-1 text-base text-gray-900">{activity.clientName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact Person</h3>
              <p className="mt-1 text-base text-gray-900">{activity.contactPerson}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
              <p className="mt-1 text-base text-gray-900">{activity.contactNumber}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Meeting Agenda</h3>
              <p className="mt-1 text-base text-gray-900">{activity.meetingAgenda}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Discussion Summary</h3>
            <p className="text-base text-gray-900 whitespace-pre-line">{activity.discussionSummary}</p>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Next Action Plan</h3>
            <p className="text-base text-gray-900 whitespace-pre-line">{activity.nextActionPlan}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4 border-t border-gray-200 pt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Next Meeting Date</h3>
              <p className="mt-1 text-base text-gray-900">
                {activity.nextMeetingDate ? formatDate(activity.nextMeetingDate) : "Not scheduled"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Milestone Achieved</h3>
              <p className="mt-1 text-base text-gray-900">{activity.milestoneAchieved}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Issues Faced</h3>
            <p className="text-base text-gray-900 whitespace-pre-line">
              {activity.issuesFaced || "None reported"}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Manager Comments</h3>
            <textarea
              rows="4"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="Add your comments, feedback or instructions for the salesperson..."
              value={comments}
              onChange={handleCommentChange}
            ></textarea>
            <div className="mt-3 flex justify-end">
              <button
                onClick={saveComments}
                disabled={saving}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  saving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {saving ? (
                  <>
                    <span className="animate-spin mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="128" y1="32" x2="128" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="224" y1="128" x2="192" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="195.88" y1="195.88" x2="173.25" y2="173.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="224" x2="128" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="60.12" y1="195.88" x2="82.75" y2="173.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="32" y1="128" x2="64" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="60.12" y1="60.12" x2="82.75" y2="82.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    </span>
                    Saving...
                  </>
                ) : (
                  "Save Comments"
                )}
              </button>
            </div>
            {saveSuccess && (
              <div className="mt-3 text-sm text-green-600">
                Comments saved successfully!
              </div>
            )}
          </div>

          {activity.reviewedAt && (
            <div className="mt-4 text-xs text-gray-500">
              Last reviewed by {activity.reviewedBy} on{" "}
              {formatDateTime(activity.reviewedAt)}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Proof of Visit</h3>
            <div className="relative">
              <img
                src={activity.proofOfVisitPhoto}
                alt="Proof of visit"
                className="w-full h-auto rounded-md cursor-pointer object-cover"
                onClick={() => setImageModalOpen(true)}
              />
              <div className="absolute bottom-2 right-2">
                <button
                  onClick={() => setImageModalOpen(true)}
                  className="bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-2">Activity Status</h3>
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activity.status === "Reviewed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-2">Activity Timeline</h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  <li>
                    <div className="relative pb-8">
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span>
                      <div className="relative flex items-start space-x-3">
                        <div>
                          <div className="relative px-1">
                            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center ring-8 ring-white">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <p className="text-sm text-gray-500">
                              Created by{" "}
                              <span className="font-medium text-gray-900">
                                {activity.employeeName}
                              </span>
                            </p>
                            <p className="mt-0.5 text-sm text-gray-500">
                              {formatDateTime(activity.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  {activity.reviewedAt && (
                    <li>
                      <div className="relative pb-8">
                        <div className="relative flex items-start space-x-3">
                          <div>
                            <div className="relative px-1">
                              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center ring-8 ring-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                              </div>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <p className="text-sm text-gray-500">
                                Reviewed by{" "}
                                <span className="font-medium text-gray-900">
                                  {activity.reviewedBy}
                                </span>
                              </p>
                              <p className="mt-0.5 text-sm text-gray-500">
                                {formatDateTime(activity.reviewedAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image modal */}
      {imageModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative">
            <img
              src={activity.proofOfVisitPhoto}
              alt="Proof of visit (enlarged)"
              className="max-w-full max-h-[80vh] object-contain"
            />
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M32,104c16.81,20.81,47.63,48,96,48s79.19-27.19,96-48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="224" y1="168" x2="200.62" y2="127.09" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="192" x2="152.91" y2="149.45" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="192" x2="103.09" y2="149.45" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="32" y1="168" x2="55.38" y2="127.09" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityReview;