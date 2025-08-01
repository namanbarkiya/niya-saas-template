import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserProfile } from "@/lib/types/database";

interface ProfileAccountStatusProps {
  profile: UserProfile;
}

export function ProfileAccountStatus({ profile }: ProfileAccountStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Account Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <span className="text-sm font-medium text-green-600">Active</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Plan</span>
          <span className="text-sm font-medium">Free</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last Login</span>
          <span className="text-sm font-medium">Today</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Profile Visibility
          </span>
          <span className="text-sm font-medium">
            {profile?.is_public ? "Public" : "Private"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
