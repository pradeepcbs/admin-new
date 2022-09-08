import { ItemDto } from "./items.interface";

export interface SubCategoryDto {
  active: string;
  createdAt: Date;
  deleted: boolean;
  description: string;
  media: string;
  name: string;
  storeID: string;
  category: ItemDto;
  updatedAt: Date;
  _id: string;
}
