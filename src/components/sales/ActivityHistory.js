import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const ActivityHistory = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    period: "all",
    status: "all",
    searchQuery: "",
  });
  const [showDetailId, setShowDetailId] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Fetch activities (simulated API call)
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      
      // In a real application, this would be an API call
      setTimeout(() => {
        // Mock data
        const mockActivities = [
          {
            id: "ACT123",
            date: "2023-11-01",
            clientName: "Acme Corporation",
            contactPerson: "Jane Doe",
            location: "New York",
            meetingAgenda: "Product Demo",
            discussionSummary: "Demonstrated our premium solution. The client was impressed with the reporting features and expressed interest in a full implementation across their regional offices.",
            milestoneAchieved: "Demo successfully delivered",
            nextActionPlan: "Send detailed pricing proposal by Friday",
            proofOfVisitPhoto: "https://images.unsplash.com/photo-1717414477663-a5f5384499b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA4Mjd8&ixlib=rb-4.1.0&q=80&w=1080",
            status: "Reviewed",
            managerComments: "Great job establishing rapport. Focus on ROI metrics in the pricing proposal.",
            reviewDate: "2023-11-02",
          },
          {
            id: "ACT122",
            date: "2023-10-28",
            clientName: "TechSolutions Inc",
            contactPerson: "Robert Chen",
            location: "Boston",
            meetingAgenda: "Follow-up Meeting",
            discussionSummary: "Addressed questions about implementation timeline and training requirements. Client requested reference contacts from similar-sized organizations.",
            milestoneAchieved: "Technical questions resolved",
            nextActionPlan: "Provide reference contacts and case studies",
            proofOfVisitPhoto: "https://images.unsplash.com/photo-1579611932258-889fd93cec9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA4MzF8&ixlib=rb-4.1.0&q=80&w=1080",
            status: "Reviewed",
            managerComments: "Good follow-up. Make sure to send those references ASAP to maintain momentum.",
            reviewDate: "2023-10-30",
          },
          {
            id: "ACT119",
            date: "2023-10-20",
            clientName: "Global Enterprises",
            contactPerson: "Maria Rodriguez",
            location: "New York",
            meetingAgenda: "Initial Pitch",
            discussionSummary: "Presented our company overview and solutions relevant to their industry. Client showed particular interest in our analytics dashboard.",
            milestoneAchieved: "Lead qualified",
            nextActionPlan: "Schedule technical demo with IT team",
            proofOfVisitPhoto: "https://images.unsplash.com/photo-1704481235089-d008e2ba9abd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
            status: "Reviewed",
            managerComments: "Solid initial meeting. For the technical demo, focus on the customization options they mentioned.",
            reviewDate: "2023-10-21",
          },
          {
            id: "ACT125",
            date: "2023-11-02",
            clientName: "Northeast Healthcare",
            contactPerson: "Dr. Patricia Lee",
            location: "Boston",
            meetingAgenda: "Contract Renewal",
            discussionSummary: "Discussed renewal terms and potential service upgrades. Client expressed satisfaction with current service but requested a more competitive pricing structure.",
            milestoneAchieved: "Renewal discussion initiated",
            nextActionPlan: "Prepare tiered pricing options for multi-year contract",
            proofOfVisitPhoto: "https://images.unsplash.com/photo-1630226040750-d934f017f0e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA4Mzd8&ixlib=rb-4.1.0&q=80&w=1080",
            status: "Pending",
            managerComments: "",
            reviewDate: null,
          },
          {
            id: "ACT127",
            date: "2023-11-03",
            clientName: "Innovation Labs",
            contactPerson: "Alex Rivera",
            location: "New York",
            meetingAgenda: "New Pitch",
            discussionSummary: "Presented our startup partnership program. Client showed strong interest in co-development opportunities but had concerns about timeline.",
            milestoneAchieved: "Interest confirmed",
            nextActionPlan: "Schedule technical assessment call with their dev team",
            proofOfVisitPhoto: "https://images.unsplash.com/photo-1615852993296-b42d4dbb5555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA4NDB8&ixlib=rb-4.1.0&q=80&w=1080",
            status: "Pending",
            managerComments: "",
            reviewDate: null,
          },
        ];
        
        setActivities(mockActivities);
        setFilteredActivities(mockActivities);
        setLoading(false);
      }, 1000);
    };
    
    fetchActivities();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...activities];

    // Apply date filter
    if (filter.period !== "all") {
      const today = new Date();
      let startDate;

      switch(filter.period) {
        case "today":
          startDate = new Date(today.setHours(0, 0, 0, 0));
          break;
        case "week":
          startDate = new Date(today.setDate(today.getDate() - 7));
          break;
        case "month":
          startDate = new Date(today.setMonth(today.getMonth() - 1));
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        result = result.filter(item => new Date(item.date) >= startDate);
      }
    }

    // Apply status filter
    if (filter.status !== "all") {
      result = result.filter(item => item.status === filter.status);
    }

    // Apply search query
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.clientName.toLowerCase().includes(query) ||
          item.contactPerson.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.meetingAgenda.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredActivities(result);
  }, [activities, filter, sortConfig]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // The filter will be applied automatically by the useEffect above
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd-MM-yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const toggleDetail = (id) => {
    setShowDetailId(showDetailId === id ? null : id);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <span className="ml-1">▲</span>
    ) : (
      <span className="ml-1">▼</span>
    );
  };

  const statusBadgeClass = (status) => {
    switch(status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Reviewed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Activity History</h2>
        <p className="text-gray-600 mt-1">View and track your previous sales activities</p>
      </div>
      
      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                name="searchQuery"
                value={filter.searchQuery}
                onChange={handleFilterChange}
                className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="Search by client, contact or agenda..."
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </button>
            </form>
          </div>
          
          <div className="flex space-x-2">
            <div>
              <select
                name="period"
                value={filter.period}
                onChange={handleFilterChange}
                className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
            
            <div>
              <select
                name="status"
                value={filter.status}
                onChange={handleFilterChange}
                className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results summary */}
      <div className="mb-4 text-sm text-gray-600 flex flex-col md:flex-row md:justify-between md:items-center">
        <p>Showing {filteredActivities.length} of {activities.length} activities</p>
        
        <div className="mt-2 md:mt-0">
          <button
            onClick={() => setSortConfig({ key: "date", direction: "desc" })}
            className={`text-sm font-medium px-2 py-1 rounded ${
              sortConfig.key === "date" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Most Recent First
          </button>
        </div>
      </div>
      
      {/* Activity List */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="64" height="64"><rect width="256" height="256" fill="none"/><path d="M224,88V200.89a7.11,7.11,0,0,1-7.11,7.11H40a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H93.33a8,8,0,0,1,4.8,1.6L128,80h88A8,8,0,0,1,224,88Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="104" y1="144" x2="152" y2="144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No activities found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No activities match your current filter criteria.
          </p>
          <div className="mt-6">
            <Link
              to="/submit-activity"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="88" x2="128" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> Submit New Activity
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  Date {getSortIndicator("date")}
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("clientName")}
                >
                  Client {getSortIndicator("clientName")}
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  Location {getSortIndicator("location")}
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("meetingAgenda")}
                >
                  Agenda {getSortIndicator("meetingAgenda")}
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status {getSortIndicator("status")}
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <tr className={`${showDetailId === activity.id ? "bg-blue-50" : "hover:bg-gray-50"}`}>
                    <td className="py-4 pl-4 pr-3 text-sm whitespace-nowrap">
                      {formatDate(activity.date)}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap">
                      <div className="font-medium text-gray-900">{activity.clientName}</div>
                      <div className="text-gray-500">{activity.contactPerson}</div>
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                      {activity.location}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {activity.meetingAgenda}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass(activity.status)}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm font-medium whitespace-nowrap">
                      <button
                        onClick={() => toggleDetail(activity.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {showDetailId === activity.id ? "Hide Details" : "Show Details"}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded row with details */}
                  {showDetailId === activity.id && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 bg-blue-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2 space-y-4">
                            <div>
                              <h4 className="font-medium text-sm text-gray-500">Discussion Summary</h4>
                              <p className="mt-1 text-gray-900">{activity.discussionSummary}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-sm text-gray-500">Next Action Plan</h4>
                                <p className="mt-1 text-gray-900">{activity.nextActionPlan}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm text-gray-500">Milestone Achieved</h4>
                                <p className="mt-1 text-gray-900">{activity.milestoneAchieved}</p>
                              </div>
                            </div>
                            
                            {activity.managerComments && (
                              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                <div className="flex">
                                  <div className="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                                  </div>
                                  <div className="ml-3">
                                    <h4 className="text-sm font-medium text-yellow-800">Manager Comments</h4>
                                    <p className="mt-1 text-sm text-yellow-700">
                                      {activity.managerComments}
                                    </p>
                                    {activity.reviewDate && (
                                      <p className="mt-1 text-xs text-yellow-600">
                                        Reviewed on {formatDate(activity.reviewDate)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col">
                            <h4 className="font-medium text-sm text-gray-500 mb-2">Proof of Visit</h4>
                            <div className="relative">
                              <img 
                                src={activity.proofOfVisitPhoto}
                                alt="Proof of visit" 
                                className="w-full h-48 object-cover rounded-lg shadow-sm"
                              />
                            </div>
                            <div className="mt-3">
                              <button
                                onClick={() => {}}
                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> View Full Image
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Action button */}
      <div className="mt-6 flex justify-center">
        <Link
          to="/submit-activity"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="88" x2="128" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> Submit New Activity
        </Link>
      </div>
    </div>
  );
};

export default ActivityHistory;