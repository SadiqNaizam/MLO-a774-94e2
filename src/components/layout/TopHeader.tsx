import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  LayoutGrid, // For 'Mega Menu' icon or general apps icon
  Settings,
  FolderKanban,
  Bell,
  Flag, // For language or other similar features
  User,
  LogOut,
  LifeBuoy,
  ChevronDown,
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        'fixed top-0 left-60 right-0 h-[64px] bg-card shadow-sm px-6 z-10',
        'flex items-center justify-between border-b border-border',
        className
      )}
    >
      {/* Left Section: Search and Navigation Links */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 h-9 w-64 bg-background focus-visible:ring-primary"
          />
        </div>
        <nav className="flex items-center gap-1">
          <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
            <LayoutGrid className="h-4 w-4 mr-2" />
            Mega Menu
            <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
          </Button>
          <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4 mr-2" />
            Settings
            <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
          </Button>
          <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
            <FolderKanban className="h-4 w-4 mr-2" />
            Projects
            <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
          </Button>
        </nav>
      </div>

      {/* Right Section: Actions and User Profile */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <LayoutGrid className="h-5 w-5" />
          <span className="sr-only">Applications</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Flag className="h-5 w-5" /> {/* Placeholder for language picker etc. */}
          <span className="sr-only">Language</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-auto py-1.5 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/40?u=alina" alt="Alina Mclourd" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-foreground">Alina Mclourd</p>
                <p className="text-xs text-muted-foreground">VP People Manager</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
