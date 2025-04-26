// app/tags/page.jsx
import Tag from "@/components/Tag";

async function fetchTags() {
  const res = await fetch("https://qevent-backend.labs.crio.do/tags", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch tags");
  return res.json();
}

export default async function TagsPage() {
  const tags = await fetchTags();

  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {tags.map((tag) => (
        <Tag key={tag.id} text={tag.name} />
      ))}
    </div>
  );
}
