import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Types
interface SurveyQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'checkbox' | 'rating' | 'text';
  options?: string[];
}

interface SurveyResponse {
  questionId: string;
  answer: string | string[] | number;
}

interface SurveyResult {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  url: string;
  matchPercentage: number;
}

// Hook for fetching survey questions
export const useSurveyQuestions = () => {
  return useQuery<SurveyQuestion[]>({
    queryKey: ['surveyQuestions'],
    queryFn: async () => {
      // In a real app, this would be an API call
      // return axios.get('/api/survey/questions');
      
      // Mock implementation
      return new Promise<SurveyQuestion[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 'q1',
              question: 'What is your primary use case for AI tools?',
              type: 'multiple_choice',
              options: [
                'Content Creation',
                'Data Analysis',
                'Programming Assistance',
                'Design',
                'Research',
                'Customer Support',
                'Other'
              ]
            },
            {
              id: 'q2',
              question: 'Which features are most important to you?',
              type: 'checkbox',
              options: [
                'Ease of use',
                'Accuracy',
                'Speed',
                'Integration capabilities',
                'Customization options',
                'Price',
                'Support'
              ]
            },
            {
              id: 'q3',
              question: 'What is your budget range?',
              type: 'multiple_choice',
              options: [
                'Free only',
                'Under $10/month',
                '$10-$50/month',
                '$50-$100/month',
                'Over $100/month'
              ]
            },
            {
              id: 'q4',
              question: 'How important is having a free trial?',
              type: 'rating',
              options: []
            },
            {
              id: 'q5',
              question: 'Any specific requirements or preferences?',
              type: 'text',
              options: []
            }
          ]);
        }, 500);
      });
    },
    staleTime: 60 * 60 * 1000 // 1 hour
  });
};

// Hook for submitting survey responses
export const useSurveySubmit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (responses: SurveyResponse[]) => {
      // In a real app, this would be an API call
      // return axios.post('/api/survey/submit', { responses });
      
      // Mock implementation
      return new Promise<SurveyResult[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              name: 'ContentMaster AI',
              description: 'Advanced AI tool for content creation with support for multiple formats and languages.',
              category: 'Content Creation',
              rating: 4.5,
              reviewCount: 128,
              url: '/tools/1',
              matchPercentage: 95
            },
            {
              id: '2',
              name: 'DataAnalyzer Pro',
              description: 'Powerful data analysis tool with visualization capabilities and machine learning features.',
              category: 'Data Analysis',
              rating: 4.2,
              reviewCount: 87,
              url: '/tools/2',
              matchPercentage: 88
            },
            {
              id: '3',
              name: 'CodeGenius',
              description: 'AI-powered coding assistant with support for multiple programming languages and frameworks.',
              category: 'Programming',
              rating: 4.7,
              reviewCount: 156,
              url: '/tools/3',
              matchPercentage: 82
            }
          ]);
        }, 1000);
      });
    }
  });
};

// Combined survey hook for convenience
export const useSurvey = () => {
  const surveyQuestions = useSurveyQuestions();
  const surveySubmit = useSurveySubmit();
  
  return {
    questions: surveyQuestions.data || [],
    isLoading: surveyQuestions.isLoading,
    isError: surveyQuestions.isError,
    error: surveyQuestions.error,
    submitSurvey: surveySubmit.mutateAsync,
    isSubmitting: surveySubmit.isPending,
    results: surveySubmit.data || [],
    isSuccess: surveySubmit.isSuccess
  };
};
