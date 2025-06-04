import React, { useState } from 'react';

interface SurveyFormProps {
  questions: {
    id: string;
    question: string;
    type: 'single' | 'multiple' | 'rating' | 'text';
    options?: { id: string; text: string }[];
  }[];
  onSubmit: (answers: Record<string, any>) => void;
  isLoading?: boolean;
  className?: string;
}

const SurveyForm: React.FC<SurveyFormProps> = ({
  questions,
  onSubmit,
  isLoading = false,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(answers);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };
  
  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;
  const isAnswered = answers[currentQuestion.id] !== undefined && 
    (currentQuestion.type !== 'text' || answers[currentQuestion.id].trim() !== '');
  
  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case 'single':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="radio"
                  id={option.id}
                  name={currentQuestion.id}
                  value={option.id}
                  checked={answers[currentQuestion.id] === option.id}
                  onChange={() => handleAnswerChange(currentQuestion.id, option.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={option.id} className="ml-3 block text-gray-700">
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        );
        
      case 'multiple':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => {
              const selectedOptions = answers[currentQuestion.id] || [];
              const isChecked = selectedOptions.includes(option.id);
              
              return (
                <div key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option.id}
                    name={currentQuestion.id}
                    value={option.id}
                    checked={isChecked}
                    onChange={() => {
                      const newSelectedOptions = isChecked
                        ? selectedOptions.filter((id: string) => id !== option.id)
                        : [...selectedOptions, option.id];
                      
                      handleAnswerChange(currentQuestion.id, newSelectedOptions);
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={option.id} className="ml-3 block text-gray-700">
                    {option.text}
                  </label>
                </div>
              );
            })}
          </div>
        );
        
      case 'rating':
        return (
          <div className="flex justify-center space-x-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleAnswerChange(currentQuestion.id, rating)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium
                  ${answers[currentQuestion.id] === rating
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {rating}
              </button>
            ))}
          </div>
        );
        
      case 'text':
        return (
          <textarea
            id={currentQuestion.id}
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your answer here..."
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-500 text-right">
          Question {currentStep + 1} of {questions.length}
        </div>
      </div>
      
      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
        {renderQuestionContent()}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded-md ${
            currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        <button
          type="button"
          onClick={handleNext}
          disabled={!isAnswered || isLoading}
          className={`px-4 py-2 rounded-md ${
            !isAnswered || isLoading
              ? 'bg-blue-300 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : isLastQuestion ? (
            'Submit'
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );
};

export default SurveyForm;
