import React from 'react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  TrendingUp,
  Layers,
  Users,
  FileText,
  AppWindow,
  Component,
  Puzzle,
  TableCells,
  BarChart,
  BarChartHorizontal,
  PieChart as PieChartIcon,
  UserSquare2,
  FormInput,
  ToyBrick,
  LineChart,
  AreaChart,
  ChevronDown,
  LogOut,
  Settings as SettingsIcon, // Renamed to avoid conflict with Settings component if any
} from 'lucide-react';

// Using 'unknown' as a placeholder for React.ElementType for Lucide icons
// A more precise type would be `import type { LucideIcon } from 'lucide-react';`
// but to keep dependencies minimal for this snippet, React.ElementType is used.
type LucideIcon = React.ElementType;

interface NavItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  href?: string;
  isGroupLabel?: boolean;
  children?: NavItem[];
  isExternal?: boolean;
}

const navigationItems: NavItem[] = [
  { id: 'menu-group', label: 'MENU', isGroupLabel: true },
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: LayoutDashboard,
    href: '#',
    children: [
      { id: 'dashboards-analytics', label: 'Analytics', href: '/analytics' },
      { id: 'dashboards-commerce', label: 'Commerce', href: '/commerce' },
      { id: 'dashboards-sales', label: 'Sales', href: '/sales' },
      {
        id: 'dashboards-minimal',
        label: 'Minimal',
        href: '#',
        children: [
          { id: 'minimal-var1', label: 'Variation 1', href: '/dashboards/minimal/variation1' },
          { id: 'minimal-var2', label: 'Variation 2', href: '/dashboards/minimal/variation2' },
        ],
      },
    ],
  },
  { id: 'crm', label: 'CRM', icon: Users, href: '/crm' },
  {
    id: 'pages',
    label: 'Pages',
    icon: FileText,
    href: '#',
    children: [
      { id: 'pages-applications', label: 'Applications', href: '/pages/applications' },
    ],
  },
  { id: 'ui-components-group', label: 'UI COMPONENTS', isGroupLabel: true },
  { id: 'elements', label: 'Elements', icon: Component, href: '/ui/elements' },
  { id: 'components', label: 'Components', icon: Puzzle, href: '/ui/components' },
  { id: 'tables', label: 'Tables', icon: TableCells, href: '/ui/tables' },
  { id: 'dashboard-widgets-group', label: 'DASHBOARD WIDGETS', isGroupLabel: true },
  { id: 'chartboxes1', label: 'Chart Boxes 1', icon: BarChart, href: '/widgets/chartboxes1' },
  { id: 'chartboxes2', label: 'Chart Boxes 2', icon: BarChartHorizontal, href: '/widgets/chartboxes2' },
  { id: 'chartboxes3', label: 'Chart Boxes 3', icon: PieChartIcon, href: '/widgets/chartboxes3' },
  { id: 'profileboxes', label: 'Profile Boxes', icon: UserSquare2, href: '/widgets/profileboxes' },
  { id: 'forms-group', label: 'FORMS', isGroupLabel: true },
  { id: 'form-elements', label: 'Elements', icon: FormInput, href: '/forms/elements' },
  { id: 'form-widgets', label: 'Widgets', icon: ToyBrick, href: '/forms/widgets' },
  { id: 'charts-group', label: 'CHARTS', isGroupLabel: true },
  { id: 'chartjs', label: 'ChartJS', icon: LineChart, href: '/charts/chartjs' },
  { id: 'apexcharts', label: 'Apex Charts', icon: AreaChart, href: '/charts/apexcharts' },
  { id: 'chartsparklines', label: 'Chart Sparklines', icon: TrendingUp, href: '/charts/sparklines' },
];

