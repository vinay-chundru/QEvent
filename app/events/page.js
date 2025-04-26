"use client"; 

import { useSearchParams } from "next/navigation";
import { Suspense,useEffect, useState } from "react";
import EventCard from "@/components/EventCard";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const searchParams = useSearchParams();
  // const artistQuery = searchParams.get("artist");
  // const tagQuery = searchParams.get("tag");

  useEffect(() => {
    const artistQuery = searchParams.get("artist");
    const tagQuery = searchParams.get("tag");

    const fetchEvents = async () => {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/events", {
          cache: "no-store",
        });
        const data = await res.json();
        let filteredEvents = data;

        if (artistQuery) {
          filteredEvents = filteredEvents.filter(
            (event) =>event.artist && event.artist.toLowerCase() === artistQuery.toLowerCase()
          );
        }

        if(tagQuery) {
           filteredEvents = filteredEvents.filter (
            (event) => Array.isArray(event.tags)&& event.tags.some(tag => tag.toLowerCase() === tagQuery.toLowerCase())
           );
        }

        
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [searchParams]);


  return (
    <div className="flex flex-wrap justify-center p-4">
      {events.map((event) => (
        <EventCard key={event.id} eventData={event} />
      ))}
    </div>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EventsPage />
  </Suspense>
);


export default SuspenseWrapper;