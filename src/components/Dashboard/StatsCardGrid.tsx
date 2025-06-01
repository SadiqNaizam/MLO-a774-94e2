import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, Users, TrendingUp, DollarSign, Briefcase } from 'lucide-react';

interface StatCardData {
  id: string;
  title: string;
  value: string;
  percentageChange: number;
  isPositiveChange: boolean;
  metricValue: number;
  metricColorClass: string;
  icon: React.ElementType;
}

const statCardItems: StatCardData[] = [
  {
    id: 'new-accounts',
    title: 'NEW ACCOUNTS',
    value: '234 %',
    percentageChange: 0, // The main value is already a percentage change
    isPositiveChange: true,
    metricValue: 58,
    metricColorClass: 'bg-primary',
    icon: Users,
  },
  {
    id: 'total-expenses',
    title: 'TOTAL EXPENSES',
    value: '71 %',
    percentageChange: 0, // The main value is already a percentage change
    isPositiveChange: false,
    metricValue: 62,
    metricColorClass: 'bg-destructive',
    icon: TrendingUp, // Using TrendingUp as a generic expenses icon, can be changed
  },
  {
    id: 'company-value',
    title: 'COMPANY VALUE',
    value: '$ 1,45M',
    percentageChange: 0, // No percentage change shown for this card in the image
    isPositiveChange: true, // Default, not visually represented here
    metricValue: 72,
    metricColorClass: 'bg-accentYellow',
    icon: DollarSign,
  },
  {
    id: 'new-employees',
    title: 'NEW EMPLOYEES',
    value: '+ 34 hires',
    percentageChange: 0, // The main value itself is the change
    isPositiveChange: true,
    metricValue: 81,
    metricColorClass: 'bg-accentGreen',
    icon: Briefcase,
  },
];

interface StatCardProps {
  item: StatCardData;
}

const StatCard: React.FC<StatCardProps> = ({ item }) => {
  const ChangeIcon = item.isPositiveChange ? ArrowUp : ArrowDown;
  const changeColorClass = item.isPositiveChange ? 'text-accentGreen' : 'text-destructive';

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-foreground">{item.value}</div>
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold',
              item.metricColorClass
            )}
          >
            {item.metricValue}
          </div>
        </div>
        {item.percentageChange !== 0 && (
          <p className={cn('text-xs mt-1 flex items-center', changeColorClass)}>
            <ChangeIcon className="w-4 h-4 mr-1" />
            {item.percentageChange}% from last month
          </p>
        )}
        {/* If no percentage change, a small spacer or descriptive text could go here */}
        {item.percentageChange === 0 && <p className="text-xs mt-1 text-transparent select-none">_</p>} 
      </CardContent>
    </Card>
  );
};

interface StatsCardGridProps {
  className?: string;
}

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {statCardItems.map((item) => (
        <StatCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default StatsCardGrid;
