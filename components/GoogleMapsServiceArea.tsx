'use client';

import { useMemo, useState, useEffect } from 'react';
import { TELEHEALTH_PLATFORMS } from '@/app/alternatives/telehealth-prices';

// Dynamic import for Google Maps to avoid SSR issues
let LoadScript: any;
let GoogleMap: any;
let Marker: any;
let googleMapsAvailable = false;

// Load Google Maps library only on client side
if (typeof window !== 'undefined') {
  try {
    const googleMapsApi = require('@react-google-maps/api');
    LoadScript = googleMapsApi.LoadScript;
    GoogleMap = googleMapsApi.GoogleMap;
    Marker = googleMapsApi.Marker;
    googleMapsAvailable = true;
  } catch (e) {
    // Library not available
    googleMapsAvailable = false;
  }
}

/**
 * Google Maps Service Area Component
 * 
 * Displays an interactive map showing which states each Telehealth platform serves.
 * Requires NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.
 * 
 * Installation:
 * npm install @react-google-maps/api
 */

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 39.8283, // Center of USA
  lng: -98.5795,
};

// US State coordinates (centroids) for markers
const STATE_COORDINATES: Record<string, { lat: number; lng: number }> = {
  AL: { lat: 32.806671, lng: -86.79113 },
  AK: { lat: 61.370716, lng: -152.404419 },
  AZ: { lat: 33.729759, lng: -111.431221 },
  AR: { lat: 34.969704, lng: -92.373123 },
  CA: { lat: 36.116203, lng: -119.681564 },
  CO: { lat: 39.059811, lng: -105.311104 },
  CT: { lat: 41.597782, lng: -72.755371 },
  DE: { lat: 39.318523, lng: -75.507141 },
  FL: { lat: 27.766279, lng: -81.686783 },
  GA: { lat: 33.040619, lng: -83.643074 },
  HI: { lat: 21.094318, lng: -157.498337 },
  ID: { lat: 44.240459, lng: -114.478828 },
  IL: { lat: 40.349457, lng: -88.986137 },
  IN: { lat: 39.849426, lng: -86.258278 },
  IA: { lat: 42.011539, lng: -93.210526 },
  KS: { lat: 38.5266, lng: -96.726486 },
  KY: { lat: 37.66814, lng: -84.670067 },
  LA: { lat: 31.169546, lng: -91.867805 },
  ME: { lat: 44.323535, lng: -69.765261 },
  MD: { lat: 39.063946, lng: -76.802101 },
  MA: { lat: 42.230171, lng: -71.530106 },
  MI: { lat: 43.326618, lng: -84.536095 },
  MN: { lat: 45.694454, lng: -93.900192 },
  MS: { lat: 32.741646, lng: -89.678696 },
  MO: { lat: 38.456085, lng: -92.288368 },
  MT: { lat: 46.921925, lng: -110.454353 },
  NE: { lat: 41.12537, lng: -98.268082 },
  NV: { lat: 38.313515, lng: -117.055374 },
  NH: { lat: 43.452492, lng: -71.563896 },
  NJ: { lat: 40.298904, lng: -74.521011 },
  NM: { lat: 34.840515, lng: -106.248482 },
  NY: { lat: 42.165726, lng: -74.948051 },
  NC: { lat: 35.630066, lng: -79.806419 },
  ND: { lat: 47.528912, lng: -99.784012 },
  OH: { lat: 40.388783, lng: -82.764915 },
  OK: { lat: 35.565342, lng: -96.928917 },
  OR: { lat: 44.572021, lng: -122.070938 },
  PA: { lat: 40.590752, lng: -77.209755 },
  RI: { lat: 41.680893, lng: -71.51178 },
  SC: { lat: 33.856892, lng: -80.945007 },
  SD: { lat: 44.299782, lng: -99.438828 },
  TN: { lat: 35.747845, lng: -86.692345 },
  TX: { lat: 31.054487, lng: -97.563461 },
  UT: { lat: 40.150032, lng: -111.862434 },
  VT: { lat: 44.045876, lng: -72.710686 },
  VA: { lat: 37.769337, lng: -78.169968 },
  WA: { lat: 47.400902, lng: -121.490494 },
  WV: { lat: 38.491226, lng: -80.954453 },
  WI: { lat: 44.268543, lng: -89.616508 },
  WY: { lat: 42.755966, lng: -107.30249 },
};

interface GoogleMapsServiceAreaProps {
  selectedPlatform?: string | null;
}

export default function GoogleMapsServiceArea({ selectedPlatform }: GoogleMapsServiceAreaProps) {
  const [mounted, setMounted] = useState(false);
  
  // Get API key from environment (NEXT_PUBLIC_ prefix makes it available client-side)
  const apiKey = typeof window !== 'undefined' 
    ? (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '')
    : '';

  // Ensure component only renders on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter platforms by selection (hooks must be called unconditionally)
  const platforms = useMemo(() => {
    if (selectedPlatform) {
      return TELEHEALTH_PLATFORMS.filter((p) => p.id === selectedPlatform);
    }
    return TELEHEALTH_PLATFORMS;
  }, [selectedPlatform]);

  // Build markers for states served by platforms (hooks must be called unconditionally)
  const markers = useMemo(() => {
    const stateMarkers: Array<{
      stateCode: string;
      position: { lat: number; lng: number };
      platforms: string[];
    }> = [];

    Object.entries(STATE_COORDINATES).forEach(([stateCode, position]) => {
      const availablePlatforms = platforms.filter((platform) => {
        if (platform.serviceArea === 'all-states') return true;
        if (Array.isArray(platform.serviceArea)) {
          return platform.serviceArea.includes(stateCode);
        }
        return false;
      });

      if (availablePlatforms.length > 0) {
        stateMarkers.push({
          stateCode,
          position,
          platforms: availablePlatforms.map((p) => p.name),
        });
      }
    });

    return stateMarkers;
  }, [platforms]);

  // Don't render on server
  if (!mounted) {
    return (
      <div className="h-[500px] rounded-none border border-slate-200 bg-slate-100 animate-pulse" />
    );
  }

  // Check conditions and render appropriate UI
  if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
    return (
      <div className="rounded-none border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-900">
          <strong>Google Maps API Key Required</strong>
        </p>
        <p className="mt-1 text-xs text-amber-800">
          To enable interactive maps, add <code className="rounded-none bg-amber-100 px-1 py-0.5">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your <code className="rounded-none bg-amber-100 px-1 py-0.5">.env.local</code> file.
        </p>
        <p className="mt-2 text-xs text-amber-700">
          Currently showing static state grid above. Interactive map will appear once API key is configured.
        </p>
      </div>
    );
  }

  if (!googleMapsAvailable || !LoadScript || !GoogleMap || !Marker) {
    return (
      <div className="rounded-none border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-900">
          <strong>Google Maps Library Required</strong>
        </p>
        <p className="mt-1 text-xs text-amber-800">
          To enable interactive maps, install the Google Maps library:
        </p>
        <code className="mt-2 block rounded-none bg-amber-100 px-2 py-1 text-xs">
          npm install @react-google-maps/api
        </code>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={4} center={center}>
        {markers.map((marker, index) => (
          <Marker
            key={`${marker.stateCode}-${index}`}
            position={marker.position}
            label={marker.stateCode}
            title={`${marker.stateCode}: ${marker.platforms.join(', ')}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
