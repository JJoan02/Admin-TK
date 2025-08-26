'use client';

import { motion } from 'framer-motion';
import { Plus, Download, Settings, RefreshCw } from 'lucide-react';

const actions = [
  {
    id: 1,
    title: 'Add New User',
    icon: Plus,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Export Data',
    icon: Download,
    color: 'bg-green-500',
  },
  {
    id: 3,
    title: 'System Settings',
    icon: Settings,
    color: 'bg-purple-500',
  },
  {
    id: 4,
    title: 'Refresh Stats',
    icon: RefreshCw,
    color: 'bg-orange-500',
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-tk-dark rounded-xl p-6 border border-tk-border"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-3 p-3 rounded-lg bg-tk-darker hover:bg-tk-darker/80 transition-colors"
          >
            <div className={`p-2 rounded-lg ${action.color}`}>
              <action.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-tk-gray">{action.title}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
