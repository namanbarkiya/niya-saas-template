import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  displayName: string;
  avatarUrl?: string;
  profile: any;
  user: any;
}

export function ProfileAvatar({
  displayName,
  avatarUrl,
  profile,
  user,
}: ProfileAvatarProps) {
  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-20 w-20">
        <AvatarImage src={avatarUrl} alt={displayName} />
        <AvatarFallback className="text-xl">
          {displayName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-medium">{displayName}</h3>
        <p className="text-muted-foreground">{user?.email}</p>
        <p className="text-sm text-muted-foreground mt-1">
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
