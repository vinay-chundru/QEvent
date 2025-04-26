
// app/events/page.jsx
import ArtistCard from "@/components/ArtistCard";

async function fetchArtists() {
  const res = await fetch("https://qevent-backend.labs.crio.do/artists", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export default async function ArtistsPage() {
  const artists = await fetchArtists();

  return (
    <div className="flex flex-wrap justify-center p-4">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artistData={artist} />
      ))}
    </div>
  );
}
