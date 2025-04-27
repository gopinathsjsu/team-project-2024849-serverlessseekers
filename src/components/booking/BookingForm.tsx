import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Clock, Users, CalendarIcon, MessageSquare } from 'lucide-react';
import Button from '../common/Button';
import { Restaurant, TimeSlot } from '../../types';
import useAuthStore from '../../store/authStore';
import useBookingStore from '../../store/bookingStore';
import 'react-datepicker/dist/react-datepicker.css';

interface BookingFormProps {
  restaurant: Restaurant;
  timeSlots: TimeSlot[];
  initialDate?: Date;
  initialTime?: string;
  initialPartySize?: number;
}

const BookingForm: React.FC<BookingFormProps> = ({
  restaurant,
  timeSlots,
  initialDate = new Date(),
  initialTime,
  initialPartySize = 2,
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { createBooking, isLoading } = useBookingStore();
  
  const [date, setDate] = useState<Date>(initialDate);
  const [time, setTime] = useState<string>(initialTime || (timeSlots.length > 0 ? timeSlots[0].time : '19:00'));
  const [partySize, setPartySize] = useState<number>(initialPartySize);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(
    initialTime ? timeSlots.findIndex(slot => slot.time === initialTime) : 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      // Save booking details to session storage
      sessionStorage.setItem('pendingBooking', JSON.stringify({
        restaurantId: restaurant.id,
        date: date.toISOString().split('T')[0],
        time,
        partySize,
        specialRequests
      }));
      
      navigate('/login?redirect=pending-booking');
      return;
    }
    
    try {
      await createBooking({
        restaurantId: restaurant.id,
        userId: user.id,
        date: date.toISOString().split('T')[0],
        time,
        partySize,
        specialRequests: specialRequests || undefined,
      });
      
      // Redirect to confirmation page
      navigate('/booking/confirmation');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const handleTimeSelect = (index: number) => {
    setSelectedTimeIndex(index);
    setTime(timeSlots[index].time);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-6">
      <h3 className="text-xl font-semibold text-neutral-800 mb-4">Make a Reservation</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="partySize" className="block text-sm font-medium text-neutral-700 mb-1">
            Party Size
          </label>
          <div className="relative">
            <select
              id="partySize"
              value={partySize}
              onChange={(e) => setPartySize(parseInt(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">
            Date
          </label>
          <div className="relative">
            <DatePicker
              selected={date}
              onChange={(date: Date) => setDate(date)}
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              id="date"
            />
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Time
          </label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot, index) => (
              <button
                key={slot.time}
                type="button"
                className={`time-slot ${
                  index === selectedTimeIndex
                    ? 'time-slot-selected'
                    : slot.available
                    ? 'time-slot-available'
                    : 'time-slot-unavailable'
                }`}
                onClick={() => slot.available && handleTimeSelect(index)}
                disabled={!slot.available}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="specialRequests" className="block text-sm font-medium text-neutral-700 mb-1">
            Special Requests (optional)
          </label>
          <div className="relative">
            <textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requests or dietary restrictions?"
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
            />
            <MessageSquare className="absolute left-3 top-3 text-neutral-400" size={18} />
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
        >
          {isAuthenticated ? 'Complete Reservation' : 'Sign in to Book'}
        </Button>
        
        <div className="mt-4 text-sm text-neutral-500 text-center">
          <Clock size={14} className="inline-block mr-1" />
          <span>This table will be held for 5 minutes after booking</span>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;