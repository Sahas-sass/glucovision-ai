"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const data = [
  { name: 'Risk', value: 65, fill: '#0bcfcf' }, 
  { name: 'Remaining', value: 35, fill: '#f1f5f9' },
];

export default function RetinaRiskMeter() {
  return (
    <div className="w-full min-h-[250px] relative flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={180}
            endAngle={0}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
            animationBegin={0}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill} 
                className="transition-all duration-700"
              />
            ))}
            <Label 
              value="MODERATE" 
              position="centerBottom" 
              className="font-montserrat font-bold fill-slate-900 text-lg"
              dy={-20}
            />
            </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="text-center -mt-8">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">DR Severity Grade</p>
        <p className="text-sm text-slate-600 mt-1 font-medium">Level 2: Non-Proliferative</p>
      </div>
    </div>
  );
}