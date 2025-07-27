import { TweetCard } from "@/components/ui/magicui/tweet-card";

const tweets = [
  { id: "1678577280489234432", key: 4 },
  { id: "1675849118445436929", key: 1 },
  { id: "1675849118445436929", key: 5 },
  { id: "1668408059125702661", key: 2 },
];

export default function TweetGallery() {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
      {tweets.map((tweet) => (
        <div key={tweet.key} className="mb-6 break-inside-avoid">
          <TweetCard id={tweet.id} className="h-fit" />
        </div>
      ))}
    </div>
  );
}
