import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

interface Tool {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  status: 'active' | 'pending' | 'rejected';
  featured: boolean;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'suspended';
  joinedAt: string;
}

interface Review {
  id: string;
  toolId: string;
  toolName: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tools' | 'users' | 'reviews' | 'settings'>('dashboard');
  const [tools, setTools] = useState<Tool[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Stats for dashboard
  const [stats, setStats] = useState({
    totalTools: 0,
    totalUsers: 0,
    totalReviews: 0,
    pendingTools: 0,
    pendingReviews: 0,
    activeUsers: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Mock data - in a real app, these would be API calls
        setTimeout(() => {
          // Mock tools data
          const mockTools: Tool[] = [
            {
              id: '1',
              name: 'ContentMaster AI',
              category: 'Content Creation',
              rating: 4.5,
              reviewCount: 128,
              status: 'active',
              featured: true,
              createdAt: '2025-04-15T10:30:00Z'
            },
            {
              id: '2',
              name: 'DataAnalyzer Pro',
              category: 'Data Analysis',
              rating: 3.8,
              reviewCount: 75,
              status: 'active',
              featured: false,
              createdAt: '2025-04-20T14:45:00Z'
            },
            {
              id: '3',
              name: 'CodeGenius',
              category: 'Development',
              rating: 4.2,
              reviewCount: 92,
              status: 'active',
              featured: true,
              createdAt: '2025-04-25T09:15:00Z'
            },
            {
              id: '4',
              name: 'DesignMind',
              category: 'Design',
              rating: 4.7,
              reviewCount: 63,
              status: 'pending',
              featured: false,
              createdAt: '2025-05-10T16:20:00Z'
            },
            {
              id: '5',
              name: 'MarketingGenius',
              category: 'Marketing',
              rating: 3.5,
              reviewCount: 42,
              status: 'pending',
              featured: false,
              createdAt: '2025-05-15T11:10:00Z'
            }
          ];
          
          // Mock users data
          const mockUsers: User[] = [
            {
              id: '101',
              name: 'John Doe',
              email: 'john.doe@example.com',
              role: 'admin',
              status: 'active',
              joinedAt: '2024-10-15T10:30:00Z'
            },
            {
              id: '102',
              name: 'Jane Smith',
              email: 'jane.smith@example.com',
              role: 'user',
              status: 'active',
              joinedAt: '2025-01-20T14:45:00Z'
            },
            {
              id: '103',
              name: 'Michael Johnson',
              email: 'michael.johnson@example.com',
              role: 'creator',
              status: 'active',
              joinedAt: '2025-02-25T09:15:00Z'
            },
            {
              id: '104',
              name: 'Emily Davis',
              email: 'emily.davis@example.com',
              role: 'user',
              status: 'suspended',
              joinedAt: '2025-03-10T16:20:00Z'
            },
            {
              id: '105',
              name: 'Robert Wilson',
              email: 'robert.wilson@example.com',
              role: 'creator',
              status: 'active',
              joinedAt: '2025-04-15T11:10:00Z'
            }
          ];
          
          // Mock reviews data
          const mockReviews: Review[] = [
            {
              id: '201',
              toolId: '1',
              toolName: 'ContentMaster AI',
              userId: '102',
              userName: 'Jane Smith',
              rating: 4,
              content: 'Great tool for content creation! Saves me hours of work every week.',
              status: 'approved',
              createdAt: '2025-05-15T10:30:00Z'
            },
            {
              id: '202',
              toolId: '2',
              toolName: 'DataAnalyzer Pro',
              userId: '103',
              userName: 'Michael Johnson',
              rating: 3,
              content: 'Decent tool but needs more features for advanced data analysis.',
              status: 'approved',
              createdAt: '2025-05-14T14:45:00Z'
            },
            {
              id: '203',
              toolId: '3',
              toolName: 'CodeGenius',
              userId: '102',
              userName: 'Jane Smith',
              rating: 5,
              content: 'Absolutely amazing! The code suggestions are spot on.',
              status: 'approved',
              createdAt: '2025-05-13T09:15:00Z'
            },
            {
              id: '204',
              toolId: '1',
              toolName: 'ContentMaster AI',
              userId: '105',
              userName: 'Robert Wilson',
              rating: 2,
              content: 'This tool contains inappropriate content and should be removed.',
              status: 'pending',
              createdAt: '2025-05-12T16:20:00Z'
            },
            {
              id: '205',
              toolId: '4',
              toolName: 'DesignMind',
              userId: '104',
              userName: 'Emily Davis',
              rating: 4,
              content: 'Great design suggestions but the interface could be more intuitive.',
              status: 'pending',
              createdAt: '2025-05-11T11:10:00Z'
            }
          ];

          setTools(mockTools);
          setUsers(mockUsers);
          setReviews(mockReviews);
          
          // Calculate stats
          setStats({
            totalTools: mockTools.length,
            totalUsers: mockUsers.length,
            totalReviews: mockReviews.length,
            pendingTools: mockTools.filter(tool => tool.status === 'pending').length,
            pendingReviews: mockReviews.filter(review => review.status === 'pending').length,
            activeUsers: mockUsers.filter(user => user.status === 'active').length
          });
          
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load admin data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleToolStatusChange = (toolId: string, newStatus: 'active' | 'pending' | 'rejected') => {
    setTools(prevTools => 
      prevTools.map(tool => 
        tool.id === toolId ? { ...tool, status: newStatus } : tool
      )
    );
  };

  const handleReviewStatusChange = (reviewId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId ? { ...review, status: newStatus } : review
      )
    );
  };

  const handleUserStatusChange = (userId: string, newStatus: 'active' | 'suspended') => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleToolFeatureToggle = (toolId: string) => {
    setTools(prevTools => 
      prevTools.map(tool => 
        tool.id === toolId ? { ...tool, featured: !tool.featured } : tool
      )
    );
  };

  return (
    <MainLayout>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 mb-8 md:mb-0">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-6 bg-blue-700 text-white">
                  <h2 className="text-xl font-bold">Admin Dashboard</h2>
                  <p className="text-blue-100 text-sm mt-1">Manage your platform</p>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          activeTab === 'dashboard'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('tools')}
                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          activeTab === 'tools'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        AI Tools
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          activeTab === 'users'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Users
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('reviews')}
                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          activeTab === 'reviews'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Reviews
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          activeTab === 'settings'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:ml-8 flex-1">
              {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {/* Dashboard Tab */}
                  {activeTab === 'dashboard' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Stats Cards */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                              <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                            <div className="ml-5">
                              <p className="text-sm font-medium text-gray-500">Total Tools</p>
                              <p className="text-3xl font-semibold text-gray-900">{stats.totalTools}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500">Pending approval</p>
                              <p className="text-sm font-medium text-blue-600">{stats.pendingTools}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white shadow-sm rounded-lg p-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </div>
                            <div className="ml-5">
                              <p className="text-sm font-medium text-gray-500">Total Users</p>
                              <p className="text-3xl font-semibold text-gray-900">{stats.totalUsers}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500">Active users</p>
                              <p className="text-sm font-medium text-green-600">{stats.activeUsers}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white shadow-sm rounded-lg p-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                              <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                              </svg>
                            </div>
                            <div className="ml-5">
                              <p className="text-sm font-medium text-gray-500">Total Reviews</p>
                              <p className="text-3xl font-semibold text-gray-900">{stats.totalReviews}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500">Pending moderation</p>
                              <p className="text-sm font-medium text-purple-600">{stats.pendingReviews}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Tools */}
                        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                          <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Tools</h3>
                          </div>
                          <div className="divide-y divide-gray-200">
                            {tools.slice(0, 3).map((tool) => (
                              <div key={tool.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900">{tool.name}</h4>
                                    <p className="text-sm text-gray-500">{tool.category}</p>
                                  </div>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    tool.status === 'active' ? 'bg-green-100 text-green-800' :
                                    tool.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {tool.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="px-6 py-4 border-t border-gray-200">
                            <button
                              onClick={() => setActiveTab('tools')}
                              className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                              View all tools
                            </button>
                          </div>
                        </div>
                        
                        {/* Recent Reviews */}
                        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                          <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Reviews</h3>
                          </div>
                          <div className="divide-y divide-gray-200">
                            {reviews.slice(0, 3).map((review) => (
                              <div key={review.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900">{review.toolName}</h4>
                                    <p className="text-sm text-gray-500">by {review.userName}</p>
                                  </div>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    review.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {review.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="px-6 py-4 border-t border-gray-200">
                            <button
                              onClick={() => setActiveTab('reviews')}
                              className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                              View all reviews
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tools Tab */}
                  {activeTab === 'tools' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">AI Tools</h2>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                          Add New Tool
                        </button>
                      </div>
                      
                      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Tool
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Rating
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Featured
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date Added
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {tools.map((tool) => (
                                <tr key={tool.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{tool.category}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <span className="text-sm text-gray-900">{tool.rating}</span>
                                      <span className="text-sm text-gray-500 ml-1">({tool.reviewCount})</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                      value={tool.status}
                                      onChange={(e) => handleToolStatusChange(tool.id, e.target.value as 'active' | 'pending' | 'rejected')}
                                      className={`text-sm rounded-full px-2.5 py-0.5 ${
                                        tool.status === 'active' ? 'bg-green-100 text-green-800' :
                                        tool.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}
                                    >
                                      <option value="active">Active</option>
                                      <option value="pending">Pending</option>
                                      <option value="rejected">Rejected</option>
                                    </select>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                      onClick={() => handleToolFeatureToggle(tool.id)}
                                      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                                        tool.featured ? 'bg-blue-600' : 'bg-gray-200'
                                      }`}
                                    >
                                      <span
                                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                          tool.featured ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                      />
                                    </button>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formatDate(tool.createdAt)}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link to={`/tools/${tool.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                                      View
                                    </Link>
                                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                                      Edit
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Users Tab */}
                  {activeTab === 'users' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Users</h2>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                          Add New User
                        </button>
                      </div>
                      
                      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Joined
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {users.map((user) => (
                                <tr key={user.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
                                        {user.name.charAt(0)}
                                      </div>
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                      user.role === 'creator' ? 'bg-blue-100 text-blue-800' :
                                      'bg-gray-100 text-gray-800'
                                    }`}>
                                      {user.role}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                      value={user.status}
                                      onChange={(e) => handleUserStatusChange(user.id, e.target.value as 'active' | 'suspended')}
                                      className={`text-sm rounded-full px-2.5 py-0.5 ${
                                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                      }`}
                                    >
                                      <option value="active">Active</option>
                                      <option value="suspended">Suspended</option>
                                    </select>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formatDate(user.joinedAt)}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link to={`/profile/${user.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                                      View
                                    </Link>
                                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                                      Edit
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === 'reviews' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
                      
                      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Tool
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  User
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Rating
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Content
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {reviews.map((review) => (
                                <tr key={review.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{review.toolName}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{review.userName}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <svg 
                                          key={i} 
                                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                          fill="currentColor" 
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500 truncate max-w-xs">{review.content}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                      value={review.status}
                                      onChange={(e) => handleReviewStatusChange(review.id, e.target.value as 'approved' | 'pending' | 'rejected')}
                                      className={`text-sm rounded-full px-2.5 py-0.5 ${
                                        review.status === 'approved' ? 'bg-green-100 text-green-800' :
                                        review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}
                                    >
                                      <option value="approved">Approved</option>
                                      <option value="pending">Pending</option>
                                      <option value="rejected">Rejected</option>
                                    </select>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                                      View
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Settings Tab */}
                  {activeTab === 'settings' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Settings</h2>
                      
                      <div className="space-y-6">
                        {/* General Settings */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="site-name" className="block text-sm font-medium text-gray-700">
                                Site Name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="site-name"
                                  id="site-name"
                                  defaultValue="Aivisor.fyi"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="site-description" className="block text-sm font-medium text-gray-700">
                                Site Description
                              </label>
                              <div className="mt-1">
                                <textarea
                                  id="site-description"
                                  name="site-description"
                                  rows={3}
                                  defaultValue="Find, compare, and review the best AI tools for your needs."
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
                                Contact Email
                              </label>
                              <div className="mt-1">
                                <input
                                  type="email"
                                  name="contact-email"
                                  id="contact-email"
                                  defaultValue="contact@aiadvisor.fyi"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Moderation */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Content Moderation</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="auto-approve-reviews"
                                  name="auto-approve-reviews"
                                  type="checkbox"
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="auto-approve-reviews" className="font-medium text-gray-700">Auto-approve reviews</label>
                                <p className="text-gray-500">Automatically approve reviews from verified users.</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="auto-approve-tools"
                                  name="auto-approve-tools"
                                  type="checkbox"
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="auto-approve-tools" className="font-medium text-gray-700">Auto-approve tools</label>
                                <p className="text-gray-500">Automatically approve tools submitted by verified creators.</p>
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="flagged-keywords" className="block text-sm font-medium text-gray-700">
                                Flagged Keywords
                              </label>
                              <div className="mt-1">
                                <textarea
                                  id="flagged-keywords"
                                  name="flagged-keywords"
                                  rows={3}
                                  defaultValue="spam, scam, inappropriate, offensive"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Enter keywords separated by commas"
                                />
                              </div>
                              <p className="mt-2 text-sm text-gray-500">
                                Content containing these keywords will be automatically flagged for review.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* API Settings */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">API Settings</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="enable-api"
                                  name="enable-api"
                                  type="checkbox"
                                  defaultChecked
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="enable-api" className="font-medium text-gray-700">Enable API access</label>
                                <p className="text-gray-500">Allow external applications to access the platform via API.</p>
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="api-key" className="block text-sm font-medium text-gray-700">
                                API Key
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                  type="text"
                                  name="api-key"
                                  id="api-key"
                                  defaultValue="sk_live_51JKl2jH7z8JK2l3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z"
                                  disabled
                                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 bg-gray-50"
                                />
                                <button
                                  type="button"
                                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm"
                                >
                                  Regenerate
                                </button>
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="rate-limit" className="block text-sm font-medium text-gray-700">
                                Rate Limit (requests per minute)
                              </label>
                              <div className="mt-1">
                                <input
                                  type="number"
                                  name="rate-limit"
                                  id="rate-limit"
                                  defaultValue="60"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
