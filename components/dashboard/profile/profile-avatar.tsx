import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserProfile } from "@/lib/types/database";

interface ProfileAvatarProps {
  displayName: string;
  avatarUrl?: string;
  profile: UserProfile | null;
  user: { name?: string; email?: string; avatar_url?: string } | null;
}

export function ProfileAvatar({
  displayName,
  avatarUrl,
  profile,
  user,
}: ProfileAvatarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
        <AvatarImage src={avatarUrl} alt={displayName} />
        <AvatarFallback className="text-lg sm:text-xl">
          {displayName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="text-center sm:text-left">
        <h3 className="text-base sm:text-lg font-medium">{displayName}</h3>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Member since{" "}
          {profile?.created_at
            ? new Date(profile.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Unknown"}
        </p>
      </div>
    </div>
  );
}
