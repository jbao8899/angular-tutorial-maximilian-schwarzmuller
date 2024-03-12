// Basically a dummy service

import { Injectable } from "@angular/core";

// @Injectable({ providedIn: "root" })
export class LoggingService {
    lastLog: string;

    printLog(message: string) {
        console.log("Previous message:", this.lastLog)
        console.log("Message:", message);
        console.log();
        this.lastLog = message;
    }
}