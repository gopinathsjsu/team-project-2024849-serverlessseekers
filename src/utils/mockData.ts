import { User, UserRole, Restaurant, Review, Booking, BookingStatus } from '../types';
import { format, subDays, addDays } from 'date-fns';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    role: UserRole.Customer,
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: UserRole.Customer,
  },
  {
    id: '3',
    email: 'manager@italianplace.com',
    name: 'Mario Rossi',
    role: UserRole.RestaurantManager,
  },
  {
    id: '4',
    email: 'manager@sushispot.com',
    name: 'Takashi Yamamoto',
    role: UserRole.RestaurantManager,
  },
  {
    id: '5',
    email: 'admin@booktable.com',
    name: 'Admin User',
    role: UserRole.Admin,
  },
];

// Mock Restaurants
export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Italian Place',
    description: 'Authentic Italian cuisine featuring handmade pasta and wood-fired pizzas in a cozy, rustic setting.',
    cuisine: 'Italian',
    priceRange: 3,
    address: {
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
      latitude: 37.7892,
      longitude: -122.4009,
    },
    contactInfo: {
      phone: '(415) 555-1234',
      email: 'info@italianplace.com',
      website: 'https://italianplace.com',
    },
    hours: {
      monday: { open: '11:00', close: '22:00' },
      tuesday: { open: '11:00', close: '22:00' },
      wednesday: { open: '11:00', close: '22:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '11:00', close: '23:00' },
      saturday: { open: '10:00', close: '23:00' },
      sunday: { open: '10:00', close: '22:00' },
    },
    images: [
      'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg',
      'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg',
      'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg',
    ],
    rating: 4.7,
    reviewCount: 245,
    bookingsToday: 18,
    isApproved: true,
    createdAt: '2023-01-15T14:23:45Z',
    updatedAt: '2023-03-10T09:12:30Z',
    managerId: '3',
  },
  {
    id: '2',
    name: 'Sushi Spot',
    description: 'Premium sushi and Japanese cuisine made with the freshest ingredients and traditional techniques.',
    cuisine: 'Japanese',
    priceRange: 4,
    address: {
      street: '456 Market Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'USA',
      latitude: 37.7879,
      longitude: -122.4075,
    },
    contactInfo: {
      phone: '(415) 555-5678',
      email: 'info@sushispot.com',
      website: 'https://sushispot.com',
    },
    hours: {
      monday: { open: '17:00', close: '23:00' },
      tuesday: { open: '17:00', close: '23:00' },
      wednesday: { open: '17:00', close: '23:00' },
      thursday: { open: '17:00', close: '23:00' },
      friday: { open: '17:00', close: '00:00' },
      saturday: { open: '17:00', close: '00:00' },
      sunday: { open: '17:00', close: '22:00' },
    },
    images: [
      'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
      'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg',
      'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg',
    ],
    rating: 4.9,
    reviewCount: 189,
    bookingsToday: 14,
    isApproved: true,
    createdAt: '2023-02-05T10:45:12Z',
    updatedAt: '2023-04-20T16:30:45Z',
    managerId: '4',
  },
  {
    id: '3',
    name: 'Burger Joint',
    description: 'Gourmet burgers made with locally-sourced ingredients and house-made sauces.',
    cuisine: 'American',
    priceRange: 2,
    address: {
      street: '789 Valencia Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
      country: 'USA',
      latitude: 37.761,
      longitude: -122.4222,
    },
    contactInfo: {
      phone: '(415) 555-9876',
      email: 'info@burgerjoint.com',
    },
    hours: {
      monday: { open: '11:30', close: '21:00' },
      tuesday: { open: '11:30', close: '21:00' },
      wednesday: { open: '11:30', close: '21:00' },
      thursday: { open: '11:30', close: '21:00' },
      friday: { open: '11:30', close: '22:00' },
      saturday: { open: '11:30', close: '22:00' },
      sunday: { open: '11:30', close: '21:00' },
    },
    images: [
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
      'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
      'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg',
    ],
    rating: 4.5,
    reviewCount: 312,
    bookingsToday: 22,
    isApproved: true,
    createdAt: '2023-01-25T11:34:23Z',
    updatedAt: '2023-04-15T13:12:50Z',
    managerId: '3',
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    description: 'Authentic Mexican street tacos and traditional dishes made with family recipes.',
    cuisine: 'Mexican',
    priceRange: 2,
    address: {
      street: '123 16th Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94114',
      country: 'USA',
      latitude: 37.7648,
      longitude: -122.4321,
    },
    contactInfo: {
      phone: '(415) 555-3456',
      email: 'info@tacofiesta.com',
      website: 'https://tacofiesta.com',
    },
    hours: {
      monday: { open: '11:00', close: '21:00' },
      tuesday: { open: '11:00', close: '21:00' },
      wednesday: { open: '11:00', close: '21:00' },
      thursday: { open: '11:00', close: '21:00' },
      friday: { open: '11:00', close: '23:00' },
      saturday: { open: '11:00', close: '23:00' },
      sunday: { open: '11:00', close: '21:00' },
    },
    images: [
      'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg',
      'https://images.pexels.com/photos/2092897/pexels-photo-2092897.jpeg',
      'https://images.pexels.com/photos/5510068/pexels-photo-5510068.jpeg',
    ],
    rating: 4.3,
    reviewCount: 178,
    bookingsToday: 16,
    isApproved: true,
    createdAt: '2023-03-01T09:23:12Z',
    updatedAt: '2023-04-25T14:45:30Z',
    managerId: '4',
  },
  {
    id: '5',
    name: 'Golden Dragon',
    description: 'Traditional Chinese cuisine featuring dim sum, Cantonese specialties, and Sichuan dishes.',
    cuisine: 'Chinese',
    priceRange: 3,
    address: {
      street: '456 Grant Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94108',
      country: 'USA',
      latitude: 37.7927,
      longitude: -122.4065,
    },
    contactInfo: {
      phone: '(415) 555-7890',
      email: 'info@goldendragon.com',
      website: 'https://goldendragon.com',
    },
    hours: {
      monday: { open: '11:00', close: '22:00' },
      tuesday: { open: '11:00', close: '22:00' },
      wednesday: { open: '11:00', close: '22:00' },
      thursday: { open: '11:00', close: '22:00' },
      friday: { open: '11:00', close: '23:00' },
      saturday: { open: '10:30', close: '23:00' },
      sunday: { open: '10:30', close: '22:00' },
    },
    images: [
      'https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg',
      'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg',
      'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg',
    ],
    rating: 4.6,
    reviewCount: 230,
    bookingsToday: 20,
    isApproved: true,
    createdAt: '2023-02-10T13:12:45Z',
    updatedAt: '2023-04-18T11:34:20Z',
    managerId: '3',
  },
  {
    id: '6',
    name: 'Parisian Bistro',
    description: 'Classic French cuisine in an elegant setting, featuring fresh seafood and seasonal ingredients.',
    cuisine: 'French',
    priceRange: 4,
    address: {
      street: '789 Bush Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94108',
      country: 'USA',
      latitude: 37.7897,
      longitude: -122.4095,
    },
    contactInfo: {
      phone: '(415) 555-2345',
      email: 'info@parisianbistro.com',
      website: 'https://parisianbistro.com',
    },
    hours: {
      monday: { open: '17:30', close: '22:00' },
      tuesday: { open: '17:30', close: '22:00' },
      wednesday: { open: '17:30', close: '22:00' },
      thursday: { open: '17:30', close: '22:00' },
      friday: { open: '17:30', close: '23:00' },
      saturday: { open: '17:30', close: '23:00' },
      sunday: { open: '17:30', close: '22:00' },
    },
    images: [
      'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg',
      'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      'https://images.pexels.com/photos/299348/pexels-photo-299348.jpeg',
    ],
    rating: 4.8,
    reviewCount: 156,
    bookingsToday: 12,
    isApproved: true,
    createdAt: '2023-03-15T14:23:45Z',
    updatedAt: '2023-04-22T15:12:30Z',
    managerId: '4',
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    restaurantId: '1',
    userId: '1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Amazing pasta and excellent service! The tiramisu was to die for.',
    date: '2023-04-12T18:30:00Z',
  },
  {
    id: '2',
    restaurantId: '1',
    userId: '2',
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Great food and atmosphere. A bit loud on Friday nights but still worth it.',
    date: '2023-04-08T19:45:00Z',
  },
  {
    id: '3',
    restaurantId: '2',
    userId: '1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Best sushi in the city! The omakase was incredible.',
    date: '2023-04-15T20:15:00Z',
  },
  {
    id: '4',
    restaurantId: '3',
    userId: '2',
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Delicious burgers and great craft beer selection.',
    date: '2023-04-05T12:30:00Z',
  },
  {
    id: '5',
    restaurantId: '4',
    userId: '1',
    userName: 'John Doe',
    rating: 3,
    comment: 'Good tacos but service was a bit slow.',
    date: '2023-04-10T13:45:00Z',
  },
];

