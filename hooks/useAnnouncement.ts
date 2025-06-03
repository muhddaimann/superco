import { useState } from "react";
import { useTheme } from "react-native-paper";

export type NotificationTag = "Update" | "Reminder" | "Alert";
export type NotificationBy = "System" | "Admin" | "HR" | "Project Manager";

export type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
  tag: NotificationTag;
  by: NotificationBy;
  bgColor: string;
  textColor: string;
};

export const useNotification = () => {
  const theme = useTheme();

  const getTagStyle = (tag: NotificationTag) => {
    switch (tag) {
      case "Alert":
        return {
          bgColor: theme.colors.error,
          textColor: theme.colors.onError,
        };
      case "Reminder":
        return {
          bgColor: theme.colors.secondary,
          textColor: theme.colors.onSecondary,
        };
      case "Update":
      default:
        return {
          bgColor: theme.colors.tertiary,
          textColor: theme.colors.onTertiary,
        };
    }
  };

  const getByStyle = (by: NotificationBy) => {
    switch (by) {
      case "System":
        return {
          bgColor: theme.colors.primaryContainer,
          textColor: theme.colors.onPrimaryContainer,
        };
      case "Admin":
        return {
          bgColor: theme.colors.secondaryContainer,
          textColor: theme.colors.onSecondaryContainer,
        };
      case "HR":
        return {
          bgColor: theme.colors.tertiaryContainer,
          textColor: theme.colors.onTertiaryContainer,
        };
      case "Project Manager":
      default:
        return {
          bgColor: theme.colors.surfaceVariant,
          textColor: theme.colors.onSurfaceVariant,
        };
    }
  };

  const [notifications] = useState<Notification[]>(() =>
    [
      {
        id: "1",
        title: "Profile Update Required",
        message: "Please update your emergency contact info in your profile.",
        date: "2025-05-30",
        tag: "Reminder" as const,
        by: "HR" as const,
      },
      {
        id: "2",
        title: "System Maintenance",
        message: "Scheduled downtime this weekend from 10PM–6AM.",
        date: "2025-05-29",
        tag: "Alert" as const,
        by: "System" as const,
      },
      {
        id: "3",
        title: "New Project Phase",
        message: "Phase 2 of Project Phoenix begins next Monday.",
        date: "2025-05-28",
        tag: "Update" as const,
        by: "Project Manager" as const,
      },
      {
        id: "4",
        title: "Company Policy Reminder",
        message: "Please review the latest data privacy policy.",
        date: "2025-05-27",
        tag: "Reminder" as const,
        by: "Admin" as const,
      },
      {
        id: "5",
        title: "Profile Update Required",
        message: "Please update your emergency contact info in your profile.",
        date: "2025-05-30",
        tag: "Reminder" as const,
        by: "HR" as const,
      },
      {
        id: "6",
        title: "System Maintenance",
        message: "Scheduled downtime this weekend from 10PM–6AM.",
        date: "2025-05-29",
        tag: "Alert" as const,
        by: "System" as const,
      },
      {
        id: "7",
        title: "New Project Phase",
        message: "Phase 2 of Project Phoenix begins next Monday.",
        date: "2025-05-28",
        tag: "Update" as const,
        by: "Project Manager" as const,
      },
      {
        id: "8",
        title: "Company Policy Reminder",
        message: "Please review the latest data privacy policy.",
        date: "2025-05-27",
        tag: "Reminder" as const,
        by: "Admin" as const,
      },
            {
        id: "9",
        title: "Profile Update Required",
        message: "Please update your emergency contact info in your profile.",
        date: "2025-05-30",
        tag: "Reminder" as const,
        by: "HR" as const,
      },
      {
        id: "10",
        title: "System Maintenance",
        message: "Scheduled downtime this weekend from 10PM–6AM.",
        date: "2025-05-29",
        tag: "Alert" as const,
        by: "System" as const,
      },
      {
        id: "11",
        title: "New Project Phase",
        message: "Phase 2 of Project Phoenix begins next Monday.",
        date: "2025-05-28",
        tag: "Update" as const,
        by: "Project Manager" as const,
      },
      {
        id: "12",
        title: "Company Policy Reminder",
        message: "Please review the latest data privacy policy.",
        date: "2025-05-27",
        tag: "Reminder" as const,
        by: "Admin" as const,
      },
    ].map((n) => ({
      ...n,
      ...getTagStyle(n.tag),
    }))
  );

  return {
    notifications,
    getTagStyle,
    getByStyle,
  };
};
