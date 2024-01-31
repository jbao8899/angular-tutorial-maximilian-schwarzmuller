import { Component, ElementRef, EventEmitter, Output , ViewChild} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent {
  // newServerName = '';
  // newServerContent = '';

  // Do not write to ViewChild in TypeScript file
  @ViewChild('serverContentInput', { static: true }) serverContentInput : ElementRef;

  // Can emit events
  @Output() serverCreated = new EventEmitter<{name: string, content: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{name: string, content: string}>();

  onAddServer(setName) {
    this.serverCreated.emit(
      {
        name: setName,
        content: this.serverContentInput.nativeElement.value
      }
    );
  }

  onAddBlueprint(setName,) {
    this.blueprintCreated.emit(
      {
        name: setName,
        content: this.serverContentInput.nativeElement.value
      }
    );
  }
}
