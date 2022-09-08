export interface ApiBasicResponseDto {
  status: number;
  message: string;
}
export interface AdminDetailsDto extends ApiBasicResponseDto {
  data: {
    active: string;
    createdAt: Date;
    deleted: boolean;
    emailID: string;
    name: string;
    password: string;
    token: string;
    type: string;
    updatedAt: Date;
    userID: string;
    _id: string;
  };
}
