import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: Array<string | undefined | null | boolean>) {
  return twMerge(clsx(classes));
}
