type TCustomError = {
  name: "TOKEN_EXPIRE" | "INCORRECT_CREDENTIALS";
  message: string;
  cause?: any;
};

export default class CustomError extends Error {
  name: "TOKEN_EXPIRE" | "INCORRECT_CREDENTIALS";
  message: string;
  cause: any;

  constructor(error: TCustomError) {
    super();

    this.name = error.name;
    this.message = error.message;
    this.cause = error.cause;
  }
}