interface SidebarNavItemProps {
  item: NavItem;
  currentPath: string;
  isSubItem?: boolean;
  onNavigate?: (path: string) => void; 
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, currentPath, isSubItem = false, onNavigate }) => {
  const isActive = item.href === currentPath;
  const Icon = item.icon;

  const linkClasses = cn(
    'flex items-center text-sm rounded-md w-full text-left',
    'transition-colors duration-150 ease-in-out',
    isSubItem ? 'py-2 px-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              : 'py-2.5 px-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground'
             : 'text-sidebar-foreground'
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.href && item.href !== '#') {
      if(onNavigate) {
        e.preventDefault();
        onNavigate(item.href);
      }
      // If onNavigate is not provided, default <a> behavior will occur.
    } else if (!item.children) {
        e.preventDefault(); // Prevent navigation for '#' or undefined hrefs without children
    }
  };

  if (item.isGroupLabel) {
    return (
      <h3 className={cn(
        'px-3 pt-6 pb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-muted-foreground',
        isSubItem ? 'text-opacity-75' : ''
      )}>
        {item.label}
      </h3>
    );
  }

  if (item.children && item.children.length > 0) {
    const isChildActive = item.children.some(child => child.href === currentPath);
    return (
      <AccordionItem value={item.id} className="border-none">
        <AccordionTrigger
          className={cn(
            linkClasses,
            'justify-between hover:no-underline',
            isChildActive && !isActive && 'text-sidebar-primary' // Highlight trigger if child is active but parent is not
          )}
        >
          <div className="flex items-center">
            {Icon && <Icon className={cn('h-5 w-5 mr-3 flex-shrink-0', isActive ? 'text-sidebar-primary-foreground' : isChildActive ? 'text-sidebar-primary' : 'text-sidebar-muted-foreground')} />}
            {item.label}
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0 pl-5 border-l border-sidebar-border ml-3">
          <div className="space-y-1 pt-1">
            {item.children.map((child) => (
              <SidebarNavItem key={child.id} item={child} currentPath={currentPath} isSubItem onNavigate={onNavigate} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a href={item.href || '#'} onClick={handleClick} className={linkClasses} target={item.isExternal ? '_blank' : undefined} rel={item.isExternal ? 'noopener noreferrer' : undefined}>
      {Icon && <Icon className={cn('h-5 w-5 mr-3 flex-shrink-0', isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-muted-foreground')} />}
      {item.label}
    </a>
  );
};

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  // In a real app, currentPath would come from a routing library like React Router.
  // For demonstration, setting it to make "Variation 1" active.
  const [currentPath, setCurrentPath] = React.useState<string>('/dashboards/minimal/variation1');

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    // In a real app, you'd use router.push(path) or similar.
    console.log(`Navigating to: ${path}`);
  };

  // Determine default open accordions based on currentPath
  const defaultOpenAccordionItems = React.useMemo(() => {
    const openItems: string[] = [];
    const findActiveParent = (items: NavItem[], path: string) => {
      for (const item of items) {
        if (item.children) {
          if (item.children.some(child => child.href === path || (child.children && child.children.some(subChild => subChild.href === path)))) {
            openItems.push(item.id);
            // For deeply nested, you might recurse or flatten children paths
            const nestedChild = item.children.find(child => child.href === path || (child.children && child.children.some(subChild => subChild.href === path)));
            if (nestedChild && nestedChild.children) findActiveParent(nestedChild.children, path);
          }
        }
      }
    };
    findActiveParent(navigationItems, currentPath);
    return openItems;
  }, [currentPath]);

  return (
    <aside className={cn('w-60 h-screen bg-sidebar fixed top-0 left-0 flex flex-col z-20 border-r border-sidebar-border', className)}>
      <div className="h-[64px] flex items-center px-4 border-b border-sidebar-border">
        <a href="/" onClick={(e) => { e.preventDefault(); handleNavigate('/'); }} className="flex items-center space-x-2">
          {/* Placeholder for a more complex logo if needed */}
          <span className="font-bold text-xl text-sidebar-foreground">Architect</span>
        </a>
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        <Accordion type="multiple" defaultValue={defaultOpenAccordionItems} className="w-full">
          {navigationItems.map((item) => (
            item.children && item.children.length > 0 ? (
              <SidebarNavItem key={item.id} item={item} currentPath={currentPath} onNavigate={handleNavigate} />
            ) : (
              !item.isGroupLabel && <SidebarNavItem key={item.id} item={item} currentPath={currentPath} onNavigate={handleNavigate} />
            )
          ))}
          {/* Render group labels separately if they are not part of accordion structure */}
          {navigationItems.filter(item => item.isGroupLabel).map(item => (
             <SidebarNavItem key={item.id} item={item} currentPath={currentPath} onNavigate={handleNavigate} />
          ))}
        </Accordion>
         {/* Standalone links that are not part of an accordion need to be rendered outside the Accordion component */}
         {navigationItems.map((item) => (
          !item.children && !item.isGroupLabel && (
            <div key={item.id} className="px-1">
                <SidebarNavItem item={item} currentPath={currentPath} onNavigate={handleNavigate} />
            </div>
          )
        ))}
      </div>
      <div className="p-4 border-t border-sidebar-border mt-auto">
        {/* Example User Actions / Footer */}
        <Button variant="ghost" className="w-full justify-start text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent">
          <SettingsIcon className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default SidebarNav;
