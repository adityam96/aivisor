import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Types
interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  pricing: {
    type: 'free' | 'freemium' | 'paid' | 'subscription';
    startingPrice?: number;
    pricingDetails?: string;
  };
  rating: number;
  reviewCount: number;
  url: string;
  logoUrl?: string;
  creatorId: string;
  creatorName: string;
  maturityVersion: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  notGoodFor: string[];
  tags: string[];
  featured: boolean;
}

// Define the return type for the tools query
interface ToolsResponse {
  tools: Tool[];
  total: number;
}

// Hook for fetching all tools
export const useAllTools = (filters?: {
  category?: string;
  search?: string;
  priceType?: 'free' | 'freemium' | 'paid' | 'subscription';
  minRating?: number;
  featured?: boolean;
  limit?: number;
}) => {
  return useQuery<ToolsResponse, Error>({
    queryKey: ['tools', filters],
    queryFn: async () => {
      // In a real app, this would be an API call with query params
      // return axios.get('/api/tools', { params: filters });
      
      // Mock implementation
      return new Promise<ToolsResponse>((resolve) => {
        setTimeout(() => {
          let mockTools: Tool[] = [
            {
              id: '1',
              name: 'ContentMaster AI',
              description: 'Advanced AI tool for content creation with support for multiple formats and languages.',
              category: 'Content Creation',
              features: [
                'Multi-language support',
                'Blog post generation',
                'Social media content',
                'Email templates',
                'SEO optimization'
              ],
              pricing: {
                type: 'subscription' as 'free' | 'freemium' | 'paid' | 'subscription',
                startingPrice: 29.99,
                pricingDetails: 'Monthly subscription with 14-day free trial'
              },
              rating: 4.5,
              reviewCount: 128,
              url: 'https://contentmaster.ai',
              logoUrl: '/logos/contentmaster.png',
              creatorId: 'creator1',
              creatorName: 'ContentMaster Inc.',
              maturityVersion: '3.5',
              pros: [
                'Excellent multi-language support',
                'High-quality content generation',
                'User-friendly interface',
                'Regular updates with new features'
              ],
              cons: [
                'Higher price point than competitors',
                'Limited customization options',
                'Occasional server downtime'
              ],
              bestFor: [
                'Content marketers',
                'Bloggers',
                'Social media managers',
                'Email marketers'
              ],
              notGoodFor: [
                'Technical writing',
                'Academic research',
                'Legal document creation'
              ],
              tags: ['content', 'writing', 'blog', 'social media', 'email'],
              featured: true
            },
            {
              id: '2',
              name: 'DataAnalyzer Pro',
              description: 'Powerful data analysis tool with visualization capabilities and machine learning features.',
              category: 'Data Analysis',
              features: [
                'Data visualization',
                'Predictive analytics',
                'Automated reporting',
                'Integration with major data sources',
                'Custom dashboards'
              ],
              pricing: {
                type: 'freemium' as 'free' | 'freemium' | 'paid' | 'subscription',
                startingPrice: 49.99,
                pricingDetails: 'Free tier with limited features, paid plans start at $49.99/month'
              },
              rating: 4.2,
              reviewCount: 87,
              url: 'https://dataanalyzer.pro',
              logoUrl: '/logos/dataanalyzer.png',
              creatorId: 'creator2',
              creatorName: 'DataTech Solutions',
              maturityVersion: '2.8',
              pros: [
                'Comprehensive data visualization options',
                'Strong integration capabilities',
                'Intuitive dashboard creation',
                'Excellent customer support'
              ],
              cons: [
                'Steep learning curve',
                'Performance issues with very large datasets',
                'Limited export options'
              ],
              bestFor: [
                'Data analysts',
                'Business intelligence teams',
                'Marketing analysts',
                'Research organizations'
              ],
              notGoodFor: [
                'Simple data needs',
                'Users without technical background',
                'Real-time data processing'
              ],
              tags: ['data', 'analytics', 'visualization', 'reporting', 'machine learning'],
              featured: false
            },
            {
              id: '3',
              name: 'CodeGenius',
              description: 'AI-powered coding assistant with support for multiple programming languages and frameworks.',
              category: 'Development',
              features: [
                'Code completion',
                'Bug detection',
                'Refactoring suggestions',
                'Documentation generation',
                'Integration with major IDEs'
              ],
              pricing: {
                type: 'subscription' as 'free' | 'freemium' | 'paid' | 'subscription',
                startingPrice: 19.99,
                pricingDetails: 'Monthly subscription with team discounts available'
              },
              rating: 4.7,
              reviewCount: 156,
              url: 'https://codegenius.dev',
              logoUrl: '/logos/codegenius.png',
              creatorId: 'creator3',
              creatorName: 'DevTools AI',
              maturityVersion: '4.2',
              pros: [
                'Excellent code suggestions',
                'Support for multiple languages',
                'Seamless IDE integration',
                'Regular updates with new features'
              ],
              cons: [
                'Occasional false positives in bug detection',
                'High resource usage',
                'Limited support for niche languages'
              ],
              bestFor: [
                'Software developers',
                'Web developers',
                'DevOps engineers',
                'Technical leads'
              ],
              notGoodFor: [
                'Non-technical users',
                'Very specialized programming languages',
                'Low-resource environments'
              ],
              tags: ['coding', 'development', 'programming', 'IDE', 'software'],
              featured: true
            },
            {
              id: '4',
              name: 'DesignMind',
              description: 'Creative design tool powered by AI for generating and editing visual content.',
              category: 'Design',
              features: [
                'AI image generation',
                'Logo creation',
                'Design templates',
                'Photo editing',
                'Brand kit management'
              ],
              pricing: {
                type: 'freemium' as 'free' | 'freemium' | 'paid' | 'subscription',
                startingPrice: 24.99,
                pricingDetails: 'Free tier with limited generations, paid plans with more features'
              },
              rating: 4.4,
              reviewCount: 92,
              url: 'https://designmind.ai',
              logoUrl: '/logos/designmind.png',
              creatorId: 'creator4',
              creatorName: 'Creative AI Labs',
              maturityVersion: '2.5',
              pros: [
                'High-quality image generation',
                'Intuitive interface',
                'Extensive template library',
                'Good export options'
              ],
              cons: [
                'Limited customization for generated images',
                'Slow rendering for complex designs',
                'Inconsistent style matching'
              ],
              bestFor: [
                'Graphic designers',
                'Marketing teams',
                'Social media managers',
                'Small business owners'
              ],
              notGoodFor: [
                'Professional photography editing',
                'Complex illustration work',
                'Print production'
              ],
              tags: ['design', 'graphics', 'images', 'creative', 'visual'],
              featured: false
            },
            {
              id: '5',
              name: 'ResearchAssist',
              description: 'AI research assistant for academic and professional research with advanced search and summarization.',
              category: 'Research',
              features: [
                'Literature search',
                'Paper summarization',
                'Citation management',
                'Research trend analysis',
                'Collaboration tools'
              ],
              pricing: {
                type: 'subscription' as 'free' | 'freemium' | 'paid' | 'subscription',
                startingPrice: 15.99,
                pricingDetails: 'Monthly subscription with academic discounts'
              },
              rating: 4.3,
              reviewCount: 76,
              url: 'https://researchassist.io',
              logoUrl: '/logos/researchassist.png',
              creatorId: 'creator5',
              creatorName: 'Academic AI',
              maturityVersion: '3.0',
              pros: [
                'Comprehensive literature search',
                'Accurate summarization',
                'Easy citation management',
                'Good collaboration features'
              ],
              cons: [
                'Limited access to some journals',
                'Summarization quality varies by field',
                'Occasional search indexing delays'
              ],
              bestFor: [
                'Academic researchers',
                'PhD students',
                'R&D professionals',
                'Market researchers'
              ],
              notGoodFor: [
                'Basic information searches',
                'Creative writing',
                'Non-research content creation'
              ],
              tags: ['research', 'academic', 'papers', 'citations', 'literature'],
              featured: false
            }
          ];
          
          // Apply filters
          if (filters) {
            if (filters.category) {
              mockTools = mockTools.filter(tool => tool.category === filters.category);
            }
            
            if (filters.search) {
              const searchLower = filters.search.toLowerCase();
              mockTools = mockTools.filter(tool => 
                tool.name.toLowerCase().includes(searchLower) || 
                tool.description.toLowerCase().includes(searchLower) ||
                tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
              );
            }
            
            if (filters.priceType) {
              mockTools = mockTools.filter(tool => tool.pricing.type === filters.priceType);
            }
            
            if (filters.minRating) {
              mockTools = mockTools.filter(tool => tool.rating >= filters.minRating);
            }
            
            if (filters.featured !== undefined) {
              mockTools = mockTools.filter(tool => tool.featured === filters.featured);
            }
            
            if (filters.limit) {
              mockTools = mockTools.slice(0, filters.limit);
            }
          }
          
          resolve({
            tools: mockTools,
            total: mockTools.length
          });
        }, 500);
      });
    }
  });
};

