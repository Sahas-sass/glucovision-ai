"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { day: 'Mon', level: 120 },
  { day: 'Tue', level: 135 },
  { day: 'Wed', level: 158 },
  { day: 'Thu', level: 142 },
  { day: 'Fri', level: 190 }, // Spike detected
  { day: 'Sat', level: 165 },
  { day: 'Sun', level: 150 },
];

export default function GlucoseTrendChart() {
  return (
    <div className="w-full min-h-[300px] relative">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={mockData}>
          <defs>
            <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0bcfcf" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0bcfcf" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 12}} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 12}} 
            dx={-10} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="level" 
            stroke="#0bcfcf" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorLevel)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}