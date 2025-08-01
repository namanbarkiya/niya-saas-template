import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProfileDangerZoneProps {
  onLogout: () => void;
  isLoggingOut: boolean;
}

export function ProfileDangerZone({
  onLogout,
  isLoggingOut,
}: ProfileDangerZoneProps) {
  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <CardTitle className="text-destructive text-lg">Danger Zone</CardTitle>
        <CardDescription>Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="destructive"
          className="w-full justify-start h-12"
          onClick={onLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-3 h-4 w-4" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </CardContent>
    </Card>
  );
}
