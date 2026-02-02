/**
 * Telehealth Platform API Integration
 * 
 * This module provides a structure for integrating with real Telehealth platform APIs.
 * 
 * To enable real API integration:
 * 1. Configure API endpoints in lib/telehealth-api-config.ts
 * 2. Add API keys to .env.local
 * 3. Set enabled: true for platforms in config
 * 4. Implement normalizePlatformData() for each platform
 */

import { TELEHEALTH_PLATFORMS, type TelehealthPlatform } from '@/app/alternatives/telehealth-prices';
import {
  PLATFORM_API_CONFIG,
  getApiKey,
  isPlatformApiEnabled,
  getEnabledPlatforms,
  type PlatformApiConfig,
} from './telehealth-api-config';

export interface TelehealthApiResponse {
  platforms: TelehealthPlatform[];
  lastUpdated: string;
  source: 'api' | 'cache' | 'mock';
}

/**
 * Fetch real-time prices from Telehealth platform APIs
 * 
 * In production, this would:
 * 1. Call each platform's API endpoint
 * 2. Parse and normalize the response
 * 3. Cache results for a short period (e.g., 5 minutes)
 * 4. Return unified format
 * 
 * @param platformIds - Optional array of platform IDs to fetch. If not provided, fetches all.
 * @returns Promise with platform data
 */
export async function fetchTelehealthPrices(
  platformIds?: string[]
): Promise<TelehealthApiResponse> {
  const targetPlatforms = platformIds || Object.keys(PLATFORM_API_CONFIG);
  const enabledPlatforms = getEnabledPlatforms();
  
  // Fetch from real APIs for enabled platforms
  const apiPromises = targetPlatforms
    .filter((id) => isPlatformApiEnabled(id))
    .map((id) => fetchPlatformFromApi(id));

  // Use mock data for disabled platforms
  const mockPlatforms = targetPlatforms
    .filter((id) => !isPlatformApiEnabled(id))
    .map((id) => getCachedPlatformData(id))
    .filter(Boolean) as TelehealthPlatform[];

  try {
    const apiResults = await Promise.allSettled(apiPromises);
    const apiPlatforms = apiResults
      .filter((result) => result.status === 'fulfilled' && result.value !== null)
      .map((result) => (result as PromiseFulfilledResult<TelehealthPlatform>).value);

    const allPlatforms = [...apiPlatforms, ...mockPlatforms];

    return {
      platforms: allPlatforms,
      lastUpdated: new Date().toISOString(),
      source: apiPlatforms.length > 0 ? 'api' : 'mock',
    };
  } catch (error) {
    console.error('Error fetching telehealth prices:', error);
    // Fallback to mock data
    const filteredPlatforms = targetPlatforms
      .map((id) => getCachedPlatformData(id))
      .filter(Boolean) as TelehealthPlatform[];

    return {
      platforms: filteredPlatforms,
      lastUpdated: new Date().toISOString(),
      source: 'mock',
    };
  }
}

/**
 * Fetch platform data from real API
 */
async function fetchPlatformFromApi(platformId: string): Promise<TelehealthPlatform | null> {
  const config = PLATFORM_API_CONFIG[platformId];
  if (!config || !isPlatformApiEnabled(platformId)) {
    return getCachedPlatformData(platformId);
  }

  try {
    const apiKey = getApiKey(platformId);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add authentication header
    if (config.authHeader && apiKey) {
      if (config.authType === 'bearer') {
        headers[config.authHeader] = `Bearer ${apiKey}`;
      } else if (config.authType === 'api_key') {
        headers[config.authHeader] = apiKey;
      }
    }

    const response = await fetch(config.apiEndpoint, {
      headers,
      method: 'GET',
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const normalized = normalizePlatformData(platformId, data);
    
    if (normalized) {
      return normalized;
    }

    // If normalization fails, fallback to cached data
    return getCachedPlatformData(platformId);
  } catch (error) {
    console.error(`Failed to fetch ${platformId} from API:`, error);
    // Fallback to cached/mock data
    return getCachedPlatformData(platformId);
  }
}

/**
 * Normalize platform data from API response to our format
 * 
 * Each platform API will have different response formats.
 * This function standardizes them.
 * 
 * Implementation guide:
 * 1. Check the API documentation for each platform
 * 2. Map the API response fields to our TelehealthPlatform interface
 * 3. Handle missing or null values gracefully
 * 4. Return null if data is invalid
 */
function normalizePlatformData(
  platformId: string,
  apiData: unknown
): TelehealthPlatform | null {
  // Type guard for API response
  if (!apiData || typeof apiData !== 'object') {
    return null;
  }

  const data = apiData as Record<string, unknown>;
  const cached = getCachedPlatformData(platformId);
  if (!cached) return null;

  try {
    // Example normalization - adjust based on actual API responses
    switch (platformId) {
      case 'henry-meds':
        // Example: Map Henry Meds API response
        return {
          ...cached,
          basePrice: typeof data.monthly_price === 'number' ? data.monthly_price : cached.basePrice,
          totalMonthly: typeof data.total_monthly === 'number' ? data.total_monthly : cached.totalMonthly,
          availability: typeof data.availability === 'string' ? (data.availability as TelehealthPlatform['availability']) : cached.availability,
          lastUpdated: new Date().toISOString(),
        };

      case 'ro':
        // Example: Map Ro API response
        return {
          ...cached,
          basePrice: typeof data.base_price === 'number' ? data.base_price : cached.basePrice,
          totalMonthly: typeof data.total_cost === 'number' ? data.total_cost : cached.totalMonthly,
          availability: typeof data.in_stock === 'boolean' ? (data.in_stock ? 'in-stock' : 'limited') : cached.availability,
          lastUpdated: new Date().toISOString(),
        };

      case 'mochi':
        // Example: Map Mochi Health API response
        return {
          ...cached,
          basePrice: typeof data.medication_price === 'number' ? data.medication_price : cached.basePrice,
          membershipFee: typeof data.membership_fee === 'number' ? data.membership_fee : cached.membershipFee,
          totalMonthly: typeof data.total_monthly === 'number' ? data.total_monthly : cached.totalMonthly,
          availability: typeof data.availability_status === 'string' ? (data.availability_status as TelehealthPlatform['availability']) : cached.availability,
          lastUpdated: new Date().toISOString(),
        };

      default:
        // Generic normalization - try to map common fields
        return {
          ...cached,
          basePrice: typeof data.price === 'number' ? data.price : cached.basePrice,
          totalMonthly: typeof data.totalMonthly === 'number' ? data.totalMonthly : cached.totalMonthly,
          lastUpdated: new Date().toISOString(),
        };
    }
  } catch (error) {
    console.error(`Error normalizing data for ${platformId}:`, error);
    return cached; // Return cached data on error
  }
}

/**
 * Get cached platform data (fallback when API fails)
 */
function getCachedPlatformData(platformId: string): TelehealthPlatform | null {
  return TELEHEALTH_PLATFORMS.find((p) => p.id === platformId) || null;
}

/**
 * Check if cached data is still valid
 * 
 * @param cachedTimestamp - ISO timestamp of cached data
 * @param maxAgeMinutes - Maximum age in minutes (default: 5)
 * @returns true if cache is still valid
 */
export function isCacheValid(cachedTimestamp: string, maxAgeMinutes = 5): boolean {
  const cached = new Date(cachedTimestamp).getTime();
  const now = Date.now();
  const maxAge = maxAgeMinutes * 60 * 1000;
  return now - cached < maxAge;
}
