import { Component, OnInit } from '@angular/core';
import { MapServices } from '../map/MapServices';
import * as L from 'leaflet'
import 'leaflet.markercluster';
import { MapAgreeService } from '../map-agree/MapAgreeService';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: L.Map;
  markers: L.LayerGroup;
  window = window;
  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize: [25, 41],
  });
  smallGreenIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    iconSize: [25, 41],
  })
  constructor() { }

  initMap() {
    this.markers = new L.LayerGroup();
    //console.log(this.map);
    
    if (!this.map) {
      this.map = new L.Map("map");
      //this.map.fitBounds(this.map.getBounds());
    }
    let layer = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { minZoom: 9, attribution: "Web Admin" })
    layer.addTo(this.map);
    this.map.setView(
      new L.LatLng(18.079181214135577, -15.96642281860113),
      4
    )
  }

  ngOnInit() {
    this.initMap();
    MapServices.getEmittedValue().subscribe(item => {
      switch (true) {
        case item.addMarker:
          let coordinates = item.coordinates;
          let zoom = item.zoom
          let index = item.index
          let popup=item.popup
          
          this.addMarker(coordinates,  zoom, index ,popup)
          break;
        case item.resize:
          this.resize();
          break;
        case item.removeMarker:
          this.removeAllMarker()
          break;
        case item.initMap:
          this.initMap();
          break;
        case item.setNewView:
          let marker = item.marker
          let coords = item.coordinates;
          let zoomIn = item.zoom;
          this.setNewView(coords, zoomIn, marker);
          break;
      }

    })
  }

  setNewView(coordinates, zoomIn, marker: L.Marker) {
    this.map.setView(coordinates, zoomIn);
    this.initMarkersColor()
    if (marker) marker.setIcon(this.smallGreenIcon)
  }

  initMarkersColor() {
    this.markers.getLayers().forEach(layer => {
      let mark: L.Marker = layer as L.Marker;
      mark.setIcon(this.smallIcon)
    })

  }

  addMarker(coordinates, zoom: boolean, index: number,popup:string) {

    let marker = L.marker(coordinates, { icon: this.smallIcon }).bindPopup(popup)
    .openPopup();
    if (index !== -1)
      marker.addEventListener("click", () => {
       //MapAgreeService.clickOnAgree(index, marker)
        MapAgreeService.clickOnAdministration(index, marker)
      })
    this.markers.addLayer(marker);
    this.markers.addTo(this.map);
    
    
    if (zoom)
      this.map.setView(coordinates, 15);
  }


  removeAllMarker() {
    this.markers.clearLayers();
  }
  resize() {
    this.map.invalidateSize()
  }
  focusOnMarker() {

  }

}
