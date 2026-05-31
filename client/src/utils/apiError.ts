export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number = 0) {
    super(message);
    this.status = status;
  }
}