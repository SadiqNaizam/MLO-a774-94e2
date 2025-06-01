import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  DotProps,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, FileDown, Filter, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrafficSourcesChartProps {
  className?: string;
}

const trafficData = [
  { name: 'Jan 00', websiteBlog: 420, socialMedia: 250, trend: 400 },
  { name: '02 Jan', websiteBlog: 510, socialMedia: 310, trend: 480 },
  { name: '03 Jan', websiteBlog: 400, socialMedia: 220, trend: 450 },
  { name: '04 Jan', websiteBlog: 650, socialMedia: 300, trend: 550 },
  { name: '05 Jan', websiteBlog: 220, socialMedia: 480, trend: 350 },
  { name: '06 Jan', websiteBlog: 430, socialMedia: 200, trend: 400 },
  { name: '07 Jan', websiteBlog: 150, socialMedia: 320, trend: 250 },
  { name: '08 Jan', websiteBlog: 380, socialMedia: 270, trend: 390 },
  { name: '09 Jan', websiteBlog: 780, socialMedia: 400, trend: 600 },
  { name: '10 Jan', websiteBlog: 250, socialMedia: 180, trend: 300 },
  { name: '11 Jan', websiteBlog: 180, socialMedia: 120, trend: 200 },
  { name: '12 Jan', websiteBlog: 300, socialMedia: 150, trend: 280 },
];

const CustomDot: React.FC<DotProps & { color?: string }> = (props) => {
  const { cx, cy, stroke, payload, value, color } = props;
  if (cx === undefined || cy === undefined) return null;
  return <circle cx={cx} cy={cy} r={4} stroke={color || stroke} strokeWidth={2} fill="#fff" />;
};

const TrafficSourcesChart: React.FC<TrafficSourcesChartProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Traffic Sources</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <FileDown className="mr-2 h-4 w-4" />
              Download Data
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="mr-2 h-4 w-4" />
              Share Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <ComposedChart data={trafficData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="hsl(var(--muted-foreground))" 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="hsl(var(--muted-foreground))" 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              />
              <Bar yAxisId="left" dataKey="websiteBlog" name="Website Blog" fill="hsl(var(--primary))" barSize={20} radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="socialMedia" name="Social Media" fill="#10B981" barSize={20} radius={[4, 4, 0, 0]} />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="trend" 
                name="Trend" 
                stroke="#F59E0B" // Using accentYellow for trend line
                strokeWidth={2} 
                dot={(props) => <CustomDot {...props} color="#F59E0B" />} 
                activeDot={{ r: 6, strokeWidth: 2, fill: '#fff', stroke: '#F59E0B' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSourcesChart;
