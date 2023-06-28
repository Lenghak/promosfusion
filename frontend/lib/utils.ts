import { MONTHS } from "@/constants/months";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const dateFormat = (string: string) => {
  if (!string) return "";

  const date = new Date(string);

  const day = date.getDate();
  const month: number = date.getMonth();
  const year = date.getFullYear();

  return `${day}-${MONTHS[month]}-${year}`;
};
