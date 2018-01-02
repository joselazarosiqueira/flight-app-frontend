import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ExceptionService {

  constructor(
    private toastr: ToastsManager,
    private translateService: TranslateService) {
  }

  public getApiErroCode(error: any): string {
    try {
      if (this.isJsonString(error)) {
        error = error;
      } else if (this.isJsonBodyString(error)) {
        error = JSON.parse(error._body);
      }
      if (error.errorCode !== null && error.errorCode !== undefined) {
        return error.errorCode;
      }
    } catch (ex) {
      console.log('Falha ao processar erro: [' + error + '], exception: ' + ex);
    }
    return null;
  }

  public handlerApiError(error: any) {
    const errorCode: string = this.getApiErroCode(error);
    if (errorCode !== null) {
      this.toastr.error(this.translateService.instant('API_ERROR.' + errorCode));
    }
  }

  public handlerApiErrorMsgCustom(msg: string) {
    this.toastr.error(msg);
  }

  public handlerGeneralError() {
    const errorCode: string = 'INTERNAL_ERROR';
    if (errorCode !== null) {
      this.toastr.error(this.translateService.instant('API_ERROR.' + errorCode));
    }
  }

  public isJsonString(str): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  public isJsonBodyString(str): boolean {
    try {
      JSON.parse(str._body);
    } catch (e) {
      return false;
    }
    return true;
  }

}
