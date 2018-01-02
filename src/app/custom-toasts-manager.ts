import { ApplicationRef, ComponentFactoryResolver, Injectable, NgZone } from '@angular/core';
import { ToastOptions, ToastsManager } from 'ng2-toastr';

@Injectable()
export class CustomToastsManager extends ToastsManager {
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    ngZone: NgZone,
    appRef: ApplicationRef,
    options: ToastOptions) {
    super(componentFactoryResolver, ngZone, appRef, Object.assign(options, {
      positionClass: 'toast-top-right',
      toastLife: 5000,
      animate : 'flyRight',
      showCloseButton : 'true',
      newestOnTop : 'false'
    }));
  }
}
