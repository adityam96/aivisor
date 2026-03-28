import React from 'react';

interface ToolComparisonProps {
  tools: {
    id: string;
    name: string;
    imageUrl?: string;
    description: string;
    rating: number;
    reviewCount: number;
    pricing: string;
    features: Record<string, boolean | string | number>;
    pros: string[];
    cons: string[];
  }[];
  onClose?: () => void;
  className?: string;
}

const ToolComparison: React.FC<ToolComparisonProps> = ({
  tools,
  onClose,
  className = '',
}) => {
  if (tools.length < 2) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 text-center ${className}`}>
        <p className="text-gray-600">Select at least two tools to compare.</p>
      </div>
    );
  }

  // Get all unique feature keys across all tools
  const allFeatureKeys = Array.from(
    new Set(tools.flatMap(tool => Object.keys(tool.features)))
  );

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Tool Comparison</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left text-gray-600 font-medium w-1/4">Feature</th>
              {tools.map(tool => (
                <th key={tool.id} className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    {tool.imageUrl ? (
                      <img 
                        src={tool.imageUrl} 
                        alt={tool.name} 
                        className="w-16 h-16 object-cover rounded-md mb-2"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <span className="font-bold text-gray-900">{tool.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Basic Info */}
            <tr className="border-t">
              <td className="p-4 font-medium text-gray-600">Rating</td>
              {tools.map(tool => (
                <td key={`${tool.id}-rating`} className="p-4 text-center">
                  <div className="flex justify-center">
                    <div className="flex">
                      {renderStars(tool.rating)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    ({tool.reviewCount} reviews)
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <td className="p-4 font-medium text-gray-600">Pricing</td>
              {tools.map(tool => (
                <td key={`${tool.id}-pricing`} className="p-4 text-center">
                  {tool.pricing}
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <td className="p-4 font-medium text-gray-600">Description</td>
              {tools.map(tool => (
                <td key={`${tool.id}-desc`} className="p-4 text-center">
                  <p className="text-sm">{tool.description}</p>
                </td>
              ))}
            </tr>

            {/* Features */}
            <tr className="border-t bg-gray-50">
              <td colSpan={tools.length + 1} className="p-4 font-bold text-gray-800">
                Features
              </td>
            </tr>
            {allFeatureKeys.map(featureKey => (
              <tr key={featureKey} className="border-t">
                <td className="p-4 font-medium text-gray-600 capitalize">
                  {featureKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </td>
                {tools.map(tool => {
                  const featureValue = tool.features[featureKey];
                  return (
                    <td key={`${tool.id}-${featureKey}`} className="p-4 text-center">
                      {typeof featureValue === 'boolean' ? (
                        featureValue ? (
                          <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )
                      ) : featureValue !== undefined ? (
                        String(featureValue)
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Pros & Cons */}
            <tr className="border-t bg-gray-50">
              <td colSpan={tools.length + 1} className="p-4 font-bold text-gray-800">
                Pros & Cons
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-4 font-medium text-gray-600">Pros</td>
              {tools.map(tool => (
                <td key={`${tool.id}-pros`} className="p-4">
                  <ul className="list-disc pl-5 text-sm">
                    {tool.pros.map((pro, index) => (
                      <li key={index} className="mb-1">{pro}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <td className="p-4 font-medium text-gray-600">Cons</td>
              {tools.map(tool => (
                <td key={`${tool.id}-cons`} className="p-4">
                  <ul className="list-disc pl-5 text-sm">
                    {tool.cons.map((con, index) => (
                      <li key={index} className="mb-1">{con}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToolComparison;
