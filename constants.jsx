
import React from 'react';
import {
  Droplets,
  Activity,
  Target,
  ShieldCheck,
  Users,
  Cpu,
  Settings,
  AlertCircle,
  Lightbulb,
  FileText,
  UserCheck
} from 'lucide-react';

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-5 h-5" />, roles: ['CONSUMER', 'ADMIN'] },
  { id: 'devices', label: 'My Devices', icon: <Cpu className="w-5 h-5" />, roles: ['CONSUMER', 'PROVIDER'] },
  { id: 'goals', label: 'Conservation Goals', icon: <Target className="w-5 h-5" />, roles: ['CONSUMER'] },
  { id: 'marketplace', label: 'Experts & Services', icon: <Users className="w-5 h-5" />, roles: ['CONSUMER', 'EXPERT', 'PROVIDER'] },
  { id: 'admin', label: 'Administration', icon: <ShieldCheck className="w-5 h-5" />, roles: ['ADMIN'] },
];

export const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'CONSUMER', status: 'active', location: { city: 'San Francisco' } },
  { id: '2', name: 'Smart Flow Systems', email: 'support@smartflow.io', role: 'PROVIDER', status: 'pending' },
  { id: '3', name: 'Dr. Sarah Waters', email: 'sarah@hydrosave.org', role: 'EXPERT', status: 'active' },
];

export const MOCK_DEVICES = [
  { id: 'd1', name: 'Main Inlet Flow Meter', type: 'flow-meter', status: 'online', currentReading: 12.5, lastUpdate: new Date().toISOString() },
  { id: 'd2', name: 'Backyard Tank', type: 'tank-monitor', status: 'online', currentReading: 85, lastUpdate: new Date().toISOString() },
  { id: 'd3', name: 'Kitchen Leak Sensor', type: 'leak-detector', status: 'online', currentReading: 0, lastUpdate: new Date().toISOString() },
];
