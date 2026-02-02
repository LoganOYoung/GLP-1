/**
 * Personalization Engine - AI + Data Driven Recommendations
 * Tracks user behavior and provides personalized recommendations
 * Pure frontend implementation using localStorage
 */

export interface UserBehavior {
  viewedPages: string[];
  selectedOptions: {
    calculator?: {
      insuranceProvider?: string;
      comorbidities?: string[];
      preferredPath?: 'brand' | 'compounded' | 'oral';
    };
    alternatives?: {
      selectedPharmacy?: string;
      selectedDrug?: string;
    };
  };
  interactions: {
    clickedLinks: string[];
    timeSpent: Record<string, number>; // page -> seconds
  };
  lastVisit?: string;
}

const STORAGE_KEY = 'glp1_user_behavior';

/**
 * Get user behavior from localStorage
 */
export function getUserBehavior(): UserBehavior {
  if (typeof window === 'undefined') {
    return {
      viewedPages: [],
      selectedOptions: {},
      interactions: { clickedLinks: [], timeSpent: {} },
    };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {
      viewedPages: [],
      selectedOptions: {},
      interactions: { clickedLinks: [], timeSpent: {} },
    };
  } catch {
    return {
      viewedPages: [],
      selectedOptions: {},
      interactions: { clickedLinks: [], timeSpent: {} },
    };
  }
}

/**
 * Save user behavior to localStorage
 */
export function saveUserBehavior(behavior: UserBehavior): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(behavior));
  } catch (error) {
    console.error('Failed to save user behavior:', error);
  }
}

/**
 * Track page view
 */
export function trackPageView(page: string): void {
  const behavior = getUserBehavior();
  if (!behavior.viewedPages.includes(page)) {
    behavior.viewedPages.push(page);
  }
  behavior.lastVisit = new Date().toISOString();
  saveUserBehavior(behavior);
}

/**
 * Track user selection in calculator
 */
export function trackCalculatorSelection(
  insuranceProvider?: string,
  comorbidities?: string[],
  preferredPath?: 'brand' | 'compounded' | 'oral'
): void {
  const behavior = getUserBehavior();
  behavior.selectedOptions.calculator = {
    insuranceProvider,
    comorbidities,
    preferredPath,
  };
  saveUserBehavior(behavior);
}

/**
 * Track link click
 */
export function trackLinkClick(url: string): void {
  const behavior = getUserBehavior();
  if (!behavior.interactions.clickedLinks.includes(url)) {
    behavior.interactions.clickedLinks.push(url);
  }
  saveUserBehavior(behavior);
}

/**
 * Get personalized recommendations based on behavior
 */
export function getPersonalizedRecommendations(): {
  recommendedPath: 'brand' | 'compounded' | 'oral' | null;
  recommendedPage: string | null;
  reasoning: string[];
} {
  const behavior = getUserBehavior();
  const recommendations: {
    recommendedPath: 'brand' | 'compounded' | 'oral' | null;
    recommendedPage: string | null;
    reasoning: string[];
  } = {
    recommendedPath: null,
    recommendedPage: null,
    reasoning: [],
  };

  // Analyze calculator selections
  const calculator = behavior.selectedOptions.calculator;
  if (calculator) {
    // If user has no insurance or selected compounded path
    if (calculator.insuranceProvider === 'none' || calculator.preferredPath === 'compounded') {
      recommendations.recommendedPath = 'compounded';
      recommendations.recommendedPage = '/alternatives';
      recommendations.reasoning.push('Based on your calculator selections, compounded options may be most cost-effective');
    }
    // If user has diabetes comorbidity
    else if (calculator.comorbidities?.includes('diabetes')) {
      recommendations.recommendedPath = 'brand';
      recommendations.recommendedPage = '/calculator';
      recommendations.reasoning.push('With diabetes, brand medications often have better insurance coverage');
    }
    // If user prefers oral
    else if (calculator.preferredPath === 'oral') {
      recommendations.recommendedPath = 'oral';
      recommendations.recommendedPage = '/alternatives';
      recommendations.reasoning.push('Oral options may be more convenient for your lifestyle');
    }
  }

  // Analyze page views - if user viewed alternatives multiple times
  const alternativesViews = behavior.viewedPages.filter((p) => p.includes('alternatives')).length;
  if (alternativesViews > 2) {
    recommendations.recommendedPage = '/alternatives';
    recommendations.reasoning.push('You\'ve shown interest in alternatives - check our latest comparisons');
  }

  // Analyze clicked links - if user clicked on compounded links
  const compoundedClicks = behavior.interactions.clickedLinks.filter((l) =>
    l.toLowerCase().includes('compounded')
  ).length;
  if (compoundedClicks > 0 && !recommendations.recommendedPath) {
    recommendations.recommendedPath = 'compounded';
    recommendations.reasoning.push('Based on your browsing history, compounded options may interest you');
  }

  return recommendations;
}

/**
 * Get "similar users" statistics (simulated)
 */
export function getSimilarUsersStats(
  insuranceProvider?: string,
  comorbidities?: string[]
): {
  mostChosenPath: 'brand' | 'compounded' | 'oral';
  percentage: number;
  averageCost: number;
} {
  // Simulated data - in production, this would come from backend analytics
  const stats: Record<string, { path: 'brand' | 'compounded' | 'oral'; cost: number }> = {
    'none': { path: 'compounded', cost: 299 },
    'medicare': { path: 'brand', cost: 250 },
    'diabetes': { path: 'brand', cost: 200 },
    'default': { path: 'compounded', cost: 350 },
  };

  let key = 'default';
  if (insuranceProvider === 'none') key = 'none';
  else if (insuranceProvider === 'medicare') key = 'medicare';
  else if (comorbidities?.includes('diabetes')) key = 'diabetes';

  const result = stats[key] || stats.default;
  
  return {
    mostChosenPath: result.path,
    percentage: Math.floor(Math.random() * 20) + 65, // 65-85%
    averageCost: result.cost,
  };
}

/**
 * Track time spent on page
 */
export function trackTimeSpent(page: string, seconds: number): void {
  const behavior = getUserBehavior();
  behavior.interactions.timeSpent[page] = (behavior.interactions.timeSpent[page] || 0) + seconds;
  saveUserBehavior(behavior);
}
