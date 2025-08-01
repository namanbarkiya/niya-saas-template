import { Bell, Eye, EyeOff, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { UpdateUserProfileInput } from "@/lib/types/database";

interface ProfilePrivacySettingsProps {
  formData: UpdateUserProfileInput;
  setFormData: (data: UpdateUserProfileInput) => void;
  isEditing: boolean;
}

export function ProfilePrivacySettings({
  formData,
  setFormData,
  isEditing,
}: ProfilePrivacySettingsProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm text-muted-foreground">
        Privacy & Notifications
      </h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="flex items-center gap-2">
              {formData.is_public ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
              Public Profile
            </Label>
            <p className="text-sm text-muted-foreground">
              Allow others to view your profile
            </p>
          </div>
          <Switch
            checked={formData.is_public}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, is_public: checked })
            }
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Notifications
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive email notifications
            </p>
          </div>
          <Switch
            checked={formData.email_notifications}
            onCheckedChange={(checked) =>
              setFormData({
                ...formData,
                email_notifications: checked,
              })
            }
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Push Notifications
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications
            </p>
          </div>
          <Switch
            checked={formData.push_notifications}
            onCheckedChange={(checked) =>
              setFormData({
                ...formData,
                push_notifications: checked,
              })
            }
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Marketing Emails
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive marketing and promotional emails
            </p>
          </div>
          <Switch
            checked={formData.marketing_emails}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, marketing_emails: checked })
            }
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
}
