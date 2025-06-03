import { useEffect, useState } from "react";

export const useGreeting = (): string => {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const getGreeting = (): string => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    setGreeting(getGreeting());
  }, []);

  return greeting;
};
