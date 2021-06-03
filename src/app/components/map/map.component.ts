import {
  Component,
  OnChanges,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import * as L from 'leaflet';

import { ShapesService } from '../../services/shapes.service';

// details for marker
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnChanges {
  private map?: L.Map;
  private states: any;
  selectedState?: string;

  @Input() randomSpot: any =[0,0];

  @Output() submitState: EventEmitter<any> = new EventEmitter();

  constructor(private shapesService: ShapesService) {}

  ngOnChanges(): void {
    if (this.map && this.randomSpot) {
      console.log("random spot is ", this.randomSpot)
      const marker = L.marker(this.randomSpot);
      marker.addTo(this.map);
    }
  }

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

  // for mouseover - enables highlighting states
  private highlightFeature(evt: any) {
    const layer = evt.target;

    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042',
    });
  }

  // for mouseout - removes highlight states
  private resetFeature(evt: any) {
    const layer = evt.target;

    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B',
    });
  }

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

      onEachFeature: (feature, layer) => {
        layer.on({
          // on mouseover highlight state
          mouseover: (evt) => this.highlightFeature(evt),
          // on mouseout remove highlight
          mouseout: (evt) => this.resetFeature(evt),
          // on click select state and save as selectedState
          click: (evt) => {
            this.selectedState = evt.target.feature.properties.NAME;
            this.selectState(evt);
          },
        });
      },
    });

    this.map?.addLayer(stateLayer);
  }

  // method for when state is selected
  private selectState(evt: any) {
    // if selected state exists
    if (this.selectedState) {
      // identify center for zoom from outlines by calling CENTER property for the selected state
      const center = evt.target.feature.properties.CENTER;
      // center the map and zoom in on the selected state
      this.map?.setView(center, 7);

      // emit selected state
      this.submitState.emit(this.selectedState);
    }
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
