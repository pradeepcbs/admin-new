export interface StoreListResponseDto {
  status: number;
  message: string;
  totalCount: number;
  totalPages: number;
  data: StoreDto[];
}
export interface StoreDto {
  active: string;
  createdAt: Date;
  deleted: string;
  images: [];
  name: string;
  updatedAt: Date;
  _id: string;
}

export interface ItemDto {
  active: string;
  createdAt: Date;
  deleted: boolean;
  description: string;
  media: string;
  name: string;
  storeID: string;
  updatedAt: Date;
  _id: string;
}
