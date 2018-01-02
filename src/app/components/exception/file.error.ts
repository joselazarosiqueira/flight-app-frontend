import { ApiError } from './api.error';

export class FileError extends ApiError {

  public static createFileError(
    errorCode: string, errorMessage: string, filename: string): FileError {
    const fileError = new FileError();
    fileError.errorCode = errorCode;
    fileError.errorMessage = errorMessage;
    fileError.filename = filename;
    return fileError;
  }

  public filename: string;

}
