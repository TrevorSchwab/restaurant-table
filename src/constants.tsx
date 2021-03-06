/* I did think about deriving these values programmatically from the API
   response, but thought that might be over engineered for this project */

export const STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export const GENRES = [
  'American',
  'Asian',
  'Bakery',
  'Belgian',
  'Bistro',
  'British',
  'Cafe',
  'Coffee',
  'Contemporary',
  'Continental',
  'Eclectic',
  'European',
  'French',
  'Fusion',
  'Grill',
  'Hawaiian',
  'International',
  'Irish',
  'Italian',
  'Japanese',
  'Kosher',
  'Oysters',
  'Pacific Rim',
  'Pasta',
  'Polynesian',
  'Sandwiches',
  'Seafood',
  'Steak',
  'Sushi',
  'Tea',
  'Traditional',
  'Vegetarian',
  'Vietnamese',
];

export const ATTIRE = ['Business Casual', 'Casual', 'Formal', 'Smart Casual'];

// I changed this to a CONSTANT instead of a state variable because the value wasn't changing
export const RESTAURANTS_PER_PAGE = 10;
