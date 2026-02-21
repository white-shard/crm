export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface LoginResponseDTO {
  user: {
    id: string;
    email: string;
  };
}
