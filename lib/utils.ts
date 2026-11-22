import { type ClassValue, clsx } from "clsx";

/** 클래스 이름 합치기: cn(styles.row, open && styles.open, className). 거짓 값은 빠진다 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
