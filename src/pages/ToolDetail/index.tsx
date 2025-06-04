import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useTool } from '../../hooks/useTools';
import { useReviews } from '../../hooks/useReviews';
import { useComparisonStore } from '../../store';

// Define a type for the tool data with all properties used in this component
interface ToolDetail {
  id: string;
  name: string;
  description: string;
  category?: string;
  categories?: string[];
  features?: any[];
  pricing?: any;
  rating?: number;
  reviewCount?: number;
  reviews?: number;
  url?: string;
  website?: string;
  logoUrl?: string;
  creatorId?: string;
  creatorName?: string;
  maturityVersion?: string;
  pros?: string[];
  cons?: string[];
  bestFor?: string[];
  notGoodFor?: string[];
  tags?: string[];
  featured?: boolean;
  longDescription?: string;
  useCases?: string[];
  pricingDetails?: string;
  apiAccess?: boolean;
  platforms?: string[];
  dataPrivacy?: string;
  support?: string;
  ratingDistribution?: Record<number, number>;
  topPros?: string[];
  topCons?: string[];
  alternatives?: any[];
  [key: string]: any; // Allow any other properties
}

const ToolDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reviewPage, setReviewPage] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  
  const { data: tool, isLoading: isToolLoading, isError: isToolError } = useTool(id || '') as {
    data: ToolDetail | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  const { data: reviewsData, isLoading: isReviewsLoading } = useReviews(id || '', { page: reviewPage, limit: 5 });
  
  const { addTool, removeTool, isToolInComparison } = useComparisonStore();
  const isInComparison = id ? isToolInComparison(id) : false;
  
  const toggleComparison = () => {
    if (id) {
      if (isInComparison) {
        removeTool(id);
      } else {
        addTool(id);
      }
    }
  };
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isToolLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (isToolError || !tool) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Tool not found</h2>
            <p className="mt-2 text-gray-600">The tool you're looking for doesn't exist or has been removed.</p>
            <Link to="/tools" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              Back to Tools
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              </li>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li>
                <Link to="/tools" className="text-gray-500 hover:text-gray-700">Tools</Link>
              </li>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium">{tool.name}</li>
            </ol>
          </nav>

          {/* Tool Header with Logo and Title */}
          <div className="bg-white shadow-lg rounded-lg p-8 mb-8 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex-1 flex items-start">
                {/* Fixed Tool Logo - Removed flickering */}
                <div className="flex-shrink-0 mr-6">
                  <div className="w-28 h-28 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center border border-gray-200 shadow-sm">
                    {tool.logoUrl ? (
                      <img 
                        src={tool.logoUrl} 
                        alt={`${tool.name} logo`} 
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          // Use a more reliable fallback approach
                          target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = "text-4xl font-bold text-blue-600 flex items-center justify-center h-full w-full";
                          fallback.textContent = tool.name.charAt(0);
                          target.parentElement?.appendChild(fallback);
                        }}
                      />
                    ) : (
                      <div className="text-4xl font-bold text-blue-600">
                        {tool.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Enhanced Tool Title and Info */}
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{tool.name}</h1>
                  <div className="mt-3 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.round(tool.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-gray-700 font-medium">{tool.rating?.toFixed(1) || "N/A"}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-600">{tool.reviews || 0} reviews</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-600 font-medium">
                      {typeof tool.pricing === 'object' ? tool.pricing.type.charAt(0).toUpperCase() + tool.pricing.type.slice(1) : 'Free'}
                    </span>
                  </div>
                  
                  {/* Enhanced Creator Link */}
                  {tool.creatorName && (
                    <div className="mt-3 flex items-center">
                      <span className="text-gray-600">By </span>
                      <Link 
                        to={`/creators/${tool.creatorId || 'unknown'}`} 
                        className="ml-1 text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center"
                      >
                        {tool.creatorName}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </div>
                  )}
                  
                  {/* Categories */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tool.categories?.map((category: string) => (
                      <Link 
                        key={category} 
                        to={`/tools?category=${encodeURIComponent(category)}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Moved Sample Images to right side */}
              <div className="md:w-1/3 lg:w-1/4 mt-6 md:mt-0 flex flex-col gap-3">
                {/* Sample Images Preview */}
                {tool.sampleImages && tool.sampleImages.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Sample Images
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {tool.sampleImages.slice(0, 4).map((image: string, index: number) => (
                        <div key={index} className="relative aspect-video bg-gray-100 rounded overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                          <img 
                            src={image} 
                            alt={`${tool.name} sample ${index + 1}`} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-1">
                            <button 
                              onClick={() => window.open(image, '_blank')}
                              className="text-xs text-white bg-black/60 px-1.5 py-0.5 rounded hover:bg-black/80 transition-colors flex items-center"
                            >
                              <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                      {tool.sampleImages.length > 4 && (
                        <div className="relative aspect-video bg-gray-100 rounded overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center">
                          <div className="text-sm font-medium text-blue-600">+{tool.sampleImages.length - 4} more</div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-4 text-center">
                    <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-gray-500 mt-1">No images</p>
                  </div>
                )}
                
                {/* Action Buttons */}
                <a 
                  href={tool.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </a>
                <button 
                  onClick={toggleComparison}
                  className={`inline-flex items-center justify-center px-5 py-2.5 border rounded-md shadow-sm text-sm font-medium transition-colors ${
                    isInComparison 
                      ? 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {isInComparison ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Remove from Comparison
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add to Comparison
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Enhanced Tags Section for Easy Searching */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags && tool.tags.length > 0 ? (
                  tool.tags.map((tag: string, index: number) => (
                    <Link 
                      key={index}
                      to={`/tools?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition-colors flex items-center group relative"
                      title={`Find tools tagged with "${tag}"`}
                    >
                      <span className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 rounded-full transition-opacity"></span>
                      <svg className="w-3.5 h-3.5 mr-1.5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {tag}
                    </Link>
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300 w-full">
                    <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <p className="text-gray-500 mt-2">No tags available for this tool.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced Use Case Tags Sections */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              {/* Best Known For Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Best Known For
                </h3>
                <p className="text-sm text-gray-600 mb-4 italic">Click on a use case to find similar tools with the same strengths</p>
                <div className="flex flex-wrap gap-2.5">
                  {tool.bestFor && tool.bestFor.length > 0 ? (
                    tool.bestFor.map((useCase: string, index: number) => (
                      <Link 
                        key={index}
                        to={`/tools?useCase=${encodeURIComponent(useCase)}`}
                        className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-full text-sm font-medium transition-colors flex items-center shadow-sm hover:shadow relative"
                        title={`Find tools that excel at "${useCase}"`}
                      >
                        {/* Removed problematic absolute span that caused oversized highlight */}
                        <svg className="w-4 h-4 mr-1.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {useCase}
                      </Link>
                    ))
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300 w-full">
                      <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500 mt-2">No specific use cases highlighted for this tool.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Can Be Avoided For Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Can Be Avoided For
                </h3>
                <p className="text-sm text-gray-600 mb-4 italic">Use cases where this tool may not be the best choice</p>
                <div className="flex flex-wrap gap-2.5">
                  {tool.notGoodFor && tool.notGoodFor.length > 0 ? (
                    tool.notGoodFor.map((limitation: string, index: number) => (
                      <div 
                        key={index}
                        className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-full text-sm font-medium flex items-center shadow-sm relative group"
                        title={`This tool is not recommended for "${limitation}"`}
                      >
                        <span className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-5 rounded-full transition-opacity"></span>
                        <svg className="w-4 h-4 mr-1.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {limitation}
                      </div>
                    ))
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300 w-full">
                      <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500 mt-2">No specific limitations highlighted for this tool.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-6 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm flex items-center transition-colors`}
              >
                <svg className={`w-4 h-4 mr-1.5 ${activeTab === 'overview' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Overview
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`${
                  activeTab === 'features'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm flex items-center transition-colors`}
              >
                <svg className={`w-4 h-4 mr-1.5 ${activeTab === 'features' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Features
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm flex items-center transition-colors`}
              >
                <svg className={`w-4 h-4 mr-1.5 ${activeTab === 'reviews' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('alternatives')}
                className={`${
                  activeTab === 'alternatives'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm flex items-center transition-colors`}
              >
                <svg className={`w-4 h-4 mr-1.5 ${activeTab === 'alternatives' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Alternatives
              </button>
              <button
                onClick={() => setActiveTab('howto')}
                className={`${
                  activeTab === 'howto'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm flex items-center transition-colors`}
              >
                <svg className={`w-4 h-4 mr-1.5 ${activeTab === 'howto' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How to Use?
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`${
                  activeTab === 'pricing'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm flex items-center transition-colors`}
              >
                <svg className={`w-4 h-4 mr-1.5 ${activeTab === 'pricing' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pricing
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`${
                  activeTab === 'images'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm flex items-center transition-colors`}
              >
                <svg className={`w-4 h-4 mr-1.5 ${activeTab === 'images' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Images
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mb-12">
            {/* Images Tab */}
            {activeTab === 'images' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {tool.name} Screenshots & Examples
                </h2>
                
                {tool.sampleImages && tool.sampleImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tool.sampleImages.map((image: string, index: number) => (
                      <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <img 
                          src={image} 
                          alt={`${tool.name} sample ${index + 1}`} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                          <div className="text-white text-sm font-medium">Sample {index + 1}</div>
                          <button 
                            onClick={() => window.open(image, '_blank')}
                            className="text-sm text-white bg-black/60 px-3 py-1.5 rounded-md hover:bg-black/80 transition-colors flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Full Size
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-12 text-center border border-dashed border-gray-300">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 mt-4 text-lg">No sample images available for this tool.</p>
                    <p className="text-gray-400 mt-2">Check back later or visit the tool's website for visual examples.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {tool.name}</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{tool.description}</p>
                  
                  {/* Additional sections */}
                  <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">What is {tool.name}?</h3>
                  <p className="text-gray-700">
                    {tool.longDescription || `${tool.name} is an AI-powered tool designed to help users with various tasks related to ${tool.categories?.[0] || 'AI assistance'}. It provides a range of features to enhance productivity and streamline workflows.`}
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Use Cases</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {tool.useCases?.map((useCase: string, index: number) => (
                      <li key={index}>{useCase}</li>
                    )) || (
                      <>
                        <li>Streamline workflows and increase productivity</li>
                        <li>Automate repetitive tasks</li>
                        <li>Generate high-quality content quickly</li>
                        <li>Analyze data and extract insights</li>
                      </>
                    )}
                  </ul>
                  
                  <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Pricing</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {typeof tool.pricing === 'object' ? tool.pricing.type.charAt(0).toUpperCase() + tool.pricing.type.slice(1) : 'Free'}
                    </h4>
                    <p className="text-gray-700">{tool.pricingDetails || 'Contact the provider for detailed pricing information.'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {tool.features?.map((feature: any, index: number) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                        <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  )) || (
                    <>
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">User-friendly Interface</h3>
                          <p className="mt-2 text-base text-gray-500">Intuitive design that makes it easy to navigate and use all features efficiently.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Advanced AI Capabilities</h3>
                          <p className="mt-2 text-base text-gray-500">Powered by state-of-the-art AI models to deliver high-quality results.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Seamless Integration</h3>
                          <p className="mt-2 text-base text-gray-500">Easily integrates with other tools and platforms in your workflow.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Customization Options</h3>
                          <p className="mt-2 text-base text-gray-500">Tailor the tool to your specific needs with extensive customization options.</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Technical Specifications */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
                  
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">API Access</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tool.apiAccess ? 'Yes' : 'No'}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Platforms</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tool.platforms?.join(', ') || 'Web, iOS, Android'}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Data Privacy</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tool.dataPrivacy || 'GDPR Compliant'}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Support</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tool.support || 'Email, Chat'}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">User Reviews</h2>
                  <Link 
                    to={`/tools/${id}/review`} 
                    className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Write a Review
                  </Link>
                </div>
                
                {/* Reviews Summary */}
                <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="text-5xl font-bold text-gray-900">{tool.rating?.toFixed(1) || "N/A"}</div>
                        <div className="ml-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-5 h-5 ${i < Math.round(tool.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Based on {tool.reviews || 0} reviews</p>
                        </div>
                      </div>
                      
                      {/* Rating Distribution */}
                      <div className="mt-6 space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const percentage = tool.ratingDistribution?.[rating] || 0;
                          return (
                            <div key={rating} className="flex items-center">
                              <div className="text-sm font-medium text-gray-700 w-6">{rating}</div>
                              <div className="ml-2 flex-1">
                                <div className="bg-gray-200 rounded-full h-2 w-full">
                                  <div 
                                    className="bg-yellow-400 rounded-full h-2" 
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="ml-2 text-sm font-medium text-gray-700 w-10">{percentage}%</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="mt-8 md:mt-0 md:ml-8 md:border-l md:border-gray-200 md:pl-8 flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">What users are saying</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Pros</h4>
                          <ul className="mt-2 text-sm text-gray-600 space-y-1">
                            {tool.topPros?.map((pro: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <svg className="h-4 w-4 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {pro}
                              </li>
                            )) || (
                              <>
                                <li className="flex items-center">
                                  <svg className="h-4 w-4 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  Easy to use interface
                                </li>
                                <li className="flex items-center">
                                  <svg className="h-4 w-4 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  High-quality outputs
                                </li>
                                <li className="flex items-center">
                                  <svg className="h-4 w-4 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  Excellent customer support
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Cons</h4>
                          <ul className="mt-2 text-sm text-gray-600 space-y-1">
                            {tool.topCons?.map((con: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <svg className="h-4 w-4 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                {con}
                              </li>
                            )) || (
                              <>
                                <li className="flex items-center">
                                  <svg className="h-4 w-4 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                  </svg>
                                  Limited customization options
                                </li>
                                <li className="flex items-center">
                                  <svg className="h-4 w-4 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                  </svg>
                                  Pricing could be more competitive
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Review List */}
                {isReviewsLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : reviewsData?.reviews?.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
                    <p className="mt-2 text-gray-500">Be the first to review this tool!</p>
                    <Link 
                      to={`/tools/${id}/review`} 
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Write a Review
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {reviewsData?.reviews?.map((review: any) => (
                      <div key={review.id} className="bg-white shadow-sm rounded-lg p-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 font-medium">{review.user?.name?.charAt(0) || 'U'}</span>
                            </div>
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900">{review.title}</h3>
                              <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center mt-1">
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
                              <p className="ml-2 text-sm text-gray-500">{review.user?.name || 'Anonymous'}</p>
                            </div>
                            <div className="mt-4 text-gray-700">{review.content}</div>
                            
                            {(review.pros?.length > 0 || review.cons?.length > 0) && (
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {review.pros?.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900">Pros</h4>
                                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                      {review.pros.map((pro: string, index: number) => (
                                        <li key={index} className="flex items-center">
                                          <svg className="h-4 w-4 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                          </svg>
                                          {pro}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                {review.cons?.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900">Cons</h4>
                                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                      {review.cons.map((con: string, index: number) => (
                                        <li key={index} className="flex items-center">
                                          <svg className="h-4 w-4 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                          </svg>
                                          {con}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {review.useCase && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-900">Use Case</h4>
                                <p className="mt-1 text-sm text-gray-600">{review.useCase}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Pagination */}
                    {reviewsData && reviewsData.total > 5 && (
                      <div className="flex justify-center mt-8">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => setReviewPage(reviewPage - 1)}
                            disabled={reviewPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                              reviewPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          
                          {[...Array(Math.min(5, Math.ceil(reviewsData.total / 5)))].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                              <button
                                key={i}
                                onClick={() => setReviewPage(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  reviewPage === pageNum
                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          
                          <button
                            onClick={() => setReviewPage(reviewPage + 1)}
                            disabled={reviewPage >= Math.ceil(reviewsData.total / 5)}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                              reviewPage >= Math.ceil(reviewsData.total / 5) ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Alternatives Tab */}
            {activeTab === 'alternatives' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Alternative Tools</h2>
                
                {tool.alternatives?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tool.alternatives.map((alt: any) => (
                      <div key={alt.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-semibold text-gray-900">{alt.name}</h3>
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-600">{alt.rating?.toFixed(1) || "N/A"}</span>
                                <svg className="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                            </div>
                            <p className="mt-3 text-base text-gray-500 line-clamp-3">{alt.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {alt.categories?.slice(0, 3).map((category: string) => (
                                <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {category}
                                </span>
                              ))}
                            </div>
                            <div className="mt-4 flex items-center text-sm text-gray-500">
                              <span className="bg-gray-100 px-2 py-1 rounded-md">
                                {typeof alt.pricing === 'object' ? alt.pricing.type.charAt(0).toUpperCase() + alt.pricing.type.slice(1) : 'Free'}
                              </span>
                            </div>
                          </div>
                          <div className="mt-6 flex items-center justify-between">
                            <Link to={`/tools/${alt.id}`} className="text-base font-medium text-blue-600 hover:text-blue-500">
                              View Details
                            </Link>
                            <button 
                              onClick={() => alt.id && addTool(alt.id)}
                              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Compare
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900">No alternatives found</h3>
                    <p className="mt-2 text-gray-500">Try browsing similar tools in the same category.</p>
                    <Link 
                      to="/tools" 
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Browse All Tools
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ToolDetailPage;
