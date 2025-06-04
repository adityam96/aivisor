import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    twitter: '',
    github: '',
    linkedin: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Check if viewing own profile or someone else's
  const isOwnProfile = !id || (currentUser.data && id === currentUser.data.id);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        // Mock data - in a real app, this would be an API call
        setTimeout(() => {
          setProfileData({
            name: isOwnProfile ? 'John Doe' : 'Jane Smith',
            email: isOwnProfile ? 'john.doe@example.com' : 'jane.smith@example.com',
            bio: 'AI enthusiast and technology professional with a passion for exploring new tools and sharing knowledge.',
            location: 'San Francisco, CA',
            website: 'https://example.com',
            twitter: '@aienthusiast',
            github: 'github.com/aienthusiast',
            linkedin: 'linkedin.com/in/aienthusiast'
          });
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load profile data');
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [id, isOwnProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Mock API call - in a real app, this would save to the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (err) {
      setError('Failed to save profile changes');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          {/* Profile Header */}
          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-medium">
                  {profileData.name.charAt(0)}
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                <p className="text-gray-600">{profileData.bio}</p>
                <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500">
                  {profileData.location && (
                    <div className="flex items-center mr-4 mb-2">
                      <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {profileData.location}
                    </div>
                  )}
                  {profileData.website && (
                    <div className="flex items-center mr-4 mb-2">
                      <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                      </svg>
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        {profileData.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              {isOwnProfile && !isEditing && (
                <div className="mt-4 md:mt-0">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`${
                  activeTab === 'saved'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Saved Tools
              </button>
              {isOwnProfile && (
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`${
                    activeTab === 'settings'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Settings
                </button>
              )}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mb-12">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                {isEditing ? (
                  <form onSubmit={handleSaveProfile}>
                    <div className="space-y-6">
                      <div className="bg-white shadow-sm rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                        
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                value={profileData.name}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <div className="mt-1">
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                              Bio
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="bio"
                                name="bio"
                                rows={3}
                                value={profileData.bio}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                              Brief description for your profile.
                            </p>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                              Location
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="location"
                                id="location"
                                value={profileData.location}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                              Website
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="website"
                                id="website"
                                value={profileData.website}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white shadow-sm rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Social Profiles</h2>
                        
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                              Twitter
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                twitter.com/
                              </span>
                              <input
                                type="text"
                                name="twitter"
                                id="twitter"
                                value={profileData.twitter.replace('@', '')}
                                onChange={handleInputChange}
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                              GitHub
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                github.com/
                              </span>
                              <input
                                type="text"
                                name="github"
                                id="github"
                                value={profileData.github.replace('github.com/', '')}
                                onChange={handleInputChange}
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                              LinkedIn
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                linkedin.com/in/
                              </span>
                              <input
                                type="text"
                                name="linkedin"
                                id="linkedin"
                                value={profileData.linkedin.replace('linkedin.com/in/', '')}
                                onChange={handleInputChange}
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            isSaving ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {isSaving ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Saving...
                            </span>
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white shadow-sm rounded-lg p-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">About</h2>
                      <p className="text-gray-700">{profileData.bio}</p>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg p-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd className="mt-1 text-sm text-gray-900">{profileData.email}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Location</dt>
                          <dd className="mt-1 text-sm text-gray-900">{profileData.location}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Website</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                              {profileData.website}
                            </a>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg p-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Social Profiles</h2>
                      <ul className="space-y-4">
                        {profileData.twitter && (
                          <li className="flex items-center">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <a href={`https://twitter.com/${profileData.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-900 hover:text-blue-600">
                                {profileData.twitter}
                              </a>
                            </div>
                          </li>
                        )}
                        {profileData.github && (
                          <li className="flex items-center">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <a href={`https://github.com/${profileData.github.replace('github.com/', '')}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-900 hover:text-blue-600">
                                {profileData.github}
                              </a>
                            </div>
                          </li>
                        )}
                        {profileData.linkedin && (
                          <li className="flex items-center">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <a href={`https://linkedin.com/in/${profileData.linkedin.replace('linkedin.com/in/', '')}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-900 hover:text-blue-600">
                                {profileData.linkedin}
                              </a>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
                
                {/* Sample reviews - in a real app, these would come from an API */}
                <div className="space-y-8">
                  <div className="bg-white shadow-sm rounded-lg p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">AI</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">Great Tool for Content Creation</h3>
                          <p className="text-sm text-gray-500">2 weeks ago</p>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="ml-2 text-sm text-gray-500">for <Link to="/tools/1" className="text-blue-600 hover:text-blue-500">ContentMaster AI</Link></p>
                        </div>
                        <div className="mt-4 text-gray-700">
                          This tool has completely transformed my content creation workflow. The AI-generated suggestions are spot on, and the interface is intuitive. Highly recommended for anyone who creates content regularly.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white shadow-sm rounded-lg p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">AI</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">Decent but Needs Improvement</h3>
                          <p className="text-sm text-gray-500">1 month ago</p>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < 3 ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="ml-2 text-sm text-gray-500">for <Link to="/tools/2" className="text-blue-600 hover:text-blue-500">DataAnalyzer Pro</Link></p>
                        </div>
                        <div className="mt-4 text-gray-700">
                          The tool has potential but needs more features for advanced data analysis. The basic functionality works well, but I found myself needing to export to other tools for more complex operations.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Tools Tab */}
            {activeTab === 'saved' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Saved Tools</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Sample saved tools - in a real app, these would come from an API */}
                  <div className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">ContentMaster AI</h3>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-600">4.5</span>
                          <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        AI-powered content creation tool that helps you generate high-quality articles, blog posts, and social media content.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Content Creation</span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">AI Writing</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link to="/tools/1" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                          View Details
                        </Link>
                        <button className="text-gray-400 hover:text-gray-500">
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">DataAnalyzer Pro</h3>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-600">3.8</span>
                          <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        Advanced data analysis tool with AI capabilities for extracting insights from complex datasets.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Data Analysis</span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Business Intelligence</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link to="/tools/2" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                          View Details
                        </Link>
                        <button className="text-gray-400 hover:text-gray-500">
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab (Only for own profile) */}
            {activeTab === 'settings' && isOwnProfile && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="bg-white shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="comments" className="font-medium text-gray-700">Comments</label>
                          <p className="text-gray-500">Get notified when someone comments on your reviews.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="tools"
                            name="tools"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="tools" className="font-medium text-gray-700">New Tools</label>
                          <p className="text-gray-500">Get notified when new tools are added in your areas of interest.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newsletter"
                            name="newsletter"
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="newsletter" className="font-medium text-gray-700">Newsletter</label>
                          <p className="text-gray-500">Receive our weekly newsletter with AI tool updates and tips.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                    
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="current-password"
                            name="current-password"
                            type="password"
                            autoComplete="current-password"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="new-password"
                            name="new-password"
                            type="password"
                            autoComplete="new-password"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            autoComplete="new-password"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="bg-white shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Account</h3>
                    <p className="text-gray-700 mb-4">
                      Once you delete your account, all of your data will be permanently removed. This action cannot be undone.
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
