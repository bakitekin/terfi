export const isValidTC = (tc: string): boolean => /^\d{11}$/.test(tc);
export const isValidPBIK = (pbik: string): boolean => /^\d{5}$/.test(pbik);
export const isValidDerece = (d: number): boolean => Number.isInteger(d) && d >= 1 && d <= 11;
export const isValidKademe = (k: number): boolean => Number.isInteger(k) && k >= 1 && k <= 3;

export const parseDDMMYYYY = (value: string): Date | null => {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value.trim());
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  const dt = new Date(year, month - 1, day);
  if (dt.getFullYear() !== year || dt.getMonth() !== month - 1 || dt.getDate() !== day) return null;
  return dt;
};

export type ValidationIssue = { type: 'error' | 'warning'; message: string };


