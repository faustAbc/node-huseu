import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import createError from 'http-errors';

function validationMiddleware(
  type: new (...args: any[]) => any,
  skipMissingProperties = false
): RequestHandler {
  return (req, _res, next) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) =>
              Object.values(error.constraints ?? {})
            )
            .join(', ');
          return next(new createError.BadRequest(message));
        }
        return next();
      }
    );
  };
}

export default validationMiddleware;
