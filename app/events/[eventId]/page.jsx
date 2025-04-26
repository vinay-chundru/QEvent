'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!eventId) return;
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://qevent-backend.labs.crio.do/events/${eventId}`);
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (!event) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-center">
        <img
          src={event.image}
          alt={event.name}
          className="rounded-md shadow-md"
        />
      </div>

      <h1 className=" text-4xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4">{event.name}</h1>
      <p className="text-3xl text-lg font-medium bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4" >{event.location}</p>
      <p className="text-3xl text-lg font-medium bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4">{event.artist}</p>

      <div className="flex gap-2 mb-2 mt-8">
        {event.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl w-fit px-3 py-1 text-center font-bold hover:scale-110 hover:cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      <p className="text-gray-700 leading-7 mb-6 text-justify">
        {event.description}
      </p>

   <div className="flex items-center justify-between mb-6">
      <p className="text-2xl font-bold text-green-600">${event.price}</p>
      <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md">
        Buy Tickets
      </button>
   </div>
    </div>
  );
};

export default EventDetailsPage;
