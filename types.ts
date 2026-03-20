
export enum UserRole {
  CONSUMER = 'CONSUMER',
  PROVIDER = 'PROVIDER',
  EXPERT = 'EXPERT',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'pending' | 'active' | 'rejected';
  location?: {
    lat: number;
    lng: number;
    city: string;
  };
}

export interface IoTDevice {
  id: string;
  name: string;
  type: 'flow-meter' | 'tank-monitor' | 'leak-detector';
  status: 'online' | 'offline';
  currentReading: number; // L/min or Percentage
  lastUpdate: string;
}

export interface ConsumptionLog {
  timestamp: string;
  liters: number;
}

export interface Goal {
  id: string;
  title: string;
  targetLiters: number;
  currentLiters: number;
  period: 'daily' | 'weekly' | 'monthly';
}

export interface Recommendation {
  id: string;
  type: 'alert' | 'tip' | 'expert';
  content: string;
  source: string;
}
