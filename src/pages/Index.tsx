import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import TrafficSourcesChart from '../components/Dashboard/TrafficSourcesChart';
import CircularProgressWidget from '../components/Dashboard/CircularProgressWidget';
import TargetStatsCards from '../components/Dashboard/TargetStatsCards';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, Info, CalendarDays, Printer, ChevronDown } from 'lucide-react';

const DashboardOverviewPage: React.FC = () => {
  // Dummy handler for navigation to prevent console errors for # hrefs
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log('Link clicked, navigation prevented for demo.');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Breadcrumbs and Title/Actions Row */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <a href="#" onClick={handleLinkClick} className="hover:text-foreground flex items-center gap-1.5">
                    <Home className="h-4 w-4" />
                    Dashboards
                  </a>
                </li>
                <li>/
                </li>
                <li>
                  <span className="text-foreground font-medium">Minimal Dashboard Example</span>
                </li>
              </ol>
            </nav>
            <h1 className="text-3xl font-bold text-foreground mt-2">
              Minimal Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto h-9 px-3 justify-start text-left font-normal">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Select period</span>
                  <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Today</DropdownMenuItem>
                <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem>This Month</DropdownMenuItem>
                <DropdownMenuItem>This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Printer className="h-4 w-4" />
              <span className="sr-only">Print</span>
            </Button>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="border-primary/30 bg-primary/10 text-primary dark:border-primary/40 dark:bg-primary/20 dark:text-primary/90">
          <Info className="h-5 w-5 flex-shrink-0" /> {/* Color inherited from text-primary */}
          <AlertDescription>
            This dashboard example was created using only the available elements and components, no additional SCSS was written!
          </AlertDescription>
        </Alert>

        {/* Widgets Grid */}
        <div className="grid gap-6">
          <StatsCardGrid />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TrafficSourcesChart className="lg:col-span-2" />
            <CircularProgressWidget className="lg:col-span-1" />
          </div>
          <TargetStatsCards />
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardOverviewPage;
