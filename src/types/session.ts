type SessionUser = {
  role: string;
  [key: string]: unknown;
};

export type Session = {
  user: SessionUser;
  [key: string]: unknown;
} | null;