// Hook for fetching a single tool by ID
export const useTool = (id: string) => {
  return useQuery<Tool | null, Error>({
    queryKey: ['tool', id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      
      // In a real app, this would be an API call
      // return axios.get(`/api/tools/${id}`);
      
      // Mock implementation
      return new Promise<Tool | null>((resolve) => {
        setTimeout(() => {
          const mockTools: Tool[] = [
            {
              id: '1',
              name: 'ContentMaster AI',
              description: 'Advanced AI tool for content creation with support for multiple formats and languages.',
              category: 'Content Creation',
              features: [
                'Multi-language support',
                'Blog post generation',
                'Social media content',
                'Email templates',
                'SEO optimization'
              ],
              pricing: {
                type: 'subscription' as 'free' | 'freemium' | 'paid' | 'subscription',
                startingPrice: 29.99,
                pricingDetails: 'Monthly subscription with 14-day free trial'
              },
              rating: 4.5,
              reviewCount: 128,
              url: 'https://contentmaster.ai',
              logoUrl: '/logos/contentmaster.png',
              creatorId: 'creator1',
              creatorName: 'ContentMaster Inc.',
              maturityVersion: '3.5',
              pros: [
                'Excellent multi-language support',
                'High-quality content generation',
                'User-friendly interface',
                'Regular updates with new features'
              ],
              cons: [
                'Higher price point than competitors',
                'Limited customization options',
                'Occasional server downtime'
              ],
              bestFor: [
                'Content marketers',
                'Bloggers',
                'Social media managers',
                'Email marketers'
              ],
              notGoodFor: [
                'Technical writing',
                'Academic research',
                'Legal document creation'
              ],
              tags: ['content', 'writing', 'blog', 'social media', 'email'],
              featured: true
            },
            // ... other tools
          ];
          
          const tool = mockTools.find(t => t.id === id) || null;
          resolve(tool);
        }, 500);
      });
    },
    enabled: !!id
  });
};

