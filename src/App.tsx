import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/layout/Header';

// Import pages
import HomePage from './pages/Home';
import ToolsPage from './pages/Tools';
import ToolDetailPage from './pages/ToolDetail';
import SurveyPage from './pages/Survey';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import MessagesPage from './pages/Messages';
import BlogPage from './pages/Blog';
import AdminPage from './pages/Admin';
import CreatorsPage from './pages/Creators';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/aivisor">
        <div className="min-h-screen bg-gray-50">
          <Header isLoggedIn={false} />
          {/* Add padding to account for fixed header */}
          <div className="pt-16">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/tools/:id" element={<ToolDetailPage />} />
              <Route path="/tools/free" element={<ToolsPage />} />
              <Route path="/tools/new" element={<ToolsPage />} />
              <Route path="/survey" element={<SurveyPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/creators" element={<CreatorsPage />} />
              <Route path="/creators/:id" element={<CreatorsPage />} />
              
              {/* Protected routes */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/dashboard" element={<ProfilePage />} />
              
              {/* 404 route */}
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
