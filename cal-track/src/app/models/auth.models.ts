export interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  calorieLimit: number;
  token: string;
}
