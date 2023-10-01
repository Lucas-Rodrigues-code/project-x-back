import { NextFunction, Request, Response } from "express";

export function validateBodyMiddleware(schema:any) {
    return function (req: Request, res:Response, next:NextFunction) {
      const { error } = schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((detail:any) => detail.message);
        return res.status(400).send(errors);
      }
      next();
    };
  }