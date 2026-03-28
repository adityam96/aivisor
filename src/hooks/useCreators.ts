import { useQuery } from '@tanstack/react-query';

interface Creator {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  toolCount: number;
  industries: string[];
  tags: string[];
  yearFounded: number;
  rating: number;
  reviewCount: number;
  website: string;
}

interface CreatorsParams {
  limit?: number;
  industry?: string;
  search?: string;
  sort?: string;
  minYears?: number;
  minRating?: number;
  tag?: string;
}

// Mock data for creators
const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'OpenAI',
    logoUrl: '/creator-logos/openai_logo.png',
    description: 'Leading provider of AI solutions for businesses of all sizes. Specializing in natural language processing and computer vision.',
    toolCount: 12,
    industries: ['Healthcare', 'Finance', 'Education'],
    tags: ['NLP', 'Computer Vision', 'Enterprise'],
    yearFounded: 2015,
    rating: 4.7,
    reviewCount: 128,
    website: 'https://openai.com'
  },
  {
    id: '2',
    name: 'Anthropic',
    logoUrl: '/creator-logos/anthropic_logo.png',
    description: 'Cutting-edge neural network solutions for complex data analysis and prediction tasks with a focus on AI safety.',
    toolCount: 8,
    industries: ['Research', 'Manufacturing', 'Retail'],
    tags: ['Deep Learning', 'Predictive Analytics', 'Data Science'],
    yearFounded: 2021,
    rating: 4.5,
    reviewCount: 87,
    website: 'https://anthropic.com'
  },
  {
    id: '3',
    name: 'Google AI',
    logoUrl: '/creator-logos/google_logo.png',
    description: 'Building intelligent systems that understand, learn, and adapt to user needs across Google products and services.',
    toolCount: 15,
    industries: ['Healthcare', 'Customer Service', 'Marketing'],
    tags: ['Conversational AI', 'Machine Learning', 'Automation'],
    yearFounded: 2016,
    rating: 4.8,
    reviewCount: 203,
    website: 'https://ai.google'
  },
  {
    id: '4',
    name: 'Microsoft AI',
    logoUrl: '/creator-logos/microsoft_logo.png',
    description: 'Transforming data into actionable insights through advanced AI algorithms and cloud-based solutions.',
    toolCount: 6,
    industries: ['Finance', 'Insurance', 'Real Estate'],
    tags: ['Data Analytics', 'Risk Assessment', 'Financial AI'],
    yearFounded: 2019,
    rating: 4.3,
    reviewCount: 65,
    website: 'https://microsoft.com/ai'
  },
  {
    id: '5',
    name: 'Meta AI',
    logoUrl: '/creator-logos/meta_logo.png',
    description: 'Pioneering AI approaches to solve complex challenges in social media, virtual reality, and digital communication.',
    toolCount: 4,
    industries: ['Research', 'Social Media', 'Entertainment'],
    tags: ['Computer Vision', 'Advanced Research', 'Social Computing'],
    yearFounded: 2018,
    rating: 4.6,
    reviewCount: 42,
    website: 'https://ai.meta.com'
  },
  {
    id: '6',
    name: 'Cohere AI',
    logoUrl: '/creator-logos/cohere_logo.png',
    description: 'AI tools for natural language understanding, including text generation, classification, and semantic search.',
    toolCount: 10,
    industries: ['Media', 'Entertainment', 'Advertising'],
    tags: ['NLP', 'Content Generation', 'Enterprise'],
    yearFounded: 2019,
    rating: 4.9,
    reviewCount: 156,
    website: 'https://cohere.ai'
  },
  {
    id: '7',
    name: 'Stability AI',
    logoUrl: '/creator-logos/stability_logo.png',
    description: 'Personalized image generation experiences powered by adaptive AI technology.',
    toolCount: 7,
    industries: ['Education', 'Design', 'Media'],
    tags: ['Image Generation', 'Creative AI', 'Open Source'],
    yearFounded: 2020,
    rating: 4.4,
    reviewCount: 98,
    website: 'https://stability.ai'
  },
  {
    id: '8',
    name: 'HealthTech AI',
    logoUrl: '/creator-logos/microsoft_logo.png',
    description: 'AI-powered diagnostic and treatment planning tools for healthcare professionals.',
    toolCount: 9,
    industries: ['Healthcare', 'Pharmaceuticals', 'Biotechnology'],
    tags: ['Medical AI', 'Diagnostics', 'Patient Care'],
    yearFounded: 2015,
    rating: 4.7,
    reviewCount: 175,
    website: 'https://example.com/healthtech-ai'
  },
  {
    id: '9',
    name: 'Sustainable AI',
    logoUrl: '/creator-logos/google_logo.png',
    description: 'AI solutions focused on environmental sustainability and resource optimization.',
    toolCount: 5,
    industries: ['Energy', 'Agriculture', 'Environmental'],
    tags: ['Green AI', 'Sustainability', 'Resource Optimization'],
    yearFounded: 2019,
    rating: 4.5,
    reviewCount: 62,
    website: 'https://example.com/sustainable-ai'
  }
];

// Function to filter and sort creators based on params
const filterCreators = (params: CreatorsParams) => {
  let filtered = [...mockCreators];
  
  // Apply industry filter
  if (params.industry) {
    filtered = filtered.filter(creator => 
      creator.industries.some(industry => 
        industry.toLowerCase().includes(params.industry!.toLowerCase())
      )
    );
  }
  
  // Apply search filter (name, description, or tags)
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(creator => 
      creator.name.toLowerCase().includes(searchLower) ||
      creator.description.toLowerCase().includes(searchLower) ||
      creator.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      creator.industries.some(industry => industry.toLowerCase().includes(searchLower))
    );
  }
  
  // Apply tag filter
  if (params.tag) {
    filtered = filtered.filter(creator => 
      creator.tags.some(tag => 
        tag.toLowerCase().includes(params.tag!.toLowerCase())
      )
    );
  }
  
  // Apply minimum years filter
  if (params.minYears) {
    const currentYear = new Date().getFullYear();
    filtered = filtered.filter(creator => 
      (currentYear - creator.yearFounded) >= params.minYears!
    );
  }
  
  // Apply minimum rating filter
  if (params.minRating) {
    filtered = filtered.filter(creator => 
      creator.rating >= params.minRating!
    );
  }
  
  // Apply sorting
  if (params.sort) {
    switch (params.sort) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'tools':
        filtered.sort((a, b) => b.toolCount - a.toolCount);
        break;
      case 'newest':
        filtered.sort((a, b) => b.yearFounded - a.yearFounded);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.yearFounded - b.yearFounded);
        break;
      default:
        break;
    }
  }
  
  // Apply limit
  if (params.limit && params.limit > 0) {
    filtered = filtered.slice(0, params.limit);
  }
  
  return {
    creators: filtered,
    total: filtered.length
  };
};

export const useCreators = (params: CreatorsParams = {}) => {
  return useQuery({
    queryKey: ['creators', params],
    queryFn: () => filterCreators(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export type { Creator, CreatorsParams };
