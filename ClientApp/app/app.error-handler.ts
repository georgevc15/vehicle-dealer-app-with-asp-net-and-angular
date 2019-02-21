import * as Raven from 'raven-js';
import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        Raven.captureException(error.originalError || error);
        console.log("Eroare -- An error has occured");
    }
}