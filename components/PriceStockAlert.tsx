'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import {
  addAlert,
  getAlertsByEmail,
  removeAlert,
  type PriceAlert,
  type StockAlert,
  requestNotificationPermission,
  sendBrowserNotification,
  isNotificationSupported,
} from '@/lib/alert-system';
import { TELEHEALTH_PLATFORMS } from '@/app/alternatives/telehealth-prices';

const DRUGS = [
  { id: 'wegovy', name: 'Wegovy' },
  { id: 'ozempic', name: 'Ozempic' },
  { id: 'mounjaro', name: 'Mounjaro' },
  { id: 'zepbound', name: 'Zepbound' },
  { id: 'rybelsus', name: 'Rybelsus' },
  { id: 'compounded-semaglutide', name: 'Compounded Semaglutide' },
  { id: 'compounded-tirzepatide', name: 'Compounded Tirzepatide' },
];

export default function PriceStockAlert() {
  const [email, setEmail] = useState('');
  const [selectedDrug, setSelectedDrug] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [alertType, setAlertType] = useState<'price' | 'stock'>('price');
  const [priceThreshold, setPriceThreshold] = useState('');
  const [priceDirection, setPriceDirection] = useState<'below' | 'above'>('below');
  const [stockTarget, setStockTarget] = useState<'in-stock' | 'limited' | 'severe'>('in-stock');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userAlerts, setUserAlerts] = useState<(PriceAlert | StockAlert)[]>([]);

  useEffect(() => {
    // Check notification permission
    if (isNotificationSupported()) {
      setNotificationEnabled(Notification.permission === 'granted');
    }
  }, []);

  useEffect(() => {
    // Load user alerts if email is set
    if (email) {
      const alerts = getAlertsByEmail(email);
      setUserAlerts(alerts.filter((a): a is PriceAlert | StockAlert => 
        a.type === 'price-drop' || a.type === 'price-increase' || a.type === 'stock-available' || a.type === 'stock-shortage'
      ));
    }
  }, [email]);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationEnabled(granted);
    if (granted) {
      sendBrowserNotification(
        'Rx Likewise Alerts Enabled',
        'You will receive notifications for price and stock changes.',
        '/favicon.ico'
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedDrug) return;

    if (alertType === 'price') {
      if (!priceThreshold) return;
      addAlert({
        type: priceDirection === 'below' ? 'price-drop' : 'price-increase',
        drugId: selectedDrug,
        drugName: DRUGS.find((d) => d.id === selectedDrug)?.name || selectedDrug,
        platformId: selectedPlatform || undefined,
        platformName: selectedPlatform ? TELEHEALTH_PLATFORMS.find((p) => p.id === selectedPlatform)?.name : undefined,
        currentPrice: 0, // Will be updated when checking
        thresholdPrice: parseFloat(priceThreshold),
        thresholdType: priceDirection,
        email,
      });
    } else {
      addAlert({
        type: stockTarget === 'in-stock' ? 'stock-available' : 'stock-shortage',
        drugId: selectedDrug,
        drugName: DRUGS.find((d) => d.id === selectedDrug)?.name || selectedDrug,
        currentStatus: 'severe', // Will be updated when checking
        targetStatus: stockTarget,
        email,
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setSelectedDrug('');
      setSelectedPlatform('');
      setPriceThreshold('');
    }, 3000);
  };

  const handleRemoveAlert = (alertId: string) => {
    removeAlert(alertId);
    if (email) {
      const alerts = getAlertsByEmail(email);
      setUserAlerts(alerts.filter((a): a is PriceAlert | StockAlert => 
        a.type === 'price-drop' || a.type === 'price-increase' || a.type === 'stock-available' || a.type === 'stock-shortage'
      ));
    }
  };

  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Price & Stock Alerts</h2>
          <p className="mt-1 text-sm text-slate-600">
            Get notified when prices drop or stock becomes available. No spam, unsubscribe anytime.
          </p>
        </div>
        {isNotificationSupported() && (
          <button
            type="button"
            onClick={handleEnableNotifications}
            className={`flex items-center gap-2 rounded-none px-3 py-2 text-sm font-medium transition ${
              notificationEnabled
                ? 'bg-primary-100 text-primary-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {notificationEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            {notificationEnabled ? 'Enabled' : 'Enable'}
          </button>
        )}
      </div>

      {submitted ? (
        <div className="rounded-none border border-primary-200 bg-primary-50 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary-600" />
            <p className="text-sm font-medium text-primary-900">
              Alert set! We&apos;ll notify you when conditions are met.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="mt-1 block w-full rounded-none border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Drug</label>
            <select
              value={selectedDrug}
              onChange={(e) => setSelectedDrug(e.target.value)}
              required
              className="mt-1 block w-full rounded-none border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="">Select a drug</option>
              {DRUGS.map((drug) => (
                <option key={drug.id} value={drug.id}>
                  {drug.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Alert Type</label>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setAlertType('price')}
                className={`flex-1 rounded-none border px-3 py-2 text-sm font-medium transition ${
                  alertType === 'price'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Price Alert
              </button>
              <button
                type="button"
                onClick={() => setAlertType('stock')}
                className={`flex-1 rounded-none border px-3 py-2 text-sm font-medium transition ${
                  alertType === 'stock'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Stock Alert
              </button>
            </div>
          </div>

          {alertType === 'price' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700">Platform (Optional)</label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="mt-1 block w-full rounded-none border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="">All platforms</option>
                  {TELEHEALTH_PLATFORMS.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Notify when price</label>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPriceDirection('below')}
                    className={`flex-1 rounded-none border px-3 py-2 text-sm font-medium transition ${
                      priceDirection === 'below'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Drops Below
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriceDirection('above')}
                    className={`flex-1 rounded-none border px-3 py-2 text-sm font-medium transition ${
                      priceDirection === 'above'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Rises Above
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Price Threshold ($)</label>
                <input
                  type="number"
                  value={priceThreshold}
                  onChange={(e) => setPriceThreshold(e.target.value)}
                  placeholder="e.g. 300"
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-none border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-slate-700">Notify when stock becomes</label>
              <select
                value={stockTarget}
                onChange={(e) => setStockTarget(e.target.value as 'in-stock' | 'limited' | 'severe')}
                required
                className="mt-1 block w-full rounded-none border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="in-stock">In Stock</option>
                <option value="limited">Limited</option>
                <option value="severe">Severe Shortage</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-none bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
          >
            Set Alert
          </button>
        </form>
      )}

      {userAlerts.length > 0 && (
        <div className="mt-6 border-t border-slate-200 pt-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Your Active Alerts</h3>
          <div className="space-y-2">
            {userAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between rounded-none border border-slate-200 bg-slate-50 p-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{alert.drugName}</p>
                  <p className="text-xs text-slate-600">
                    {alert.type === 'price-drop' || alert.type === 'price-increase'
                      ? `Price ${alert.thresholdType === 'below' ? 'below' : 'above'} $${alert.thresholdPrice}`
                      : `Stock ${alert.type === 'stock-available' ? 'available' : 'shortage'}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveAlert(alert.id)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Alerts are stored locally in your browser. In production, these would be sent via email and push notifications.
      </p>
    </div>
  );
}
