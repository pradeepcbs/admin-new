export interface ApiBasicResponseDto {
  status: number;
  message: string;
}
export interface StoreUserDto extends ApiBasicResponseDto {
  data: {
    _id: string;
    name: string;
    password: string;
    userID: string;
    storeID: string;
    active: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
