import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';

export class GenericService {

  constructor(
    protected toastr: ToastsManager
  ) {
  }

  public handleError(error: Response) {
    return Observable.throw(error.json() || 'Server error');
  }

  public handleErrorMsgCustom(error: Response, msg: string) {
    this.toastr.error(msg, 'Error', { enableHTML: true });
    return Observable.throw(error.json() || 'Server error');
  }
}
