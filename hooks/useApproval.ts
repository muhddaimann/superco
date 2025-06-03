import { useState } from "react";
import { useTheme } from "react-native-paper";

export type ApprovalStatus = "Pending" | "Approved" | "Cancelled";
export type ApprovalType = "Leave" | "Overtime";

export type ApprovalItem = {
  id: string;
  name: string;
  type: ApprovalType;
  date: string;
  reason: string;
  status: ApprovalStatus;
  bgColor?: string;
  textColor?: string;
};

export const useApproval = () => {
  const theme = useTheme();

  const getStatusStyle = (status: ApprovalStatus) => {
    switch (status) {
      case "Pending":
        return {
          bgColor: theme.colors.secondary,
          textColor: theme.colors.onSecondary,
        };
      case "Approved":
        return {
          bgColor: theme.colors.primary,
          textColor: theme.colors.onPrimary,
        };
      case "Cancelled":
      default:
        return {
          bgColor: theme.colors.error,
          textColor: theme.colors.onError,
        };
    }
  };

  const dummyApprovals: ApprovalItem[] = [
    {
      id: "1",
      name: "John Doe",
      type: "Leave" as const,
      date: "1 Jun 2025",
      reason: "Medical Leave",
      status: "Pending" as const,
    },
    {
      id: "2",
      name: "Jane Smith",
      type: "Overtime" as const,
      date: "31 May 2025",
      reason: "Project Deadline",
      status: "Approved" as const,
    },
    {
      id: "3",
      name: "Mark Lee",
      type: "Leave" as const,
      date: "30 May 2025",
      reason: "Annual Leave",
      status: "Cancelled" as const,
    },
    {
      id: "4",
      name: "Aisha Tan",
      type: "Overtime" as const,
      date: "29 May 2025",
      reason: "Urgent Fix",
      status: "Pending" as const,
    },
    {
      id: "5",
      name: "Fikri Zain",
      type: "Leave" as const,
      date: "28 May 2025",
      reason: "Personal",
      status: "Approved" as const,
    },
  ].map((item) => ({
    ...item,
    ...getStatusStyle(item.status),
  }));

  const [approvals] = useState<ApprovalItem[]>(dummyApprovals);

  const getByType = (type: ApprovalType) =>
    approvals.filter((item) => item.type === type);

  const getByStatus = (status: ApprovalStatus | "All") =>
    status === "All"
      ? approvals
      : approvals.filter((item) => item.status === status);

  const getByTypeAndStatus = (
    type: ApprovalType,
    status: ApprovalStatus | "All"
  ) => getByStatus(status).filter((item) => item.type === type);

  return {
    approvals,
    getByType,
    getByStatus,
    getByTypeAndStatus,
    getStatusStyle,
  };
};
