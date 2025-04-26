"use client";
import {useRouter,useSearchParams} from "next/navigation";
const Tag = (props) => {
  const { text } = props;
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleViewEvents = () => {
    const artist = searchParams.get("artist");
    const params = new URLSearchParams(searchParams.toString());

    // if (artist) params.set("artist", artist);
    params.set("tag", text);

    router.push(`/events?${params.toString()}`);
  }

  return (
    <div className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl w-fit px-3 py-1 text-center font-bold hover:scale-110 hover:cursor-pointer">
      <button onClick={handleViewEvents}># {text}</button>
    </div>
  );
};

export default Tag;
