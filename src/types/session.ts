type SessionUser = {
  role: string;
  [key: string]: any;
};

export type Session = {
  user: SessionUser;
  [key: string]: any;
} | null;