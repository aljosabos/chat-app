declare module "trim-request" {
  import type { Request, Response, NextFunction } from "express";

  interface TrimRequest {
    (req: Request, res: Response, next: NextFunction): void;
    all(req: Request, res: Response, next: NextFunction): void;
  }

  const trimRequest: TrimRequest;

  export default trimRequest;
}
