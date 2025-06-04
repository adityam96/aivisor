import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  publishedDate: string;
  readTime: number;
  featuredImage: string;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'news', 'tutorials', 'reviews', 'comparisons', 'industry'];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      try {
        // Mock data - in a real app, this would be an API call
        setTimeout(() => {
          const mockPosts: BlogPost[] = [
            {
              id: '1',
              title: 'The Future of AI Tools in Content Creation',
              excerpt: 'How AI is revolutionizing the way we create and consume content in 2025 and beyond.',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              author: {
                id: '101',
                name: 'Sarah Johnson',
                avatar: '/avatars/sarah.jpg'
              },
              category: 'industry',
              tags: ['AI', 'Content Creation', 'Future Tech'],
              publishedDate: '2025-05-15T10:30:00Z',
              readTime: 8,
              featuredImage: '/blog/ai-content-future.jpg'
            },
            {
              id: '2',
              title: 'Comparing Top 5 AI Writing Assistants in 2025',
              excerpt: 'An in-depth comparison of the leading AI writing tools and how they stack up against each other.',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              author: {
                id: '102',
                name: 'Michael Chen',
                avatar: '/avatars/michael.jpg'
              },
              category: 'comparisons',
              tags: ['AI Writing', 'Tool Comparison', 'Productivity'],
              publishedDate: '2025-05-10T14:45:00Z',
              readTime: 12,
              featuredImage: '/blog/ai-writing-comparison.jpg'
            },
            {
              id: '3',
              title: 'How to Use AI Tools to Improve Your Research Process',
              excerpt: 'Step-by-step guide to leveraging AI for more efficient and effective research.',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              author: {
                id: '103',
                name: 'Emily Rodriguez',
                avatar: '/avatars/emily.jpg'
              },
              category: 'tutorials',
              tags: ['Research', 'AI Tools', 'Productivity'],
              publishedDate: '2025-05-05T09:15:00Z',
              readTime: 10,
              featuredImage: '/blog/ai-research-guide.jpg'
            },
            {
              id: '4',
              title: 'New AI Image Generator Breaks Boundaries in Creative Design',
              excerpt: 'Revolutionary new tool allows designers to create stunning visuals with simple text prompts.',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              author: {
                id: '104',
                name: 'David Wilson',
                avatar: '/avatars/david.jpg'
              },
              category: 'news',
              tags: ['AI Art', 'Design Tools', 'Creative Tech'],
              publishedDate: '2025-04-28T16:20:00Z',
              readTime: 6,
              featuredImage: '/blog/ai-image-generator.jpg'
            },
            {
              id: '5',
              title: 'Review: DataAnalyzer Pro - The Ultimate AI Tool for Data Scientists',
              excerpt: 'Our comprehensive review of the latest version of DataAnalyzer Pro and its AI capabilities.',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              author: {
                id: '105',
                name: 'Priya Patel',
                avatar: '/avatars/priya.jpg'
              },
              category: 'reviews',
              tags: ['Data Science', 'Tool Review', 'Analytics'],
              publishedDate: '2025-04-22T11:10:00Z',
              readTime: 9,
              featuredImage: '/blog/data-analyzer-review.jpg'
            },
            {
              id: '6',
              title: 'The Ethics of AI Tools: Balancing Innovation and Responsibility',
              excerpt: 'Exploring the ethical considerations surrounding AI tool development and usage.',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              author: {
                id: '106',
                name: 'James Thompson',
                avatar: '/avatars/james.jpg'
              },
              category: 'industry',
              tags: ['AI Ethics', 'Technology', 'Future'],
              publishedDate: '2025-04-18T13:25:00Z',
              readTime: 11,
              featuredImage: '/blog/ai-ethics.jpg'
            }
          ];

          // Set the first post as featured
          setFeaturedPost(mockPosts[0]);
          setPosts(mockPosts.slice(1));
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load blog posts');
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              AI Tools Blog
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Latest news, tutorials, and insights about AI tools and technology
            </p>
          </div>

          {error && (
            <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12">
                  <div className="relative rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-700 mix-blend-multiply"></div>
                    </div>
                    <div className="relative px-6 py-16 sm:px-12 sm:py-24 lg:py-32 lg:px-16">
                      <div className="max-w-3xl mx-auto">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full uppercase tracking-wide font-semibold mb-4">
                          Featured
                        </span>
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                          <Link to={`/blog/${featuredPost.id}`} className="hover:underline">
                            {featuredPost.title}
                          </Link>
                        </h2>
                        <p className="mt-4 text-lg text-gray-100">
                          {featuredPost.excerpt}
                        </p>
                        <div className="mt-6 flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
                              {featuredPost.author.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-white">
                              {featuredPost.author.name}
                            </p>
                            <div className="flex space-x-1 text-sm text-gray-300">
                              <time dateTime={featuredPost.publishedDate}>{formatDate(featuredPost.publishedDate)}</time>
                              <span aria-hidden="true">&middot;</span>
                              <span>{featuredPost.readTime} min read</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Link
                            to={`/blog/${featuredPost.id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                          >
                            Read more
                            <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Category Tabs */}
              <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`${
                        activeCategory === category
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                    >
                      {category}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.length === 0 ? (
                  <div className="md:col-span-2 lg:col-span-3 text-center py-12">
                    <p className="text-gray-500">No posts found in this category.</p>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <div key={post.id} className="flex flex-col rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0 h-48 bg-gray-200 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-700 mix-blend-multiply"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <h3 className="text-xl font-bold text-white text-center px-4">
                            {post.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                        <div className="flex-1">
                          <Link to={`/blog/${post.id}`} className="block">
                            <p className="text-sm font-medium text-blue-600 mb-1 uppercase">
                              {post.category}
                            </p>
                            <p className="text-gray-900 text-lg font-semibold hover:underline">
                              {post.title}
                            </p>
                            <p className="mt-3 text-base text-gray-500 line-clamp-3">
                              {post.excerpt}
                            </p>
                          </Link>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
                              {post.author.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {post.author.name}
                            </p>
                            <div className="flex space-x-1 text-sm text-gray-500">
                              <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                              <span aria-hidden="true">&middot;</span>
                              <span>{post.readTime} min read</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPosts.length}</span> of{' '}
                      <span className="font-medium">{filteredPosts.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPage;
