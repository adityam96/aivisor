import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useSurvey } from '../../hooks/useSurvey';

// Align with the hook's question type
interface SurveyQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'checkbox' | 'rating' | 'text';
  options?: string[];
  required: boolean;
}

const SurveyPage: React.FC = () => {
  const navigate = useNavigate();
  const { submitSurvey, isLoading } = useSurvey();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Sample survey questions
  const surveyQuestions: SurveyQuestion[] = [
    {
      id: 'purpose',
      question: 'What do you primarily need an AI tool for?',
      type: 'multiple_choice',
      options: [
        'Content Creation',
        'Data Analysis',
        'Customer Support',
        'Code Generation',
        'Image Generation',
        'Research',
        'Productivity',
        'Other'
      ],
      required: true
    },
    {
      id: 'experience',
      question: 'What is your experience level with AI tools?',
      type: 'multiple_choice',
      options: [
        'Beginner - Never used AI tools before',
        'Intermediate - Used a few AI tools',
        'Advanced - Regular user of AI tools',
        'Expert - Professional working with AI'
      ],
      required: true
    },
    {
      id: 'features',
      question: 'Which features are most important to you? (Select up to 3)',
      type: 'checkbox',
      options: [
        'Ease of use',
        'Advanced capabilities',
        'Integration with other tools',
        'Customization options',
        'Speed and performance',
        'Data privacy',
        'Customer support',
        'Price'
      ],
      required: true
    },
    {
      id: 'budget',
      question: 'What is your budget for AI tools?',
      type: 'multiple_choice',
      options: [
        'Free only',
        'Up to $10/month',
        '$10-50/month',
        '$50-100/month',
        'Over $100/month',
        'Enterprise budget'
      ],
      required: true
    },
    {
      id: 'platform',
      question: 'Which platforms do you need the AI tool to work on?',
      type: 'checkbox',
      options: [
        'Web browser',
        'Windows desktop',
        'Mac desktop',
        'Linux desktop',
        'iOS mobile',
        'Android mobile',
        'API access'
      ],
      required: true
    },
    {
      id: 'importance',
      question: 'How important is AI in your workflow?',
      type: 'rating',
      required: true
    },
    {
      id: 'specific_needs',
      question: 'Do you have any specific requirements or needs for an AI tool?',
      type: 'text',
      required: false
    }
  ];

  const handleSingleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleMultipleSelect = (questionId: string, value: string) => {
    setAnswers(prev => {
      const currentValues = prev[questionId] || [];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [questionId]: currentValues.filter((v: string) => v !== value)
        };
      } else {
        return {
          ...prev,
          [questionId]: [...currentValues, value]
        };
      }
    });
  };

  const handleScaleSelect = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleTextInput = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const isQuestionAnswered = (question: SurveyQuestion) => {
    if (!question.required) return true;
    
    const answer = answers[question.id];
    if (answer === undefined) return false;
    
    if (question.type === 'checkbox') {
      return Array.isArray(answer) && answer.length > 0;
    }
    
    if (question.type === 'text') {
      return answer.trim() !== '';
    }
    
    return answer !== undefined;
  };

  const canProceed = () => {
    const currentQuestion = surveyQuestions[currentStep];
    return isQuestionAnswered(currentQuestion);
  };

  const handleNext = () => {
    if (currentStep < surveyQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    try {
      // Type assertion to allow the function to be called with the expected parameters
      const submitSurveyFn = submitSurvey as unknown as (answers: Record<string, any>) => Promise<any>;
      const results = await submitSurveyFn(answers);
      navigate('/survey/results', { state: { results } });
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  const renderQuestion = (question: SurveyQuestion) => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-4">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  id={`${question.id}-${option}`}
                  name={question.id}
                  type="radio"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={answers[question.id] === option}
                  onChange={() => handleSingleSelect(question.id, option)}
                />
                <label htmlFor={`${question.id}-${option}`} className="ml-3 block text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-4">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  id={`${question.id}-${option}`}
                  name={question.id}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={(answers[question.id] || []).includes(option)}
                  onChange={() => handleMultipleSelect(question.id, option)}
                />
                <label htmlFor={`${question.id}-${option}`} className="ml-3 block text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      
      case 'rating':
        return (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Not important</span>
              <span>Very important</span>
            </div>
            <div className="flex justify-between space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleScaleSelect(question.id, value)}
                  className={`flex-1 py-2 rounded-md ${
                    answers[question.id] === value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="mt-4">
            <textarea
              id={question.id}
              name={question.id}
              rows={4}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Type your answer here..."
              value={answers[question.id] || ''}
              onChange={(e) => handleTextInput(question.id, e.target.value)}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  const currentQuestion = surveyQuestions[currentStep];

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect AI Tool</h1>
            <p className="mt-4 text-lg text-gray-600">
              Answer a few questions to get personalized AI tool recommendations
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Start</span>
              <span>Finish</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / surveyQuestions.length) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600 text-center">
              Question {currentStep + 1} of {surveyQuestions.length}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
              {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
            </h2>
            
            {renderQuestion(currentQuestion)}
            
            {currentQuestion.required && (
              <p className="mt-2 text-sm text-gray-500">* Required question</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
              }`}
            >
              Previous
            </button>
            
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                canProceed() && !isLoading
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-300 text-white cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : currentStep === surveyQuestions.length - 1 ? (
                'Submit'
              ) : (
                'Next'
              )}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SurveyPage;
