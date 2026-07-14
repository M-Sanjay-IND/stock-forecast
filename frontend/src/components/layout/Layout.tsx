import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300 w-full"
        style={{ paddingLeft: sidebarCollapsed ? '72px' : '240px' }}
      >
        <div className="md:hidden">
          {/* On mobile, reset padding so content takes full width */}
          <style>{`
            @media (max-width: 768px) {
              .flex-1.flex.flex-col {
                padding-left: 0 !important;
              }
            }
          `}</style>
        </div>
        <Header onMobileMenuClick={() => setMobileMenuOpen(true)} />

        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
