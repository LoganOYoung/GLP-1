/**
 * Telehealth Platform API Configuration
 * 
 * Configuration file for integrating with real Telehealth platform APIs.
 * 
 * Setup Instructions:
 * 1. Contact each platform to request API access
 * 2. Add your API keys to .env.local
 * 3. Update the endpoints and authentication methods below
 * 4. Implement normalizePlatformData() in telehealth-api.ts
 */

export interface PlatformApiConfig {
  id: string;
  name: string;
  apiEndpoint: string;
  authType: 'bearer' | 'api_key' | 'oauth' | 'none';
  authHeader?: string; // e.g., 'Authorization' or 'X-API-Key'
  envKey?: string; // Environment variable name for API key
  rateLimit?: {
    requestsPerMinute: number;
    requestsPerHour: number;
  };
  cacheTTL?: number; // Cache time-to-live in minutes
  enabled: boolean; // Set to true when API is ready
}

/**
 * API Configuration for each Telehealth platform
 * 
 * Update these with actual endpoints and credentials when available.
 */
export const PLATFORM_API_CONFIG: Record<string, PlatformApiConfig> = {
  'henry-meds': {
    id: 'henry-meds',
    name: 'Henry Meds',
    apiEndpoint: process.env.HENRY_MEDS_API_URL || 'https://api.henrymeds.com/v1/pricing',
    authType: 'bearer',
    authHeader: 'Authorization',
    envKey: 'HENRY_MEDS_API_KEY',
    rateLimit: {
      requestsPerMinute: 60,
      requestsPerHour: 1000,
    },
    cacheTTL: 5, // 5 minutes
    enabled: false, // Set to true when API key is configured
  },
  'ro': {
    id: 'ro',
    name: 'Ro',
    apiEndpoint: process.env.RO_API_URL || 'https://api.ro.co/v1/pricing',
    authType: 'api_key',
    authHeader: 'X-API-Key',
    envKey: 'RO_API_KEY',
    rateLimit: {
      requestsPerMinute: 30,
      requestsPerHour: 500,
    },
    cacheTTL: 10, // 10 minutes
    enabled: false,
  },
  'mochi': {
    id: 'mochi',
    name: 'Mochi Health',
    apiEndpoint: process.env.MOCHI_API_URL || 'https://api.mochihealth.com/v1/pricing',
    authType: 'bearer',
    authHeader: 'Authorization',
    envKey: 'MOCHI_API_KEY',
    rateLimit: {
      requestsPerMinute: 40,
      requestsPerHour: 800,
    },
    cacheTTL: 5,
    enabled: false,
  },
  'calibrate': {
    id: 'calibrate',
    name: 'Calibrate',
    apiEndpoint: process.env.CALIBRATE_API_URL || 'https://api.calibrate.com/v1/pricing',
    authType: 'oauth',
    authHeader: 'Authorization',
    envKey: 'CALIBRATE_API_KEY',
    rateLimit: {
      requestsPerMinute: 20,
      requestsPerHour: 300,
    },
    cacheTTL: 15,
    enabled: false,
  },
  'found': {
    id: 'found',
    name: 'Found',
    apiEndpoint: process.env.FOUND_API_URL || 'https://api.found.com/v1/pricing',
    authType: 'bearer',
    authHeader: 'Authorization',
    envKey: 'FOUND_API_KEY',
    rateLimit: {
      requestsPerMinute: 50,
      requestsPerHour: 1000,
    },
    cacheTTL: 5,
    enabled: false,
  },
};

/**
 * Get API key from environment variables
 */
export function getApiKey(platformId: string): string | null {
  const config = PLATFORM_API_CONFIG[platformId];
  if (!config || !config.envKey) return null;
  return process.env[config.envKey] || null;
}

/**
 * Check if platform API is enabled and configured
 */
export function isPlatformApiEnabled(platformId: string): boolean {
  const config = PLATFORM_API_CONFIG[platformId];
  if (!config) return false;
  if (!config.enabled) return false;
  if (config.envKey && !getApiKey(platformId)) return false;
  return true;
}

/**
 * Get enabled platforms
 */
export function getEnabledPlatforms(): string[] {
  return Object.keys(PLATFORM_API_CONFIG).filter(isPlatformApiEnabled);
}
