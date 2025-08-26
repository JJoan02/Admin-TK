'use client';

import { motion } from 'framer-motion';
import { Users, DollarSign, ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface EnhancedStatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: 'users' | 'dollar' | 'shopping-cart' | 'trending-up';
  sparklineData?: number[];
  trend?: 'up' | 'down';
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const icons = {
  users: Users,
  dollar: DollarSign,
  'shopping-cart': ShoppingCart,
  'trending-up': TrendingUp,
};

const colorStyles = {
  blue: {
    primary: 'text-tk-primary',
    bg: 'bg-tk-primary/10',
    hoverBg: 'bg-tk-primary/20',
    gradient: 'from-tk-primary/5',
    border: 'border-tk-primary/20',
  },
  green: {
    primary: 'text-green-400',
    bg: 'bg-green-400/10',
    hoverBg: 'bg-green-400/20',
    gradient: 'from-green-400/5',
    border: 'border-green-400/20',
  },
  purple: {
    primary: 'text-purple-400',
    bg: 'bg-purple-400/10',
    hoverBg: 'bg-purple-400/20',
    gradient: 'from-purple-400/5',
    border: 'border-purple-400/20',
  },
  orange: {
    primary: 'text-orange-400',
    bg: 'bg-orange-400/10',
    hoverBg: 'bg-orange-400/20',
    gradient: 'from-orange-400/5',
    border: 'border-orange-400/20',
  },
};

export function EnhancedStatsCard({ 
  title, 
  value, 
  change, 
  icon, 
  sparklineData = [20, 40, 30, 50, 40, 60, 70],
  trend = 'up',
  color = 'blue'
}: EnhancedStatsCardProps) {
  const Icon = icons[icon];
  const colors = colorStyles[color];
  const isPositive = change.startsWith('+');
  const [animatedValue, setAnimatedValue] = useState('0');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Animate value on mount
    const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
    let current = 0;
    const increment = numericValue / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setAnimatedValue(value);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(current).toLocaleString());
      }
    }, 50);
    return () => clearInterval(timer);
  }, [value]);

  const chartData = sparklineData.map((value, index) => ({ value, index }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-tk-dark rounded-xl p-6 border border-tk-border tk-border-glow relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-tk-gray text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{animatedValue}</p>
            <div className="flex items-center mt-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
              )}
              <p className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {change} from last month
              </p>
            </div>
          </div>
          
          <motion.div 
            className={`p-3 ${colors.bg} rounded-lg transition-all duration-300 ${isHovered ? `scale-110 ${colors.hoverBg}` : ''}`}
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className={`w-6 h-6 ${colors.primary}`} />
          </motion.div>
        </div>
        
        <div className="mt-4 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={trend === 'up' ? "#10b981" : "#ef4444"} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
