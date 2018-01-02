import { SpinnerComponent } from './../components/util/spinner/spinner.component';
import { Injectable, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SpinnerService {

  public message = '';

  public spinnerComponent: any;
  public vcRef: ViewContainerRef;
  public counter: number = 0;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  public create(comp) {
    const factory = this.resolver.resolveComponentFactory(comp);
    if (this.spinnerComponent == null && this.counter == 0) {
      this.spinnerComponent = this.vcRef.createComponent(factory);
      if (this.message) {
        this.spinnerComponent.instance.message = this.message;
      }
    }
  }

  public setRootViewContainerRef(vcRef: ViewContainerRef) {
    this.vcRef = vcRef;
  }

  public activate(message?) {
    this.message = message;
    setTimeout(() => {
      if (this.counter <= 0) {
        this.counter = 0;
        this.create(SpinnerComponent);
      }
      this.counter++;
    }, 50);
  }

  public deactivate() {
    setTimeout(() => {
      this.counter--;
      if (this.counter <= 0) {
        this.counter = 0;
        if (this.spinnerComponent) {
          this.spinnerComponent.destroy();
        }
      }

    }, 50);
  }

  public isStarted(): boolean {
    return this.counter > 0;
  }

}
