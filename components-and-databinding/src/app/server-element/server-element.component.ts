import { Component, ContentChild, ElementRef, Input, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  encapsulation: ViewEncapsulation.Emulated // Default
})
export class ServerElementComponent {
  // Can pass this in from parent component
  @Input('srvElement') element: { type: string, name: string, content: string };

  @Input() name;

  @ViewChild("heading", {static: true}) header: ElementRef;

  @ContentChild("contentParagraph", {static: true}) paragraph: ElementRef;

  // constructor() {
  //   console.log('ServerElementComponent constructor called.');
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('ngOnChanges() called for ServerElementComponent');
  //   console.log(changes);
  // }

  // ngOnInit() {
  //   console.log('ngOnInit() called for ServerElementComponent');
  //   console.log("Text Content: " + this.header.nativeElement.textContent);
  //   console.log("Text Content of Paragraph: " + this.paragraph.nativeElement.textContent);
  // }

  // ngDoCheck() {
  //   console.log("ngDoCheck() called for ServerElementComponent");
  // }

  // ngAfterContentInit() {
  //   console.log("ngAfterContentInit() called for ServerElementComponent")
  //   console.log("Text Content of Paragraph: " + this.paragraph.nativeElement.textContent);
  // }

  // ngAfterContentChecked() {
  //   console.log("ngAfterContentChecked() called for ServerElementComponent")
  // }

  // ngAfterViewInit() {
  //   console.log("ngAfterViewInit() called for ServerElementComponent")
  //   console.log("Text Content: " + this.header.nativeElement.textContent);
  // }

  // ngAfterViewChecked() {
  //   console.log("ngAfterViewChecked() called for ServerElementComponent")
  // }

  // ngOnDestroy() {
  //   console.log("ngOnDestroy() called for ServerElementComponent")
  // }
}
