/**
 * Alert System - Price & Stock Change Notifications
 * Pure frontend implementation using localStorage
 * In production, this would connect to a backend API
 */

export type AlertType = 'price-drop' | 'price-increase' | 'stock-available' | 'stock-shortage' | 'policy-change';

export interface PriceAlert {
  id: string;
  type: 'price-drop' | 'price-increase';
  drugId: string;
  drugName: string;
  platformId?: string;
  platformName?: string;
  currentPrice: number;
  thresholdPrice: number;
  thresholdType: 'below' | 'above';
  email: string;
  createdAt: string;
  lastChecked?: string;
  triggered?: boolean;
}

export interface StockAlert {
  id: string;
  type: 'stock-available' | 'stock-shortage';
  drugId: string;
  drugName: string;
  currentStatus: 'in-stock' | 'limited' | 'severe';
  targetStatus: 'in-stock' | 'limited' | 'severe';
  email: string;
  createdAt: string;
  lastChecked?: string;
  triggered?: boolean;
}

export interface PolicyAlert {
  id: string;
  type: 'policy-change';
  stateCode: string;
  stateName: string;
  currentStatus: 'active' | 'pending' | 'not-available';
  email: string;
  createdAt: string;
  lastChecked?: string;
  triggered?: boolean;
}

export type Alert = PriceAlert | StockAlert | PolicyAlert;

const STORAGE_KEY = 'glp1_alerts';

/**
 * Get all alerts from localStorage
 */
export function getAlerts(): Alert[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Save alerts to localStorage
 */
export function saveAlerts(alerts: Alert[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  } catch (error) {
    console.error('Failed to save alerts:', error);
  }
}

/**
 * Add a new alert
 */
export function addAlert(alert: Omit<PriceAlert, 'id' | 'createdAt'> | Omit<StockAlert, 'id' | 'createdAt'> | Omit<PolicyAlert, 'id' | 'createdAt'>): string {
  const alerts = getAlerts();
  const id = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newAlert: Alert = {
    ...alert,
    id,
    createdAt: new Date().toISOString(),
  } as Alert;
  alerts.push(newAlert);
  saveAlerts(alerts);
  return id;
}

/**
 * Remove an alert
 */
export function removeAlert(alertId: string): void {
  const alerts = getAlerts();
  const filtered = alerts.filter((a) => a.id !== alertId);
  saveAlerts(filtered);
}

/**
 * Update alert last checked time
 */
export function updateAlertCheckTime(alertId: string): void {
  const alerts = getAlerts();
  const updated = alerts.map((a) =>
    a.id === alertId ? { ...a, lastChecked: new Date().toISOString() } : a
  );
  saveAlerts(updated);
}

/**
 * Get alerts by email
 */
export function getAlertsByEmail(email: string): Alert[] {
  return getAlerts().filter((a) => a.email === email);
}

/**
 * Check if browser notifications are supported
 */
export function isNotificationSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'Notification' in window && 'serviceWorker' in navigator;
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

/**
 * Send browser notification (if permission granted)
 */
export function sendBrowserNotification(title: string, body: string, icon?: string): void {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return;
  
  new Notification(title, {
    body,
    icon: icon || '/images/logos/logo.png',
    badge: '/images/logos/logo.png',
    tag: 'glp1-alert',
    requireInteraction: false,
  });
}

/**
 * Check price alerts against current prices
 */
export function checkPriceAlerts(
  currentPrices: Record<string, { price: number; platform?: string }>
): Alert[] {
  const alerts = getAlerts().filter((a): a is PriceAlert => 
    a.type === 'price-drop' || a.type === 'price-increase'
  );
  
  const triggered: Alert[] = [];
  
  alerts.forEach((alert) => {
    const key = alert.platformId ? `${alert.drugId}_${alert.platformId}` : alert.drugId;
    const current = currentPrices[key];
    
    if (!current) return;
    
    const shouldTrigger =
      alert.thresholdType === 'below'
        ? current.price <= alert.thresholdPrice
        : current.price >= alert.thresholdPrice;
    
    if (shouldTrigger && !alert.triggered) {
      triggered.push(alert);
      // Mark as triggered
      const allAlerts = getAlerts();
      const updated = allAlerts.map((a) =>
        a.id === alert.id ? { ...a, triggered: true, lastChecked: new Date().toISOString() } : a
      );
      saveAlerts(updated);
    }
  });
  
  return triggered;
}

/**
 * Check stock alerts against current status
 */
export function checkStockAlerts(
  currentStock: Record<string, 'in-stock' | 'limited' | 'severe'>
): Alert[] {
  const alerts = getAlerts().filter((a): a is StockAlert => 
    a.type === 'stock-available' || a.type === 'stock-shortage'
  );
  
  const triggered: Alert[] = [];
  
  alerts.forEach((alert) => {
    const current = currentStock[alert.drugId];
    if (!current) return;
    
    const shouldTrigger =
      alert.type === 'stock-available'
        ? current === 'in-stock' && alert.currentStatus !== 'in-stock'
        : (current === 'limited' || current === 'severe') && alert.currentStatus === 'in-stock';
    
    if (shouldTrigger && !alert.triggered) {
      triggered.push(alert);
      // Mark as triggered
      const allAlerts = getAlerts();
      const updated = allAlerts.map((a) => {
        if (a.id === alert.id && (a.type === 'stock-available' || a.type === 'stock-shortage')) {
          return { ...a, triggered: true, currentStatus: current, lastChecked: new Date().toISOString() } as StockAlert;
        }
        return a;
      });
      saveAlerts(updated);
    }
  });
  
  return triggered;
}
