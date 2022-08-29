import { User } from './auth.models';

export interface Food {
  id: number;
  name: string;
  calories: number;
  imageUrl: string | null;
  userId: number;
  consumedTime: Date;
  updateUTC: Date;
  user?: User;
}

export interface FoodSummary {
  date: string;
  calories: number;
}
