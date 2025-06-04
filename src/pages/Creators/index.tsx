import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useCreators, type Creator, type CreatorsParams } from '../../hooks/useCreators';

interface FilterState {
  industry: string;
  tag: string;
  minYears: string;
  minRating: string;
  sort: string;
  search: string;
}

const CreatorsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    industry: '',
    tag: '',
    minYears: '',
    minRating: '',
    sort: 'rating',
    search: '',
  });
  const [searchInput, setSearchInput] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Convert filters to match the expected parameters for useCreators
  const creatorsParams: CreatorsParams = {
    limit: 9,
    industry: filters.industry,
    search: filters.search,
    tag: filters.tag,
    minYears: filters.minYears ? parseInt(filters.minYears) : undefined,
    minRating: filters.minRating ? parseFloat(filters.minRating) : undefined,
    sort: filters.sort
  };

  const { data, isLoading, isError } = useCreators(creatorsParams);

  // Handle scroll for fixed filters
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange('search', searchInput);
    setShowMobileFilters(false); // Close mobile filters after search
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && (!data || newPage <= Math.ceil((data.total || 0) / 9))) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const industries = [
    'All Industries',
    'Healthcare',
    'Finance',
    'Education',
    'Research',
    'Manufacturing',
    'Retail',
    'Customer Service',
    'Marketing',
    'Media',
    'Entertainment',
    'Energy',
    'Agriculture',
  ];

  const tags = [
    'All Tags',
    'NLP',
    'Computer Vision',
    'Deep Learning',
    'Machine Learning',
    'Data Analytics',
    'Conversational AI',
    'Creative AI',
    'Educational AI',
    'Medical AI',
    'Green AI',
  ];

  const yearsOptions = [
    { value: '', label: 'Any Maturity' },
    { value: '1', label: '1+ Years' },
    { value: '3', label: '3+ Years' },
    { value: '5', label: '5+ Years' },
    { value: '10', label: '10+ Years' },
  ];

  const ratingOptions = [
    { value: '', label: 'Any Rating' },
    { value: '3', label: '3+ Stars' },
    { value: '3.5', label: '3.5+ Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '4.5', label: '4.5+ Stars' },
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' },
    { value: 'tools', label: 'Most Tools' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
  ];

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Creators Directory</h1>
              <p className="mt-2 text-gray-600">
                Discover {data?.total || 'all'} AI creators and companies building innovative tools
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/register?creator=true"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Register as Creator
              </Link>
            </div>
          </div>

          {/* Main content with sidebar layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Search and Filter Toggle */}
            <div className="lg:hidden w-full mb-4">
              <div className="flex items-center gap-2">
                <form onSubmit={handleSearch} className="flex-grow">
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Search creators..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        type="submit"
                        className="h-full px-3 text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                </button>
              </div>

              {/* Mobile Filters Dropdown */}
              {showMobileFilters && (
                <div className="mt-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-10">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Sort By</h3>
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={filters.sort}
                      onChange={(e) => handleFilterChange('sort', e.target.value)}
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Industries</h3>
                    <div className="space-y-2">
                      {industries.map((industry) => (
                        <div key={industry} className="flex items-center">
                          <input
                            id={`mobile-industry-${industry}`}
                            name="industry"
                            type="radio"
                            checked={filters.industry === (industry === 'All Industries' ? '' : industry)}
                            onChange={() =>
                              handleFilterChange(
                                'industry',
                                industry === 'All Industries' ? '' : industry
                              )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor={`mobile-industry-${industry}`} className="ml-3 text-sm text-gray-700">
                            {industry}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tags</h3>
                    <div className="space-y-2">
                      {tags.map((tag) => (
                        <div key={tag} className="flex items-center">
                          <input
                            id={`mobile-tag-${tag}`}
                            name="tag"
                            type="radio"
                            checked={filters.tag === (tag === 'All Tags' ? '' : tag)}
                            onChange={() => handleFilterChange('tag', tag === 'All Tags' ? '' : tag)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor={`mobile-tag-${tag}`} className="ml-3 text-sm text-gray-700">
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Company Maturity</h3>
                    <div className="space-y-2">
                      {yearsOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`mobile-years-${option.value}`}
                            name="minYears"
                            type="radio"
                            checked={filters.minYears === option.value}
                            onChange={() => handleFilterChange('minYears', option.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor={`mobile-years-${option.value}`} className="ml-3 text-sm text-gray-700">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Rating</h3>
                    <div className="space-y-2">
                      {ratingOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`mobile-rating-${option.value}`}
                            name="minRating"
                            type="radio"
                            checked={filters.minRating === option.value}
                            onChange={() => handleFilterChange('minRating', option.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor={`mobile-rating-${option.value}`} className="ml-3 text-sm text-gray-700">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        setFilters({
                          industry: '',
                          tag: '',
                          minYears: '',
                          minRating: '',
                          sort: 'rating',
                          search: filters.search,
                        });
                      }}
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      Reset Filters
                    </button>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Sidebar Filters */}
            <div className={`hidden lg:block w-64 ${isScrolled ? 'lg:sticky top-20' : ''}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                {/* Desktop Search */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Search</h3>
                  <form onSubmit={handleSearch}>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Search creators..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <button
                          type="submit"
                          className="h-full px-3 text-gray-500 hover:text-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Sort Options */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sort By</h3>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Industry Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Industries</h3>
                  <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                    {industries.map((industry) => (
                      <div key={industry} className="flex items-center">
                        <input
                          id={`industry-${industry}`}
                          name="industry"
                          type="radio"
                          checked={filters.industry === (industry === 'All Industries' ? '' : industry)}
                          onChange={() =>
                            handleFilterChange('industry', industry === 'All Industries' ? '' : industry)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={`industry-${industry}`} className="ml-3 text-sm text-gray-700">
                          {industry}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tag Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tags</h3>
                  <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center">
                        <input
                          id={`tag-${tag}`}
                          name="tag"
                          type="radio"
                          checked={filters.tag === (tag === 'All Tags' ? '' : tag)}
                          onChange={() => handleFilterChange('tag', tag === 'All Tags' ? '' : tag)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={`tag-${tag}`} className="ml-3 text-sm text-gray-700">
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Years Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Company Maturity</h3>
                  <div className="space-y-2">
                    {yearsOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`years-${option.value}`}
                          name="minYears"
                          type="radio"
                          checked={filters.minYears === option.value}
                          onChange={() => handleFilterChange('minYears', option.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={`years-${option.value}`} className="ml-3 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Rating</h3>
                  <div className="space-y-2">
                    {ratingOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`rating-${option.value}`}
                          name="minRating"
                          type="radio"
                          checked={filters.minRating === option.value}
                          onChange={() => handleFilterChange('minRating', option.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={`rating-${option.value}`} className="ml-3 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setFilters({
                      industry: '',
                      tag: '',
                      minYears: '',
                      minRating: '',
                      sort: 'rating',
                      search: filters.search,
                    });
                    setSearchInput('');
                  }}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset All Filters
                </button>
              </div>
            </div>

            {/* Creators Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-4 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  {!isLoading && !isError && data && (
                    <span>
                      Showing {((page - 1) * 9) + 1}-{Math.min(page * 9, data.total)} of {data.total} creators
                    </span>
                  )}
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : isError ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">Error loading creators</h3>
                  <p className="mt-2 text-gray-500">Please try again later or adjust your filters.</p>
                </div>
              ) : data?.creators?.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No creators found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                  {data?.creators?.map((creator: Creator) => (
                    <div
                      key={creator.id}
                      className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                              {creator.logoUrl ? (
                                <img
                                  src={creator.logoUrl}
                                  alt={`${creator.name} logo`}
                                  className="h-full w-full object-contain p-1"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-blue-50 text-blue-700 text-xl font-bold">
                                  {creator.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <h3 className="text-xl font-semibold text-gray-900">{creator.name}</h3>
                              <div className="flex items-center mt-1">
                                <div className="flex items-center">
                                  <svg
                                    className="w-4 h-4 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="ml-1 text-sm text-gray-600">
                                    {creator.rating.toFixed(1)}
                                  </span>
                                </div>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-600">
                                  {creator.reviewCount} reviews
                                </span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-600">
                                  Since {creator.yearFounded}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="text-base text-gray-500 line-clamp-3">
                            {creator.description}
                          </p>

                          <div className="mt-4 flex items-center">
                            <svg
                              className="w-5 h-5 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                            <span className="ml-2 text-sm font-medium text-gray-700">
                              {creator.toolCount} AI Tools
                            </span>
                          </div>

                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Industries:</h4>
                            <div className="flex flex-wrap gap-2">
                              {creator.industries.map((industry) => (
                                <span
                                  key={industry}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {industry}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties:</h4>
                            <div className="flex flex-wrap gap-2">
                              {creator.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <Link
                            to={`/creators/${creator.id}`}
                            className="text-base font-medium text-blue-600 hover:text-blue-500"
                          >
                            View Profile
                          </Link>
                          <a
                            href={creator.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!isLoading && !isError && data && data.total > 9 && (
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-8">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        page === 1
                          ? 'text-gray-400 bg-gray-100'
                          : 'text-gray-700 bg-white hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page >= Math.ceil(data.total / 9)}
                      className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        page >= Math.ceil(data.total / 9)
                          ? 'text-gray-400 bg-gray-100'
                          : 'text-gray-700 bg-white hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{((page - 1) * 9) + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(page * 9, data.total)}</span> of{' '}
                        <span className="font-medium">{data.total}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(page - 1)}
                          disabled={page === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: Math.min(5, Math.ceil(data.total / 9)) }, (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === pageNum
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          onClick={() => handlePageChange(page + 1)}
                          disabled={page >= Math.ceil(data.total / 9)}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            page >= Math.ceil(data.total / 9)
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatorsPage;