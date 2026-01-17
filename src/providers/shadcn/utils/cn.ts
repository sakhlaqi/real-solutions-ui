import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper precedence.
 * Combines clsx for conditional className handling with tailwind-merge
 * to resolve Tailwind class conflicts.
 *
 * @param inputs - Class values to merge
 * @returns Merged className string
 *
 * @example
 * cn('px-2 py-1', condition && 'bg-blue-500', { 'text-white': isActive })
 * // => 'px-2 py-1 bg-blue-500 text-white' (when condition and isActive are true)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
