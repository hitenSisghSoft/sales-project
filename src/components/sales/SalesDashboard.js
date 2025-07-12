import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ActivityForm from "./ActivityForm";
import ActivityHistory from "./ActivityHistory";

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [summaryStats, setSummaryStats] = useState({
    totalActivities: 0,
    pendingReview: 0,
    completedToday: 0,
    upcomingMeetings: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);

  // Fetch user data and dashboard statistics
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      try {
        // In a real application, these would be separate API calls
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user profile data
        const mockUserProfile = {
          id: "EMP789",
          name: "David Wilson",
          email: "david.wilson@company.com",
          role: "Senior Sales Executive",
          region: "Northeast",
          managerName: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1578758760917-e36305c1b872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA5MTR8&ixlib=rb-4.1.0&q=80&w=1080",
          joinDate: "2021-04-15",
          phone: "+1 (555) 123-4567"
        };
        
        // Mock summary statistics
        const mockSummaryStats = {
          totalActivities: 78,
          pendingReview: 3,
          completedToday: 2,
          upcomingMeetings: 4
        };
        
        // Mock recent activities
        const mockRecentActivities = [
          {
            id: "ACT127",
            date: "2023-11-02",
            clientName: "Northeast Healthcare",
            location: "Boston",
            meetingAgenda: "Contract Renewal",
            status: "Pending"
          },
          {
            id: "ACT126",
            date: "2023-11-02",
            clientName: "Tech Innovations Inc",
            location: "Boston",
            meetingAgenda: "Initial Pitch",
            status: "Pending"
          },
          {
            id: "ACT123",
            date: "2023-11-01",
            clientName: "Global Systems",
            location: "New York",
            meetingAgenda: "Product Demo",
            status: "Reviewed",
            managerComments: "Great job with the technical presentation. Follow up on the pricing questions they raised."
          },
          {
            id: "ACT119",
            date: "2023-10-29",
            clientName: "Dynamic Solutions",
            location: "Boston",
            meetingAgenda: "Follow-up Meeting",
            status: "Reviewed",
            managerComments: "Make sure to send the requested case studies ASAP."
          }
        ];
        
        setUserProfile(mockUserProfile);
        setSummaryStats(mockSummaryStats);
        setRecentActivities(mockRecentActivities);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Track and report your field sales activities
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/submit-activity"
            onClick={(e) => { 
              e.preventDefault(); 
              setActiveTab("submit");
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="88" x2="128" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> New Activity
          </Link>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-16 w-16">
              <img 
                className="h-16 w-16 rounded-full object-cover border-2 border-gray-200" 
                src={userProfile.avatar} 
                alt={userProfile.name} 
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">{userProfile.name}</h2>
              <p className="text-sm text-gray-500">
                {userProfile.role} | {userProfile.region} Region
              </p>
            </div>
          </div>
          <div className="mt-2 sm:mt-0 text-sm text-gray-500">
            <p>Employee ID: {userProfile.id}</p>
            <p>Reporting Manager: {userProfile.managerName}</p>
          </div>
        </div>
      </div>

      {/* Dashboard tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("summary")}
            className={`${
              activeTab === "summary"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab("submit")}
            className={`${
              activeTab === "submit"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Submit Activity
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`${
              activeTab === "history"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Activity History
          </button>
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === "summary" && (
        <div className="space-y-6">
          {/* Summary stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Activities
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {summaryStats.totalActivities}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <button 
                    onClick={() => setActiveTab("history")}
                    className="font-medium text-blue-700 hover:text-blue-900"
                  >
                    View all
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="128 72 128 128 184 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Review
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {summaryStats.pendingReview}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <button 
                    onClick={() => setActiveTab("history")}
                    className="font-medium text-blue-700 hover:text-blue-900"
                  >
                    View pending
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="24" x2="176" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="80" y1="24" x2="80" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="92 152 116 176 164 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Today's Activities
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {summaryStats.completedToday}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <button 
                    onClick={() => setActiveTab("history")}
                    className="font-medium text-blue-700 hover:text-blue-900"
                  >
                    View today
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="24" x2="176" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="80" y1="24" x2="80" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="84 132 100 124 100 180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M138.14,132a16,16,0,1,1,26.64,17.63L136,180h32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Upcoming Meetings
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {summaryStats.upcomingMeetings}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/calendar" className="font-medium text-blue-700 hover:text-blue-900">
                    View calendar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent activities */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Activities
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Your latest submitted sales activities
                </p>
              </div>
              <button
                onClick={() => setActiveTab("history")}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all activities
              </button>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 hover:bg-gray-50">
                    <dt className="text-sm font-medium text-gray-500">
                      {formatDate(activity.date)}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-2">
                      <div className="font-medium">{activity.clientName}</div>
                      <div className="text-gray-600 text-xs mt-1">
                        {activity.location} | {activity.meetingAgenda}
                      </div>
                      {activity.managerComments && (
                        <div className="mt-2 text-xs italic border-l-2 border-yellow-300 pl-2 text-gray-600">
                          <span className="font-medium">Manager:</span> {activity.managerComments}
                        </div>
                      )}
                    </dd>
                    <dd className="mt-1 text-sm text-right sm:mt-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          activity.status === "Reviewed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <button
                  onClick={() => setActiveTab("submit")}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    <p className="text-sm font-medium text-gray-900">Submit New Activity</p>
                    <p className="text-sm text-gray-500">Report your sales visit</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("history")}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="48" y1="216" x2="48" y2="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="48 56 176 56 176 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="48 104 224 104 224 152 48 152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="144 152 144 200 48 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    <p className="text-sm font-medium text-gray-900">Performance Analytics</p>
                    <p className="text-sm text-gray-500">View your sales metrics</p>
                  </div>
                </button>

                <button
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="80" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="80" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,224a60,60,0,0,1,96,0,60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,112a60,60,0,0,1,96,0h0a60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    <p className="text-sm font-medium text-gray-900">Account Settings</p>
                    <p className="text-sm text-gray-500">Update your profile</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "submit" && <ActivityForm />}
      
      {activeTab === "history" && <ActivityHistory />}
    </div>
  );
};

export default SalesDashboard;