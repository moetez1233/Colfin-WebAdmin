import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core'
@Injectable()
export class SpinnerService {
    @Output() static fire: EventEmitter<any> = new EventEmitter();
    constructor() {
    }

    static showSpinner(show: boolean) {
        this.fire.emit({ show: show })
    }

    static getEmittedValue() {
        return this.fire;
    }


}