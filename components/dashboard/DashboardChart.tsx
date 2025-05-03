"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useTheme } from 'next-themes';

const data = [
  { name: 'Heat Exchangers', count: 42 },
  { name: 'Pumps', count: 28 },
  { name: 'Valves', count: 23 },
  { name: 'Filters', count: 19 },
  { name: 'Tanks', count: 12 },
];

export function DashboardChart() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#eee'} />
        <XAxis 
          dataKey="name" 
          tick={{ fill: isDark ? '#ccc' : '#333' }}
          axisLine={{ stroke: isDark ? '#444' : '#ccc' }}
        />
        <YAxis 
          tick={{ fill: isDark ? '#ccc' : '#333' }}
          axisLine={{ stroke: isDark ? '#444' : '#ccc' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: isDark ? '#1c1c1c' : '#fff',
            border: isDark ? '1px solid #333' : '1px solid #ddd',
            color: isDark ? '#fff' : '#333'
          }} 
        />
        <Bar 
          dataKey="count" 
          fill="hsl(var(--chart-1))" 
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}