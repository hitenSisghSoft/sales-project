import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TeamActivityTable from "./TeamActivityTable";
import ActivityReview from "./ActivityReview";

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [summaryStats, setSummaryStats] = useState({
    totalActivities: 0,
    pendingReview: 0,
    completedToday: 0,
    topPerformer: "",
  });
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // In a real app, these would be API calls
    const fetchDashboardData = async () => {
      setLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock summary statistics
        setSummaryStats({
          totalActivities: 127,
          pendingReview: 18,
          completedToday: 24,
          topPerformer: "John Smith",
        });

        // Mock team members
        setTeamMembers([
          { 
            id: "EMP123", 
            name: "John Smith", 
            photo: "https://images.unsplash.com/photo-1519057079924-0543ce5d94fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA2NjF8&ixlib=rb-4.1.0&q=80&w=1080",
            position: "Senior Sales Representative",
            activitiesCompleted: 42,
            conversionRate: "68%",
            region: "New York"
          },
          { 
            id: "EMP456", 
            name: "Emily Johnson", 
            photo: "https://images.unsplash.com/photo-1590926932353-01713ae6848a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA2NjN8&ixlib=rb-4.1.0&q=80&w=1080",
            position: "Sales Representative",
            activitiesCompleted: 38,
            conversionRate: "72%",
            region: "Chicago"
          },
          { 
            id: "EMP789", 
            name: "Sarah Wilson", 
            photo: "https://images.unsplash.com/photo-1736939658882-a6bf57cd0e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA2NjR8&ixlib=rb-4.1.0&q=80&w=1080",
            position: "Business Development Executive",
            activitiesCompleted: 35,
            conversionRate: "65%",
            region: "Boston"
          },
          { 
            id: "EMP101", 
            name: "Michael Brown", 
            photo: "https://images.unsplash.com/photo-1667846217598-87aa77ddb1f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA2NjR8&ixlib=rb-4.1.0&q=80&w=1080",
            position: "Field Sales Representative",
            activitiesCompleted: 29,
            conversionRate: "59%",
            region: "Los Angeles"
          },
        ]);
        
        // Mock recent activities
        setRecentActivities([
          {
            id: "ACT001",
            employeeName: "John Smith",
            date: "2023-11-01",
            clientName: "Acme Corporation",
            agenda: "New product demo",
            status: "Reviewed",
          },
          {
            id: "ACT002",
            employeeName: "Emily Johnson",
            date: "2023-11-01",
            clientName: "TechStar Inc",
            agenda: "Contract renewal",
            status: "Pending",
          },
          {
            id: "ACT003",
            employeeName: "John Smith",
            date: "2023-10-31",
            clientName: "Global Enterprises",
            agenda: "Initial pitch",
            status: "Reviewed",
          },
          {
            id: "ACT004",
            employeeName: "Sarah Wilson",
            date: "2023-10-30",
            clientName: "Northeast Healthcare",
            agenda: "Follow up on proposal",
            status: "Reviewed",
          },
          {
            id: "ACT005",
            employeeName: "Sarah Wilson",
            date: "2023-11-02",
            clientName: "Innovation Labs",
            agenda: "New pitch",
            status: "Pending",
          },
        ]);
        
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
  
  const handleViewActivity = (activityId) => {
    setSelectedActivity(activityId);
    setActiveTab("review");
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
          <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Track and review field sales activities
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-md shadow">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="128" y1="144" x2="128" y2="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="216 144 216 208 40 208 40 144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="168 104 128 144 88 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> 
              Export Reports
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`${
              activeTab === "overview"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              setActiveTab("team-activities");
              setSelectedActivity(null);
            }}
            className={`${
              activeTab === "team-activities"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Team Activities
          </button>
          {selectedActivity && (
            <button
              onClick={() => setActiveTab("review")}
              className={`${
                activeTab === "review"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Activity Review
            </button>
          )}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
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
                  <Link to="/activities" className="font-medium text-blue-700 hover:text-blue-900">
                    View all
                  </Link>
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
                  <Link to="/pending-reviews" className="font-medium text-blue-700 hover:text-blue-900">
                    Review now
                  </Link>
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
                        Completed Today
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
                  <Link to="/today-activities" className="font-medium text-blue-700 hover:text-blue-900">
                    View details
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><line x1="96" y1="224" x2="160" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="184" x2="128" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M58,128H48A32,32,0,0,1,16,96V80a8,8,0,0,1,8-8H56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M198,128h10a32,32,0,0,0,32-32V80a8,8,0,0,0-8-8H200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M56,48H200v63.1c0,39.7-31.75,72.6-71.45,72.9A72,72,0,0,1,56,112Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Top Performer
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 truncate">
                          {summaryStats.topPerformer}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/performance" className="font-medium text-blue-700 hover:text-blue-900">
                    View performance
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Team members */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Team Members
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Performance overview of your sales team
                </p>
              </div>
              <Link 
                to="/team" 
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all members
              </Link>
            </div>

            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Employee
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Position
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Region
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Activities
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Conversion Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {teamMembers.map((member) => (
                        <tr key={member.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={member.photo}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">{member.name}</div>
                                <div className="text-gray-500">ID: {member.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {member.position}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {member.region}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {member.activitiesCompleted}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {member.conversionRate}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                  Latest submitted sales activities
                </p>
              </div>
              <button
                onClick={() => setActiveTab("team-activities")}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all activities
              </button>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="py-4 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6 hover:bg-gray-50">
                    <dt className="text-sm font-medium text-gray-500">
                      {formatDate(activity.date)}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                      {activity.employeeName}
                    </dd>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                      {activity.clientName}
                    </dd>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                      {activity.agenda}
                    </dd>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          activity.status === "Reviewed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                      <button
                        onClick={() => handleViewActivity(activity.id)}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        View
                      </button>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )}

      {activeTab === "team-activities" && <TeamActivityTable />}
      
      {activeTab === "review" && selectedActivity && (
        <ActivityReview activityId={selectedActivity} />
      )}
    </div>
  );
};

export default ManagerDashboard;