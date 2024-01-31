import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css'
})
export class GameControlComponent {
  @Output('gameControllerEmission') emission = new EventEmitter<number>();
  current_number: number = 0;
  intervalID;
  gameIsOngoing = false;

  onStartGame() {
    // If you pass in a function, it does not have access to this.current_number???
    this.intervalID = setInterval(
      () =>
      {
        this.current_number++;
        this.emission.emit(this.current_number);
      },
      // this.emitNumber,
      1000);
    this.gameIsOngoing = true;
  }

  onEndGame() {
    clearInterval(this.intervalID);
    this.gameIsOngoing = false;
  }

  emitNumber() {
    this.current_number++;
    this.emission.emit(this.current_number);
  }
}
