import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core'
@Injectable()
export class MapServices {
    @Output() static fire: EventEmitter<any> = new EventEmitter();
    constructor() {
    }
    static addMarker(coordinates: number[], zoom: boolean, index: number, popup:string) {
        this.fire.emit({ "addMarker": true, coordinates, zoom, index ,popup});
    }

    static getEmittedValue() {
        return this.fire;
    }

    static focusMarker() {
        this.fire.emit({ "focus": true })
    }

    static resize() {
        this.fire.emit({ "resize": true })
    }

    static removeAllMarkers() {
        this.fire.emit({ "removeMarker": true })
    }

    static initMap() {
        this.fire.emit({ "initMap": true })
    }

    static setNewView(coordinates: number[], zoom: number, marker?) {
        this.fire.emit({ 'setNewView': true, coordinates, zoom, marker })
    }
}