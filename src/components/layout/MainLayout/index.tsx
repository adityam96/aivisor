import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  showSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  header,
  footer,
  sidebar,
  showSidebar = false,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {header && <div className="w-full">{header}</div>}
      
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar (if enabled) */}
        {showSidebar && sidebar && (
          <aside className="w-64 bg-white shadow-md hidden md:block">
            {sidebar}
          </aside>
        )}
        
        {/* Main Content Area */}
        <main className={`flex-1 ${showSidebar ? 'md:ml-64' : ''}`}>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      {footer && <div className="w-full mt-auto">{footer}</div>}
    </div>
  );
};

export default MainLayout;
