import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-background">
      <SidebarNav />
      <TopHeader />
      <main
        className={cn(
          'ml-60 mt-[64px] p-6 min-h-[calc(100vh-64px)]',
          'bg-background',
          'min-w-0 overflow-y-auto' 
        )}
      >
        {/* Content passed to AdminLayout will be rendered here */}
        {/* The page (e.g. DashboardPage) can implement its own grid, e.g. <div className="grid gap-6">{actual_widgets}</div> */}
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
