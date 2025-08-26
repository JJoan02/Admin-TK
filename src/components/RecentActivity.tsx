'use client';

import { motion } from 'framer-motion';
import { User, ShoppingCart, DollarSign, AlertCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'user',
    message: 'New user registered',
    time: '2 minutes ago',
    icon: User,
    color: 'text-blue-400',
  },
  {
    id: 2,
    type: 'order',
    message: 'Order #1234 completed',
    time: '15 minutes ago',
    icon: ShoppingCart,
    color: 'text-green-400',
  },
  {
    id: 3,
    type: 'payment',
    message: 'Payment received: $234.50',
    time: '1 hour ago',
    icon: DollarSign,
    color: 'text-purple-400',
  },
  {
    id: 4,
    type: 'alert',
    message: 'Low inventory alert',
    time: '2 hours ago',
    icon: AlertCircle,
    color: 'text-red-400',
  },
];

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-tk-dark rounded-xl p-6 border border-tk-border"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-3 p-3 rounded-lg bg-tk-darker hover:bg-tk-darker/80 transition-colors"
          >
            <div className={`p-2 rounded-lg bg-tk-darker ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">{activity.message}</p>
              <p className="text-xs text-tk-gray">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
