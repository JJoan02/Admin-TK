'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Clock, User, ShoppingCart, DollarSign, Package } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'order' | 'user' | 'payment' | 'shipment';
  title: string;
  description: string;
  time: string;
  amount?: string;
  status: 'completed' | 'pending' | 'failed';
}

interface EnhancedRecentActivityProps {
  maxItems?: number;
  autoRefresh?: boolean;
}

export function EnhancedRecentActivity({ maxItems = 5, autoRefresh = true }: EnhancedRecentActivityProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'orders' | 'users' | 'payments'>('all');
  const [loading, setLoading] = useState(true);

  const generateActivity = (): ActivityItem[] => {
    const types = ['order', 'user', 'payment', 'shipment'] as const;
    const statuses = ['completed', 'pending', 'failed'] as const;
    const titles = {
      order: ['New order placed', 'Order updated', 'Order cancelled', 'Order shipped'],
      user: ['New user registered', 'User profile updated', 'User logged in', 'User verified'],
      payment: ['Payment received', 'Refund processed', 'Payment failed', 'Payment pending'],
      shipment: ['Package shipped', 'Package delivered', 'Package delayed', 'Package returned'],
    };

    return Array.from({ length: 10 }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const titleList = titles[type];
      const title = titleList[Math.floor(Math.random() * titleList.length)];
      
      return {
        id: `activity-${Date.now()}-${i}`,
        type,
        title,
        description: `${title} for user #${Math.floor(Math.random() * 1000)}`,
        time: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        amount: type === 'order' || type === 'payment' ? `$${(Math.random() * 1000).toFixed(2)}` : undefined,
        status,
      };
    });
  };

  useEffect(() => {
    const loadActivities = () => {
      setActivities(generateActivity());
      setLoading(false);
    };

    loadActivities();

    if (autoRefresh) {
      const interval = setInterval(loadActivities, 10000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter.slice(0, -1) as any;
  }).slice(0, maxItems);

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingCart;
      case 'user': return User;
      case 'payment': return DollarSign;
      case 'shipment': return Package;
      default: return CheckCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-tk-gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return AlertCircle;
      default: return CheckCircle;
    }
  };

  const formatTime = (time: string) => {
    const date = new Date(time);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) {
    return (
      <div className="bg-tk-dark rounded-xl p-6 border border-tk-border tk-border-glow">
        <div className="animate-pulse">
          <div className="h-6 bg-tk-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-tk-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-tk-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-tk-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <div className="flex space-x-2">
          {(['all', 'orders', 'users', 'payments'] as const).map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                filter === f 
                  ? 'bg-tk-primary text-white' 
                  : 'bg-tk-gray-700 text-tk-gray hover:bg-tk-gray-600'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredActivities.map((activity, index) => {
            const Icon = getIcon(activity.type);
            const StatusIcon = getStatusIcon(activity.status);
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-tk-gray-800/50 transition-colors duration-200"
              >
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-tk-primary/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className="w-5 h-5 text-tk-primary" />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white truncate">{activity.title}</p>
                    <div className="flex items-center space-x-1">
                      <StatusIcon className={`w-4 h-4 ${getStatusColor(activity.status)}`} />
                      <span className="text-xs text-tk-gray">{formatTime(activity.time)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-tk-gray mt-1">{activity.description}</p>
                  {activity.amount && (
                    <p className="text-sm font-semibold text-tk-primary mt-1">{activity.amount}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-8">
          <p className="text-tk-gray">No activities found</p>
        </div>
      )}
    </motion.div>
  );
}
