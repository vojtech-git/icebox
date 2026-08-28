import { Food } from './food.model';

export interface Fridge {
  id: string;
  name: string;
  foods: Food[];
}
