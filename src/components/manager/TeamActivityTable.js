import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const TeamActivityTable = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    employee: "",
    location: "",
    dateRange: {
      start: "",
      end: "",
    },
    status: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Fetch team activities (simulated)
  useEffect(() => {
    const fetchActivities = async () => {
      // In a real application, this would be an API call
      setTimeout(() => {
        const mockData = [
          {
            id: "ACT001",
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
            discussionSummary: "Presented our latest software solution. Client showed interest in premium features.",
            nextActionPlan: "Send pricing proposal by Friday",
            nextMeetingDate: "2023-11-15",
            proofOfVisitPhoto: "https://images.unsplash.com/photo-1507209696998-3c532be9b2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA0OTZ8&ixlib=rb-4.1.0&q=80&w=1080",
            milestoneAchieved: "Demo successfully delivered",
            issuesFaced: "None",
            managerComments: "Good progress, follow up on pricing concerns",
            status: "Reviewed",
          },
          {
            id: "ACT002",
            date: "2023-11-01",
            employeeName: "Emily Johnson",
            employeeId: "EMP456",
            location: "Chicago",
            gpsLocation: "41.8781° N, 87.6298° W",
            timeOfReporting: "02:15 PM",
            clientName: "TechStar Inc",
            contactPerson: "Michael Brown",
            contactNumber: "+1 312-555-7890",
            meetingAgenda: "Contract renewal",
            discussionSummary: "Discussed updated terms and additional services. Client requested discount on volume.",
            nextActionPlan: "Prepare revised contract with finance team",
            nextMeetingDate: "2023-11-10",
            proofOfVisitPhoto: "https://images.unsplash.com/photo-1652800708715-977a78590347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA1MDF8&ixlib=rb-4.1.0&q=80&w=1080",
            milestoneAchieved: "Initial agreement on terms",
            issuesFaced: "Price sensitivity higher than expected",
            managerComments: "",
            status: "Pending",
          },
          {
            id: "ACT003",
            date: "2023-10-31",
            employeeName: "John Smith",
            employeeId: "EMP123",
            location: "New York",
            gpsLocation: "40.7580° N, 73.9855° W",
            timeOfReporting: "09:00 AM",
            clientName: "Global Enterprises",
            contactPerson: "Robert Chen",
            contactNumber: "+1 212-444-5555",
            meetingAgenda: "Initial pitch",
            discussionSummary: "Introduced our company and core offerings. Client expressed interest in our analytics platform.",
            nextActionPlan: "Schedule product demo with technical team",
            nextMeetingDate: "2023-11-08",
            proofOfVisitPhoto: "https://images.unsplash.com/photo-1599912798363-287c325e6c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA1MDZ8&ixlib=rb-4.1.0&q=80&w=1080",
            milestoneAchieved: "Lead qualified",
            issuesFaced: "Competing with established vendor",
            managerComments: "Focus on our analytics differentiators in the follow-up",
            status: "Reviewed",
          },
          {
            id: "ACT004",
            date: "2023-10-30",
            employeeName: "Sarah Wilson",
            employeeId: "EMP789",
            location: "Boston",
            gpsLocation: "42.3601° N, 71.0589° W",
            timeOfReporting: "11:45 AM",
            clientName: "Northeast Healthcare",
            contactPerson: "Dr. Patricia Lee",
            contactNumber: "+1 617-333-2222",
            meetingAgenda: "Follow up on proposal",
            discussionSummary: "Addressed questions about implementation timeline and training. Client requested case studies.",
            nextActionPlan: "Share healthcare case studies and ROI calculator",
            nextMeetingDate: "2023-11-13",
            proofOfVisitPhoto: "https://images.unsplash.com/photo-1707135360649-7ef2403df500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA1MTJ8&ixlib=rb-4.1.0&q=80&w=1080",
            milestoneAchieved: "Technical questions resolved",
            issuesFaced: "Need more healthcare-specific testimonials",
            managerComments: "Good job addressing technical concerns. Work with marketing for better healthcare materials.",
            status: "Reviewed",
          },
          {
            id: "ACT005",
            date: "2023-11-02",
            employeeName: "Sarah Wilson",
            employeeId: "EMP789",
            location: "Boston",
            gpsLocation: "42.3505° N, 71.0825° W",
            timeOfReporting: "09:30 AM",
            clientName: "Innovation Labs",
            contactPerson: "Alex Rivera",
            contactNumber: "+1 617-555-9876",
            meetingAgenda: "New pitch",
            discussionSummary: "Presented our startup partnership program. Client showed strong interest in co-development opportunities.",
            nextActionPlan: "Schedule technical assessment call",
            nextMeetingDate: "2023-11-09",
            proofOfVisitPhoto: "https://images.unsplash.com/photo-1583061018090-c8f4f97ef2a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDA1MTZ8&ixlib=rb-4.1.0&q=80&w=1080",
            milestoneAchieved: "Interest confirmed",
            issuesFaced: "Timeline expectations may be aggressive",
            managerComments: "",
            status: "Pending",
          },
        ];
        setActivities(mockData);
        setFilteredActivities(mockData);
        setLoading(false);
      }, 1000);
    };

    fetchActivities();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...activities];

    // Apply filters
    if (filters.employee) {
      result = result.filter((item) =>
        item.employeeName.toLowerCase().includes(filters.employee.toLowerCase())
      );
    }

    if (filters.location) {
      result = result.filter((item) =>
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.status) {
      result = result.filter((item) => item.status === filters.status);
    }

    if (filters.dateRange.start) {
      result = result.filter(
        (item) => new Date(item.date) >= new Date(filters.dateRange.start)
      );
    }

    if (filters.dateRange.end) {
      result = result.filter(
        (item) => new Date(item.date) <= new Date(filters.dateRange.end)
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
  }, [activities, filters, sortConfig]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "startDate" || name === "endDate") {
      setFilters({
        ...filters,
        dateRange: {
          ...filters.dateRange,
          [name === "startDate" ? "start" : "end"]: value,
        },
      });
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
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

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd-MM-yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const viewActivityDetails = (activityId) => {
    // In a real application, this would navigate to a detailed view
    // or open a modal with all activity details
    console.log(`View details for activity ${activityId}`);
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Activity Reports</h2>
      
      {/* Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-1">
            Employee Name
          </label>
          <input
            type="text"
            id="employee"
            name="employee"
            value={filters.employee}
            onChange={handleFilterChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="Filter by employee"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="Filter by location"
          />
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.dateRange.start}
            onChange={handleFilterChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.dateRange.end}
            onChange={handleFilterChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
          </select>
        </div>
      </div>

      {/* Results summary */}
      <div className="mb-4 text-sm text-gray-600">
        <p>Showing {filteredActivities.length} of {activities.length} activities</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date {getSortIndicator("date")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("employeeName")}
              >
                Employee {getSortIndicator("employeeName")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("clientName")}
              >
                Client {getSortIndicator("clientName")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("location")}
              >
                Location {getSortIndicator("location")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("meetingAgenda")}
              >
                Agenda {getSortIndicator("meetingAgenda")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {getSortIndicator("status")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(activity.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.employeeName}
                    <div className="text-xs text-gray-500">ID: {activity.employeeId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.clientName}
                    <div className="text-xs text-gray-500">{activity.contactPerson}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {activity.meetingAgenda}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === "Reviewed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => viewActivityDetails(activity.id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View Details
                    </button>
                    {activity.status === "Pending" && (
                      <button className="text-green-600 hover:text-green-900">
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No activities match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamActivityTable;