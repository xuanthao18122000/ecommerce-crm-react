export type LoginValues = {
  username: string;
  password: string;
};

export type ResponseLogin = {
  data: {
    user: object;
    token: string;
  }
};
