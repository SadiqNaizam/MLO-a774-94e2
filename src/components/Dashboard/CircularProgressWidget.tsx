import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Settings, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CircularProgressWidgetProps {
  className?: string;
}

const incomePercentage = 75;
const circularData = [
  { name: 'Achieved', value: incomePercentage },
  { name: 'Remaining', value: 100 - incomePercentage },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))']; // Primary for achieved, secondary for remaining track

const spendingsTargetPercentage = 32;

const CircularProgressWidget: React.FC<CircularProgressWidgetProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Income</CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div style={{ width: '100%', height: 200, position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={circularData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270} // Full circle
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {circularData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                 <Label
                    content={({ viewBox }) => {
                        if (viewBox && viewBox.cx !== undefined && viewBox.cy !== undefined) {
                            const { cx, cy } = viewBox;
                            return (
                                <React.Fragment>
                                    <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="central" fill="hsl(var(--muted-foreground))" fontSize="14">
                                        Percent
                                    </text>
                                    <text x={cx} y={cy + 15} textAnchor="middle" dominantBaseline="central" fill="hsl(var(--foreground))" fontSize="36" fontWeight="bold">
                                        {incomePercentage}
                                    </text>
                                </React.Fragment>
                            );
                        }
                        return null;
                    }}
                    position="center"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full mt-4 text-center">
          <p className="text-sm text-foreground">
            <span className="font-bold text-accentYellow">{spendingsTargetPercentage}%</span> Spendings Target
          </p>
          <Progress value={spendingsTargetPercentage} className="mt-2 h-2 bg-secondary [&>div]:bg-accentYellow" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CircularProgressWidget;
