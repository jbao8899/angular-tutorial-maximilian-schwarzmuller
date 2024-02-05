export class CounterService {
    numActivations: number = 0;
    numDeactivations: number = 0;

    logNumActivations() {
        this.numActivations++;
        console.log("A total of " + this.numActivations + " users have been activated.");
    }

    logNumDeactivations() {
        this.numDeactivations++;
        console.log("A total of " + this.numDeactivations + " users have been deactivated.")
    }
}
