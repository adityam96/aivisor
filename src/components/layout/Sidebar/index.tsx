import React from 'react';

interface SidebarProps {
  items: {
    title: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    children?: {
      title: string;
      href: string;
    }[];
  }[];
  activePath?: string;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  activePath = '',
  className = '',
}) => {
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({});

  const toggleItem = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className={`h-full bg-white border-r border-gray-200 ${className}`}>
      <div className="p-4">
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = item.href === activePath;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems[item.title];
            
            return (
              <div key={item.title}>
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (hasChildren) {
                      toggleItem(item.title);
                    } else if (item.onClick) {
                      item.onClick();
                    }
                  }}
                >
                  <div className="flex items-center">
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    <span className="font-medium">{item.title}</span>
                  </div>
                  {hasChildren && (
                    <svg
                      className={`w-5 h-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                
                {hasChildren && isExpanded && (
                  <div className="mt-1 ml-6 space-y-1">
                    {item.children?.map((child) => {
                      const isChildActive = child.href === activePath;
                      
                      return (
                        <a
                          key={child.title}
                          href={child.href}
                          className={`block px-3 py-2 rounded-md text-sm ${
                            isChildActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {child.title}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
