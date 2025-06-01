import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TargetCardData {
  id: string;
  percentage: number;
  label: string;
  progressColorClass: string; // Tailwind class for progress bar fill
}

const targetCardItems: TargetCardData[] = [
  {
    id: 'income-target',
    percentage: 71,
    label: 'Income Target',
    progressColorClass: 'bg-destructive',
  },
  {
    id: 'expenses-target',
    percentage: 54,
    label: 'Expenses Target',
    progressColorClass: 'bg-accentGreen',
  },
  {
    id: 'spendings-target',
    percentage: 32,
    label: 'Spendings Target',
    progressColorClass: 'bg-accentYellow',
  },
  {
    id: 'totals-target',
    percentage: 89,
    label: 'Totals Target',
    progressColorClass: 'bg-primary',
  },
];

interface TargetCardProps {
  item: TargetCardData;
}

const TargetCard: React.FC<TargetCardProps> = ({ item }) => {
  return (
    <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
      <div className="text-2xl font-bold text-foreground">{item.percentage}%</div>
      <p className="text-sm text-muted-foreground mt-1 mb-2">{item.label}</p>
      <Progress value={item.percentage} className={cn('h-1.5 [&>div]:', item.progressColorClass)} />
    </div>
  );
};

interface TargetStatsCardsProps {
  className?: string;
}

const TargetStatsCards: React.FC<TargetStatsCardsProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Target Section</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="link" className="text-primary p-0 h-auto">
            View Details
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-accentYellow/20 border-accentYellow text-accentYellow hover:bg-accentYellow/30">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {targetCardItems.map((item) => (
            <TargetCard key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetStatsCards;
