import { Service } from 'typedi';
import * as HttpStatus from 'http-status-codes';

@Service()
export class ErrorService {

  createInputValidationError(name: string): Error {
    return new Error(`${name}InputValidationError`);
  }

  createInvalidIdError(name: string): Error {
    return new Error(`Invalid${name}IdError`);
  }

  createNotFoundError(name: string): Error {
    return new Error(`${name}NotFoundError`);
  }

  createNotAvailableOperationError(name: string): Error {
    return new Error(`Not Available Operation for ${name} datamodel`);
  }

  sendError(res: any, errorCode: number): void {
    res.status(errorCode).send({ error: HttpStatus.getStatusText(errorCode) });
  }

}
