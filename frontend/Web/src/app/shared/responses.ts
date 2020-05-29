export interface Response {
  code: number;
  data: any;
}

export interface RegisterResponse extends Response {
  data: {
    success: boolean;
  }
}

export interface LoginResponse extends Response {
  data: {
    token: string;
    success: boolean;
  }
}
