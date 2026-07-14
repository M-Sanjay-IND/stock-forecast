import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  GitCompare,
  Bookmark,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/forecast', icon: TrendingUp, label: 'Forecast' },
  { to: '/compare', icon: GitCompare, label: 'Compare' },
  { to: '/watchlist', icon: Bookmark, label: 'Watchlist' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        "fixed top-0 left-0 h-screen z-40 flex flex-col bg-card/95 backdrop-blur-xl border-r border-border transition-transform duration-300 md:translate-x-0",
        mobileOpen ? "translate-x-0 w-64" : "-translate-x-full"
      )}
      style={{ width: mobileOpen ? 240 : (collapsed ? 72 : 240) }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
        {(!collapsed || mobileOpen) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden whitespace-nowrap"
          >
            <h1 className="text-xl font-bold gradient-text">Stock Train</h1>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex justify-center overflow-hidden"
          >
            <h1 className="text-xl font-bold gradient-text">ST</h1>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => mobileOpen && onMobileClose()}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                'hover:bg-accent/50',
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:text-foreground'
              )
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {(!collapsed || mobileOpen) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                {label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle (Desktop only) */}
      <button
        onClick={onToggle}
        className="hidden md:flex items-center justify-center h-12 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle sidebar"
      >
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </button>
    </motion.aside>
  );
};

export default Sidebar;
