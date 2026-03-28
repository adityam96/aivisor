import React, { useState } from 'react';

interface ReviewFormProps {
  toolId: string;
  toolName: string;
  onSubmit: (data: {
    rating: number;
    title: string;
    content: string;
    pros: string[];
    cons: string[];
    useCase: string;
  }) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  toolId,
  toolName,
  onSubmit,
  isLoading = false,
  error,
  className = '',
}) => {
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [pros, setPros] = useState<string[]>(['']);
  const [cons, setCons] = useState<string[]>(['']);
  const [useCase, setUseCase] = useState<string>('');
  
  const handleAddPro = () => {
    setPros([...pros, '']);
  };
  
  const handleAddCon = () => {
    setCons([...cons, '']);
  };
  
  const handleProChange = (index: number, value: string) => {
    const newPros = [...pros];
    newPros[index] = value;
    setPros(newPros);
  };
  
  const handleConChange = (index: number, value: string) => {
    const newCons = [...cons];
    newCons[index] = value;
    setCons(newCons);
  };
  
  const handleRemovePro = (index: number) => {
    const newPros = [...pros];
    newPros.splice(index, 1);
    setPros(newPros);
  };
  
  const handleRemoveCon = (index: number) => {
    const newCons = [...cons];
    newCons.splice(index, 1);
    setCons(newCons);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty pros and cons
    const filteredPros = pros.filter(pro => pro.trim() !== '');
    const filteredCons = cons.filter(con => con.trim() !== '');
    
    onSubmit({
      rating,
      title,
      content,
      pros: filteredPros,
      cons: filteredCons,
      useCase,
    });
  };
  
  const isFormValid = rating > 0 && title.trim() !== '' && content.trim() !== '';
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-2">Write a Review</h2>
      <p className="text-gray-600 mb-6">Share your experience with {toolName}</p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none mr-1"
              >
                {star <= rating ? (
                  <span className="text-yellow-400">★</span>
                ) : (
                  <span className="text-gray-300">★</span>
                )}
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating > 0 ? `${rating} out of 5 stars` : 'Select a rating'}
            </span>
          </div>
        </div>
        
        {/* Review Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Review Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Summarize your experience"
            maxLength={100}
            required
          />
        </div>
        
        {/* Review Content */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Review Details
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience with this AI tool. What did you like or dislike? How did it help you?"
            required
          />
        </div>
        
        {/* Pros */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pros
          </label>
          {pros.map((pro, index) => (
            <div key={`pro-${index}`} className="flex items-center mb-2">
              <input
                type="text"
                value={pro}
                onChange={(e) => handleProChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a pro"
              />
              {pros.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePro(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPro}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Another Pro
          </button>
        </div>
        
        {/* Cons */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cons
          </label>
          {cons.map((con, index) => (
            <div key={`con-${index}`} className="flex items-center mb-2">
              <input
                type="text"
                value={con}
                onChange={(e) => handleConChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a con"
              />
              {cons.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCon(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCon}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Another Con
          </button>
        </div>
        
        {/* Use Case */}
        <div className="mb-6">
          <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-1">
            What did you use this tool for?
          </label>
          <input
            id="useCase"
            type="text"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Content creation, Image generation, etc."
          />
        </div>
        
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium 
            ${!isFormValid || isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
