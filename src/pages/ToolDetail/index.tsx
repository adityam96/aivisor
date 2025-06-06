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
  sampleImages?: string[];
  [key: string]: any; // Allow any other properties
}

// Mobile-Optimized Tab Navigation Component
const TabNavigation: React.FC<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}> = ({ activeTab, setActiveTab }) => {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'features', label: 'Features', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { id: 'reviews', label: 'Reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { id: 'alternatives', label: 'Alternatives', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { id: 'howto', label: 'How to Use?', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'pricing', label: 'Pricing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'images', label: 'Images', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-tab-dropdown')) {
        setIsMobileDropdownOpen(false);
      }
    };

    if (isMobileDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileDropdownOpen]);

  return (
    <div className="border-b border-gray-200 mb-8">
      {/* Mobile Dropdown Navigation */}
      <div className="md:hidden mobile-tab-dropdown">
        <div className="relative">
          <button
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeTabData?.icon} />
              </svg>
              <span className="font-medium text-gray-900">{activeTabData?.label}</span>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isMobileDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileDropdownOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors touch-manipulation ${
                    activeTab === tab.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-500' : 'text-gray-700'
                  }`}
                >
                  <svg className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <svg className="w-4 h-4 ml-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Horizontal Navigation */}
      <nav className="hidden md:flex -mb-px space-x-6 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm flex items-center transition-colors`}
          >
            <svg className={`w-4 h-4 mr-1.5 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
            </svg>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

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

          {/* Mobile-Optimized Tool Header */}
          <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 mb-8 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                {/* Mobile: Stack logo and content vertically, Desktop: Side by side */}
                <div className="flex flex-col sm:flex-row sm:items-start">
                  {/* Tool Logo */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0 sm:mr-6 mb-4 sm:mb-0">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center border border-gray-200 shadow-sm">
                      {tool.logoUrl ? (
                        <img 
                          src={tool.logoUrl} 
                          alt={`${tool.name} logo`} 
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = "text-2xl sm:text-4xl font-bold text-blue-600 flex items-center justify-center h-full w-full";
                            fallback.textContent = tool.name.charAt(0);
                            target.parentElement?.appendChild(fallback);
                          }}
                        />
                      ) : (
                        <div className="text-2xl sm:text-4xl font-bold text-blue-600">
                          {tool.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Tool Info */}
                  <div className="text-center sm:text-left flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">{tool.name}</h1>
                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start">
                      <div className="flex items-center justify-center sm:justify-start">
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
                      <div className="flex items-center justify-center sm:justify-start mt-1 sm:mt-0 sm:ml-4">
                        <span className="text-gray-600">{tool.reviews || 0} reviews</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-gray-600 font-medium">
                          {typeof tool.pricing === 'object' ? tool.pricing.type.charAt(0).toUpperCase() + tool.pricing.type.slice(1) : 'Free'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Creator Link */}
                    {tool.creatorName && (
                      <div className="mt-3 flex items-center justify-center sm:justify-start">
                        <span className="text-gray-600">By </span>
                        <Link 
                          to={`/creators/${tool.creatorId || 'unknown'}`} 
                          className="ml-1 text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center"
                        >
                          {tool.creatorName}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </div>
                    )}
                    
                    {/* Categories */}
                    <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
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
              </div>
              
              {/* Sample Images and Action Buttons - Mobile: Full width, Desktop: Sidebar */}
              <div className="w-full lg:w-1/3 xl:w-1/4 mt-6 lg:mt-0 flex flex-col gap-3">
                {/* Sample Images Preview */}
                {tool.sampleImages && tool.sampleImages.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                              <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-gray-500 mt-1">No images</p>
                  </div>
                )}
                
                {/* Mobile-Optimized Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <a 
                    href={tool.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors touch-manipulation"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Website
                  </a>
                  <button 
                    onClick={toggleComparison}
                    className={`flex-1 inline-flex items-center justify-center px-6 py-3 border rounded-lg shadow-sm text-base font-medium transition-colors touch-manipulation ${
                      isInComparison 
                        ? 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {isInComparison ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="hidden sm:inline lg:hidden xl:inline">Remove from Comparison</span>
                        <span className="sm:hidden lg:inline xl:hidden">Remove</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="hidden sm:inline lg:hidden xl:inline">Add to Comparison</span>
                        <span className="sm:hidden lg:inline xl:hidden">Compare</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tags Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {tool.tags && tool.tags.length > 0 ? (
                  tool.tags.map((tag: string, index: number) => (
                    <Link 
                      key={index}
                      to={`/tools?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition-colors flex items-center group touch-manipulation min-h-[44px] justify-center"
                      title={`Find tools tagged with "${tag}"`}
                    >
                      <svg className="w-3.5 h-3.5 mr-1.5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {tag}
                    </Link>
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300 w-full">
                    <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <p className="text-gray-500 mt-2">No tags available for this tool.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Use Case Tags Sections */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              {/* Best Known For Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-full text-sm font-medium transition-colors flex items-center shadow-sm hover:shadow touch-manipulation min-h-[44px]"
                        title={`Find tools that excel at "${useCase}"`}
                      >
                        <svg className="w-4 h-4 mr-1.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {useCase}
                      </Link>
                    ))
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300 w-full">
                      <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-full text-sm font-medium flex items-center shadow-sm group touch-manipulation min-h-[44px]"
                        title={`This tool is not recommended for "${limitation}"`}
                      >
                        <svg className="w-4 h-4 mr-1.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {limitation}
                      </div>
                    ))
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300 w-full">
                      <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500 mt-2">No specific limitations highlighted for this tool.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-Optimized Tab Navigation */}
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab Content */}
          <div className="mb-12">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About {tool.name}
                </h2>
                
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {tool.longDescription || tool.description}
                  </p>
                  
                  {tool.longDescription && tool.longDescription !== tool.description && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">What is {tool.name}?</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {tool.name} is an AI-powered tool designed to help users with various tasks related to AI assistance. It provides a range of features to enhance productivity and streamline workflows.
                      </p>
                    </div>
                  )}
                  
                  {tool.useCases && tool.useCases.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Use Cases</h3>
                      <ul className="space-y-2">
                        {tool.useCases.map((useCase: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {tool.pricingDetails && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Pricing</h3>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <p className="text-gray-700">{tool.pricingDetails}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  {tool.name} Features
                </h2>
                
                {tool.features && tool.features.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {tool.features.map((feature: any, index: number) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">
                              {typeof feature === 'string' ? feature : feature.name || `Feature ${index + 1}`}
                            </h3>
                            {typeof feature === 'object' && feature.description && (
                              <p className="mt-2 text-gray-600">{feature.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-12 text-center border border-dashed border-gray-300">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mt-4">No features listed</h3>
                    <p className="text-gray-500 mt-2">Feature information is not available for this tool.</p>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Reviews & Ratings
                </h2>
                
                <div className="bg-gray-50 rounded-lg p-12 text-center border border-dashed border-gray-300">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mt-4">No reviews yet</h3>
                  <p className="text-gray-500 mt-2">Be the first to review this tool and help others make informed decisions.</p>
                </div>
              </div>
            )}

            {/* Alternatives Tab */}
            {activeTab === 'alternatives' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Alternative Tools
                </h2>
                
                <div className="bg-gray-50 rounded-lg p-12 text-center border border-dashed border-gray-300">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mt-4">No alternatives listed</h3>
                  <p className="text-gray-500 mt-2">Alternative tools information is not available yet.</p>
                </div>
              </div>
            )}

            {/* How to Use Tab */}
            {activeTab === 'howto' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How to Use {tool.name}
                </h2>
                
                <div className="bg-gray-50 rounded-lg p-12 text-center border border-dashed border-gray-300">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mt-4">Usage guide coming soon</h3>
                  <p className="text-gray-500 mt-2">Detailed usage instructions will be available soon.</p>
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pricing Information
                </h2>
                
                <div className="bg-white border border-gray-200 rounded-lg p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {typeof tool.pricing === 'object' ? tool.pricing.type.charAt(0).toUpperCase() + tool.pricing.type.slice(1) : 'Subscription'}
                    </h3>
                    <p className="mt-4 text-gray-600">
                      {tool.pricingDetails || "Contact the provider for detailed pricing information."}
                    </p>
                    <div className="mt-8">
                      <a 
                        href={tool.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        Get Pricing Details
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mt-4">No images available</h3>
                    <p className="text-gray-500 mt-2">Screenshots and examples are not available for this tool yet.</p>
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

