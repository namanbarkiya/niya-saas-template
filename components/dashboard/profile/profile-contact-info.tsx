import { MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UpdateUserProfileInput } from "@/lib/types/database";

interface ProfileContactInfoProps {
  formData: UpdateUserProfileInput;
  setFormData: (data: UpdateUserProfileInput) => void;
  isEditing: boolean;
}

export function ProfileContactInfo({
  formData,
  setFormData,
  isEditing,
}: ProfileContactInfoProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm text-muted-foreground">
        Contact Information
      </h4>

      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Phone
        </Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          disabled={!isEditing}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Country
        </Label>
        <Input
          id="country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          disabled={!isEditing}
          placeholder="United States"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Input
            id="timezone"
            value={formData.timezone}
            onChange={(e) =>
              setFormData({ ...formData, timezone: e.target.value })
            }
            disabled={!isEditing}
            placeholder="UTC"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="locale">Locale</Label>
          <Input
            id="locale"
            value={formData.locale}
            onChange={(e) =>
              setFormData({ ...formData, locale: e.target.value })
            }
            disabled={!isEditing}
            placeholder="en"
          />
        </div>
      </div>
    </div>
  );
}
