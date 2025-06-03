export type Option = {
  label: string;
  value: string;
};

export const useOption = (): { teamOptions: Option[] } => {
  const teamOptions: Option[] = [
    { label: "Web", value: "web" },
    { label: "Mobile", value: "mobile" },
    { label: "AI", value: "ai" },
  ];

  return { teamOptions };
};
