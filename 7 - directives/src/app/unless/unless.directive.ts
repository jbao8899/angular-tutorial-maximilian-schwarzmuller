import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // opposite of ngIf
  // Will include the element it is attached to only if the condition is false
  
  @Input() set appUnless(condition: boolean) {
    // This setter is called whenever the "unless" property changes
    if (!condition) {
      // Show the element if condition is false
      this.vcRef.createEmbeddedView(this.templateRef);
    }
    else {
      this.vcRef.clear();
    }
  }
  constructor(private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef) { }

}
