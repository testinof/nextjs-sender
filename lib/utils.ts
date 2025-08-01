import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export function maskEmail(email?: string): string {
  if (!email || !email.includes("@")) return "user@example.com";
  const [username, domain] = email.split("@");
  if (username.length <= 3) {
    return `${username[0]}**@${domain}`;
  }
  return `${username.slice(0, 2)}***${username.slice(-1)}@${domain}`;
}




