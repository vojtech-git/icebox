export interface FridgeDto {
  id: string;
  name: string;
  dateCreated: string;
  foodIds: string[];
}

export interface CreateFridgeCommand {
  name: string;
}