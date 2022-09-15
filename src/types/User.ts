export interface UserTrades {
  companyName: string;
  shares: number;
  price: string;
  logoBackground: string;
  logoColor: string;
  companySdgs: string[];
}

export interface User {
  country: string;
  firstName: string;
  surname: string;
  dateOfBirth: string;
  personalNumber: string;
  userValues: string[];
  email: string;
  password: string;
  cookies: boolean;
  watchlist: string[];
  trades: UserTrades[];
  portfolio: number;
}
