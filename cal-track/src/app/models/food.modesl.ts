export interface Food {
  id: number;
  name: string;
  calories: number;
  imageUrl: string | null;
  userId: number;
  consumedTime: Date;
  updateUTC: Date;
}
