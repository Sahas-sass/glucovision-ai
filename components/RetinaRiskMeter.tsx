"use client";
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

export default function RetinaRiskMeter() {
  const [riskLevel, setRiskLevel] = useState("Low");

  useEffect(() => {
    const savedRisk = localStorage.getItem("last_eye_result") || "Low";
    setRiskLevel(savedRisk);
  }, []);

  // Dynamic Chart Data based on "AI" Result
  const getChartData = () => {
    if (riskLevel === "High") return [{ value: 85, fill: '#ef4444' }, { value: 15, fill: '#f1f5f9' }];
    if (riskLevel === "Moderate") return [{ value: 65, fill: '#f59e0b' }, { value: 35, fill: '#f1f5f9' }];
    return [{ value: 25, fill: '#0bcfcf' }, { value: 75, fill: '#f1f5f9' }];
  };

  return (
    <div className="w-full min-h-[250px] relative flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={getChartData()}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={180}
            endAngle={0}
            dataKey="value"
            stroke="none"
          >
            {getChartData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <Label 
              value={riskLevel.toUpperCase()} 
              position="centerBottom" 
              className="font-montserrat font-bold fill-slate-900 text-lg"
              dy={-20}
            />
            </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="text-center -mt-8">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Conclusion</p>
        <p className="text-sm text-slate-600 mt-1 font-medium">
          {riskLevel === "Low" ? "No significant lesions detected." : "Possible Microaneurysms detected."}
        </p>
      </div>
    </div>
  );
}