// Generate mock bookings across multiple dates
const today = new Date();
const generateBookings = () => {
  const bookings: Booking[] = [];
  const statuses = [BookingStatus.Pending, BookingStatus.Confirmed, BookingStatus.Cancelled, BookingStatus.Completed];
  const times = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];
  
  // Generate bookings for the past 14 days and next 14 days
  for (let i = -14; i <= 14; i++) {
    const date = format(addDays(today, i), 'yyyy-MM-dd');
    const numBookings = Math.floor(Math.random() * 10) + 5; // 5-15 bookings per day
    
    for (let j = 0; j < numBookings; j++) {
      const restaurantId = String(Math.floor(Math.random() * 6) + 1);
      const userId = String(Math.floor(Math.random() * 2) + 1);
      const timeIndex = Math.floor(Math.random() * times.length);
      const partySize = Math.floor(Math.random() * 6) + 1;
      
      // Past bookings should be completed or cancelled, future bookings pending or confirmed
      let statusIndex = 0;
      if (i < 0) {
        // Past bookings: completed or cancelled
        statusIndex = Math.random() > 0.2 ? 3 : 2; // 80% completed, 20% cancelled
      } else {
        // Future bookings: pending or confirmed
        statusIndex = Math.random() > 0.3 ? 1 : 0; // 70% confirmed, 30% pending
      }

      bookings.push({
        id: `booking-${date}-${j}`,
        restaurantId,
        userId,
        date,
        time: times[timeIndex],
        partySize,
        status: statuses[statusIndex],
        specialRequests: Math.random() > 0.7 ? 'Window seat please' : undefined,
        createdAt: format(subDays(today, Math.abs(i) + Math.floor(Math.random() * 5)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        updatedAt: format(subDays(today, Math.abs(i)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      });
    }
  }
  
  return bookings;
};

export const mockBookings: Booking[] = generateBookings();

// Generate analytics mock data
export const generateAnalytics = (): any => {
  // Filter bookings for the last 30 days
  const thirtyDaysAgo = subDays(today, 30);
  const recentBookings = mockBookings.filter(booking => 
    new Date(booking.date) >= thirtyDaysAgo && new Date(booking.date) <= today
  );

  // Count bookings by status
  const totalBookings = recentBookings.length;
  const completedBookings = recentBookings.filter(b => b.status === BookingStatus.Completed).length;
  const cancelledBookings = recentBookings.filter(b => b.status === BookingStatus.Cancelled).length;
  
  // Calculate average party size
  const totalPartySize = recentBookings.reduce((sum, booking) => sum + booking.partySize, 0);
  const averagePartySize = totalBookings > 0 ? totalPartySize / totalBookings : 0;
  
  // Count bookings by day
  const bookingsByDay: { date: string; count: number }[] = [];
  for (let i = 0; i < 30; i++) {
    const date = format(subDays(today, i), 'yyyy-MM-dd');
    const count = recentBookings.filter(b => b.date === date).length;
    bookingsByDay.push({ date, count });
  }
  
  // Count bookings by restaurant
  const bookingsByRestaurant = mockRestaurants.map(restaurant => ({
    name: restaurant.name,
    count: recentBookings.filter(b => b.restaurantId === restaurant.id).length,
  }));
  
  // Get top restaurants
  const topRestaurants = [...bookingsByRestaurant].sort((a, b) => b.count - a.count).slice(0, 5);
  
  return {
    totalBookings,
    completedBookings,
    cancelledBookings,
    averagePartySize,
    bookingsByDay: bookingsByDay.reverse(), // Chronological order
    bookingsByRestaurant,
    topRestaurants,
  };
};