'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { EnhancedStatsCard } from '@/components/EnhancedStatsCard';
import { QuickActions } from '@/components/QuickActions';
import { EnhancedActivityChart } from '@/components/EnhancedActivityChart';
import { EnhancedRecentActivity } from '@/components/EnhancedRecentActivity';

export default function Home() {
  return (
    <div className="min-h-screen bg-tk-darker">
      <Navigation />
      
      <main className="ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <EnhancedStatsCard
              title="Total Users"
              value="12,543"
              change="+12%"
              icon="users"
              trend="up"
              color="blue"
            />
            <EnhancedStatsCard
              title="Revenue"
              value="$45,231"
              change="+8%"
              icon="dollar"
              trend="up"
              color="green"
            />
            <EnhancedStatsCard
              title="Orders"
              value="1,234"
              change="+23%"
              icon="shopping-cart"
              trend="up"
              color="purple"
            />
            <EnhancedStatsCard
              title="Growth"
              value="15.3%"
              change="+2.1%"
              icon="trending-up"
              trend="up"
              color="orange"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EnhancedActivityChart />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>

          <div className="mt-8">
            <EnhancedRecentActivity />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
