'use client';

import { motion } from 'framer-motion';
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: 'users' | 'dollar' | 'shopping-cart' | 'trending-up';
}

const icons = {
  users: Users,
  dollar: DollarSign,
  'shopping-cart': ShoppingCart,
  'trending-up': TrendingUp,
};

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const Icon = icons[icon];
  const isPositive = change.startsWith('+');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-tk-dark rounded-xl p-6 border border-tk-border tk-border-glow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-tk-gray text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          <p className={`text-sm mt-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {change} from last month
          </p>
        </div>
        <div className="p-3 bg-tk-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-tk-primary" />
        </div>
      </div>
    </motion.div>
  );
}