// Hook for fetching free tools
export const useFreeTools = (limit?: number) => {
  return useAllTools({ priceType: 'free', limit });
};

// Hook for fetching featured tools
export const useFeaturedTools = (limit?: number) => {
  return useAllTools({ featured: true, limit });
};

// Hook for fetching new tools
export const useNewTools = (limit?: number) => {
  // In a real app, we would have a createdAt field to sort by
  return useAllTools({ limit });
};

// Hook for comparing tools
export const useToolComparison = (toolIds: string[]) => {
  return useQuery<Tool[], Error>({
    queryKey: ['toolComparison', toolIds],
    queryFn: async () => {
      if (!toolIds.length) {
        return [];
      }
      
      // In a real app, this would be an API call
      // return axios.get('/api/tools/compare', { params: { ids: toolIds.join(',') } });
      
      // Mock implementation - reuse the single tool fetch logic
      const promises = toolIds.map(id => 
        new Promise<Tool | null>((resolve) => {
          // Reuse the logic from useTool but with a shorter timeout
          setTimeout(() => {
            const mockTools = [
              {
                id: '1',
                name: 'ContentMaster AI',
                description: 'Advanced AI tool for content creation with support for multiple formats and languages.',
                category: 'Content Creation',
                features: [
                  'Multi-language support',
                  'Blog post generation',
                  'Social media content',
                  'Email templates',
                  'SEO optimization'
                ],
                pricing: {
                  type: 'subscription' as 'free' | 'freemium' | 'paid' | 'subscription',
                  startingPrice: 29.99,
                  pricingDetails: 'Monthly subscription with 14-day free trial'
                },
                rating: 4.5,
                reviewCount: 128,
                url: 'https://contentmaster.ai',
                logoUrl: '/logos/contentmaster.png',
                creatorId: 'creator1',
                creatorName: 'ContentMaster Inc.',
                maturityVersion: '3.5',
                pros: [
                  'Excellent multi-language support',
                  'High-quality content generation',
                  'User-friendly interface',
                  'Regular updates with new features'
                ],
                cons: [
                  'Higher price point than competitors',
                  'Limited customization options',
                  'Occasional server downtime'
                ],
                bestFor: [
                  'Content marketers',
                  'Bloggers',
                  'Social media managers',
                  'Email marketers'
                ],
                notGoodFor: [
                  'Technical writing',
                  'Academic research',
                  'Legal document creation'
                ],
                tags: ['content', 'writing', 'blog', 'social media', 'email'],
                featured: true
              },
              {
                id: '2',
                name: 'DataAnalyzer Pro',
                description: 'Powerful data analysis tool with visualization capabilities and machine learning features.',
                category: 'Data Analysis',
                features: [
                  'Data visualization',
                  'Predictive analytics',
                  'Automated reporting',
                  'Integration with major data sources',
                  'Custom dashboards'
                ],
                pricing: {
                  type: 'freemium' as 'free' | 'freemium' | 'paid' | 'subscription',
                  startingPrice: 49.99,
                  pricingDetails: 'Free tier with limited features, paid plans start at $49.99/month'
                },
                rating: 4.2,
                reviewCount: 87,
                url: 'https://dataanalyzer.pro',
                logoUrl: '/logos/dataanalyzer.png',
                creatorId: 'creator2',
                creatorName: 'DataTech Solutions',
                maturityVersion: '2.8',
                pros: [
                  'Comprehensive data visualization options',
                  'Strong integration capabilities',
                  'Intuitive dashboard creation',
                  'Excellent customer support'
                ],
                cons: [
                  'Steep learning curve',
                  'Performance issues with very large datasets',
                  'Limited export options'
                ],
                bestFor: [
                  'Data analysts',
                  'Business intelligence teams',
                  'Marketing analysts',
                  'Research organizations'
                ],
                notGoodFor: [
                  'Simple data needs',
                  'Users without technical background',
                  'Real-time data processing'
                ],
                tags: ['data', 'analytics', 'visualization', 'reporting', 'machine learning'],
                featured: false
              },
              // ... other tools
            ];
            
            const tool = mockTools.find(t => t.id === id) || null;
            resolve(tool);
          }, 300);
        })
      );
      
      const results = await Promise.all(promises);
      return results.filter((tool): tool is Tool => tool !== null);
    },
    enabled: toolIds.length > 0
  });
};

// Combined tools hook for convenience
export const useTools = (options?: {
  category?: string;
  search?: string;
  priceType?: 'free' | 'freemium' | 'paid' | 'subscription';
  minRating?: number;
  featured?: boolean;
  limit?: number;
}) => {
  const allTools = useAllTools(options);
  
  return {
    data: allTools.data || [],
    isLoading: allTools.isLoading,
    isError: allTools.isError,
    error: allTools.error,
    getTool: useTool,
    getFreeTools: useFreeTools,
    getFeaturedTools: useFeaturedTools,
    getNewTools: useNewTools,
    compareTools: useToolComparison
  };
};
