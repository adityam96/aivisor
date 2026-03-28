import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useTools } from '../../hooks/useTools';

interface FilterState {
  category: string;
  pricing: string;
  sort: string;
  search: string;
}

const ToolsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    pricing: '',
    sort: 'rating',
    search: '',
  });
  const [searchInput, setSearchInput] = useState('');
  
  // Convert filters to match the expected parameters for useTools
  const toolsParams = {
    limit: 9,
    category: filters.category,
    search: filters.search,
    priceType: filters.pricing ? filters.pricing as "free" | "freemium" | "paid" | "subscription" : undefined,
    // Additional parameters can be added here as needed
  };
  
  // Define explicit type for the data returned by useTools
  interface ToolsData {
    tools: any[];
    total: number;
  }
  
  const { data, isLoading, isError } = useTools(toolsParams) as { 
    data: ToolsData | undefined; 
    isLoading: boolean; 
    isError: boolean 
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange('search', searchInput);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && (!data || newPage <= Math.ceil((data.total || 0) / 9))) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const categories = [
    'All Categories',
    'Text Generation',
    'Image Generation',
    'Code Assistant',
    'Data Analysis',
    'Customer Support',
    'Content Creation',
    'Research',
    'Productivity',
  ];

  const pricingOptions = [
    'All Pricing',
    'Free',
    'Freemium',
    'Paid',
    'Subscription',
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
  ];

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Tools Directory</h1>
              <p className="mt-2 text-gray-600">
                Browse and compare {data?.total || 'all'} AI tools across various categories
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                to="/survey" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Take the Survey
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="col-span-1 md:col-span-2">
                <form onSubmit={handleSearch}>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Search AI tools..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        type="submit"
                        className="h-full px-3 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category === 'All Categories' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing Filter */}
              <div>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.pricing}
                  onChange={(e) => handleFilterChange('pricing', e.target.value)}
                >
                  {pricingOptions.map((option) => (
                    <option key={option} value={option === 'All Pricing' ? '' : option.toLowerCase()}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">Sort by:</span>
                <select
                  className="ml-2 block pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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

              <div className="text-sm text-gray-700">
                {!isLoading && !isError && data && (
                  <span>
                    Showing {((page - 1) * 9) + 1}-{Math.min(page * 9, data.total)} of {data.total} tools
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">Error loading tools</h3>
              <p className="mt-2 text-gray-500">Please try again later or adjust your filters.</p>
            </div>
          ) : data?.tools?.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No tools found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.tools?.map((tool: any) => (
                <div key={tool.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-600">{tool.rating?.toFixed(1) || "N/A"}</span>
                          <svg className="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-3 text-base text-gray-500 line-clamp-3">{tool.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tool.categories?.slice(0, 3).map((category: string) => (
                          <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {category}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded-md">
                          {typeof tool.pricing === 'object' ? tool.pricing.type.charAt(0).toUpperCase() + tool.pricing.type.slice(1) : 'Free'}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{tool.reviewCount || 0} reviews</span>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <Link to={`/tools/${tool.id}`} className="text-base font-medium text-blue-600 hover:text-blue-500">
                        View Details
                      </Link>
                      <button 
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && !isError && data && data.total > 9 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-8">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= Math.ceil(data.total / 9)}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    page >= Math.ceil(data.total / 9) ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
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
                        page === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Page numbers */}
                    {[...Array(Math.min(5, Math.ceil(data.total / 9)))].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={i}
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
                        page >= Math.ceil(data.total / 9) ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ToolsPage;
