"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const CreateEventForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    tags: "",
    artist: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/events");
    }
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEventCreate = async (e) => {
    e.preventDefault();

    const eventPayload = {
      id: uuidv4(),
      name: formData.name,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      image: "https://picsum.photos/300/200?random=1",
      artist: formData.artist,
      price: parseFloat(formData.price),
      description: formData.description,
    };

    try {
      const res = await fetch("https://qevent-backend.labs.crio.do/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventPayload),
      });

      if (res.status === 201) {
        alert("Event created successfully!");
        router.push("/events");
      } else {
        alert("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Event creation failed");
    }
  };


  return (
    <form onSubmit={handleEventCreate} className="space-y-4">
      {[
        { id: "name", type: "text", label: "Event Name" },
        { id: "location", type: "text", label: "Location" },
        { id: "date", type: "date", label: "Event Date" },
        { id: "time", type: "time", label: "Event Time" },
        { id: "tags", type: "text", label: "Tags (comma-separated)" },
        { id: "artist", type: "text", label: "Artist" },
        { id: "price", type: "number", label: "Price" },
        { id: "description", type: "textarea", label: "Description" }
      ].map(({ id, type, label }) => (
        <div key={id} className="space-y-2">
          <label htmlFor={id} className="block font-semibold">{label}</label>
          {type === "textarea" ? (
            <textarea
              id={id}
              name={id}
              placeholder={label}
              value={formData[id]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          ) : (
            <input
              type={type}
              id={id}
              name={id}
              placeholder={label}
              value={formData[id]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          )}
        </div>
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Create Event</button>
    </form>
    
  );
};

export default CreateEventForm;
