'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';

interface ActivityData {
  name: string;
  revenue: number;
  users: number;
  orders: number;
  conversion: number;
}

interface EnhancedActivityChartProps {
  type?: 'line' | 'area' | 'bar';
  timeRange?: '7d' | '30d' | '90d';
}

export function EnhancedActivityChart({ type = 'area', timeRange = '30d' }: EnhancedActivityChartProps) {
  const [data, setData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'users' | 'orders'>('revenue');

  useEffect(() => {
    // Simulate real-time data updates
    const generateData = () => {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const baseData = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        
        return {
          name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue: Math.floor(Math.random() * 5000) + 2000,
          users: Math.floor(Math.random() * 200) + 100,
          orders: Math.floor(Math.random() * 50) + 20,
          conversion: Math.random() * 5 + 2,
        };
      });
      
      setData(baseData);
      setLoading(false);
    };

    generateData();
    
    // Update data every 30 seconds
    const interval = setInterval(generateData, 30000);
    
    return () => clearInterval(interval);
  }, [timeRange]);

  const metrics = {
    revenue: { color: '#10b981', label: 'Revenue', icon: DollarSign },
    users: { color: '#3b82f6', label: 'Users', icon: Users },
    orders: { color: '#f59e0b', label: 'Orders', icon: TrendingUp },
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey={selectedMetric} 
              stroke={metrics[selectedMetric].color} 
              strokeWidth={2}
              dot={{ fill: metrics[selectedMetric].color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Bar dataKey={selectedMetric} fill={metrics[selectedMetric].color} radius={[8, 8, 0, 0]} />
          </BarChart>
        );
      default:
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey={selectedMetric} 
              stroke={metrics[selectedMetric].color} 
              fill={metrics[selectedMetric].color}
              fillOpacity={0.1}
            />
          </AreaChart>
        );
    }
  };

  if (loading) {
    return (
      <div className="bg-tk-dark rounded-xl p-6 border border-tk-border tk-border-glow">
        <div className="animate-pulse">
          <div className="h-8 bg-tk-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-tk-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-tk-dark rounded-xl p-6 border border-tk-border tk-border-glow"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Activity Overview</h3>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-tk-gray" />
          <span className="text-sm text-tk-gray">{timeRange}</span>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        {Object.entries(metrics).map(([key, { color, label, icon: Icon }]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMetric(key as any)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              selectedMetric === key 
                ? 'bg-tk-primary text-white' 
                : 'bg-tk-gray-700 text-tk-gray hover:bg-tk-gray-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </motion.button>
        ))}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-green-400">${data.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}</p>
          <p className="text-sm text-tk-gray">Total Revenue</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-400">{data.reduce((sum, d) => sum + d.users, 0).toLocaleString()}</p>
          <p className="text-sm text-tk-gray">Total Users</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-amber-400">{data.reduce((sum, d) => sum + d.orders, 0).toLocaleString()}</p>
          <p className="text-sm text-tk-gray">Total Orders</p>
        </div>
      </div>
    </motion.div>
  );
}
