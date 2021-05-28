import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Border } from '../../Border';

import { ShapesService } from '../../services/shapes.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map?: L.Map;
  private states?: any;

  // presents map
  private initMap(): void {
    // initializes map centered on new england
    this.map = L.map('map', {
      center: [43.9654, -70.8227],
      zoom: 6,
    });

    // constructs leaflet tiles to present map with zoom limitations
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    // adds tiles to map
    tiles.addTo(this.map);
  }

  constructor(private shapesService: ShapesService) {}

  // adds state outlines to map
  private initStatesLayer() {
    // constructs state layers from geoJSOn data saved in states
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B',
      }),
    });
    this.map?.addLayer(stateLayer);
  }

  ngAfterViewInit(): void {
    // creates map
    this.initMap();

    // pulls data from state layers from shapes service to add layers to map
    this.shapesService.getStateShapes().subscribe((states) => {
      this.states = states;
      this.initStatesLayer();
    });
  }
}
