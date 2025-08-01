import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UpdateUserProfileInput } from "@/lib/types/database";

interface ProfileBasicInfoProps {
  formData: UpdateUserProfileInput;
  setFormData: (data: UpdateUserProfileInput) => void;
  isEditing: boolean;
}

export function ProfileBasicInfo({
  formData,
  setFormData,
  isEditing,
}: ProfileBasicInfoProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm text-muted-foreground">
        Basic Information
      </h4>

      <div className="space-y-2">
        <Label htmlFor="full_name" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Full Name
        </Label>
        <Input
          id="full_name"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
          disabled={!isEditing}
          placeholder="Enter your full name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="display_name" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Display Name
        </Label>
        <Input
          id="display_name"
          value={formData.display_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              display_name: e.target.value,
            })
          }
          disabled={!isEditing}
          placeholder="Enter your display name"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                first_name: e.target.value,
              })
            }
            disabled={!isEditing}
            placeholder="First name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                last_name: e.target.value,
              })
            }
            disabled={!isEditing}
            placeholder="Last name"
          />
        </div>
      </div>
    </div>
  );
}
