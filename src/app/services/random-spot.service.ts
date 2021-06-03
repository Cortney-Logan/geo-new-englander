import { Injectable } from '@angular/core';
import * as L from 'leaflet';
// @ts-ignore
import leafletPip from 'leaflet-pip';

@Injectable({
  providedIn: 'root',
})
export class RandomSpotService {
  // stores randomSpot once generated
  randomSpot: number[] = [];
  // holds stateborders
  private states: any;
  // holds border for selectedState
  private border: any;
  // holds min and max lat and long for boundaries

  constructor() {}

  // random number generator
  randomNum(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
  }

  //random latitutde
  randomLatitude(minMax: number[]): number {
    //from VT border latitude min: 42.730315121762715 & max: 45.007561302382754
    return this.randomNum(minMax[0], minMax[1]);
  }

  // random longitude
  randomLongitude(minMax: number[]): number {
    //from VT border longitude min:-73.42613118833583 max: -71.51022535353107
    return this.randomNum(minMax[0], minMax[1]);
  }

  //checks if point is within state boundary
  checkPointInsideState(lat: number, long: number): boolean {
    // defines stateLayer from border for selectedState
    let stateLayer = L.geoJSON(this.border);

    // calls leafletPip.pointInLayer method - returns an array of polygons included in the stateLayer that contain the provided point
    // note that leafletpip looks for [lat,long] instead of [long, lat] which is typical set up
    let layerLength = leafletPip.pointInLayer([long, lat], stateLayer);

    // if layerLength is 0, the point is not inside the border
    if (layerLength.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  // generates random point and validates that it is within the state border
  selectRandomPointInState(minMax: number[][]): void {
    //generating random spot
    let newLat: number = this.randomLatitude(minMax[0]);
    let newLong: number = this.randomLongitude(minMax[1]);

    // validates that random point is inside state border
    let insideState: boolean = this.checkPointInsideState(newLat, newLong);

    // continues to generate random spots and validate until point is inside state
    while (!insideState) {
      newLat = this.randomLatitude(minMax[0]);
      newLong = this.randomLongitude(minMax[1]);
      insideState = this.checkPointInsideState(newLat, newLong);
    }

    // sets randomSpot to the point inside the state
    this.randomSpot = [newLat, newLong];
  }

  // isolates stateborder for selected state from set of states
  getStateBorder(selectedState: string, states: any): any {
    let border: any;

    states.forEach((stateEntry: any) => {
      if (stateEntry.properties.NAME === selectedState) {
        border = stateEntry;
      }
    });

    // returns border
    return border;
  }

  findStateMaxMin(border: any): number[][] {
    console.log(border);

    // initializes min and max lat and long
    let minMaxlats: number[] = [1000, -1000];
    let minMaxlongs: number[] = [1000, -1000];

    // goes through each point in the border to find min and max
    border.forEach((segment: any) => {
      segment.forEach((point: any) => {
        if (point.length > 1) {
          point.forEach((pair: any) => {
            if (pair[1] < minMaxlats[0]) {
              minMaxlats[0] = pair[1];
            }
            if (pair[1] > minMaxlats[1]) {
              minMaxlats[1] = pair[1];
            }

            //find min & max longitudes (first coordinate of pair)
            if (pair[0] < minMaxlongs[0]) {
              minMaxlongs[0] = pair[0];
            }
            if (pair[0] > minMaxlongs[1]) {
              minMaxlongs[1] = pair[0];
            }
          });
        }

        // find min & max latitudes (second coordinate of point)
        if (point[1] < minMaxlats[0]) {
          minMaxlats[0] = point[1];
        }
        if (point[1] > minMaxlats[1]) {
          minMaxlats[1] = point[1];
        }

        //find min & max longitudes (first coordinate of point)
        if (point[0] < minMaxlongs[0]) {
          minMaxlongs[0] = point[0];
        }
        if (point[0] > minMaxlongs[1]) {
          minMaxlongs[1] = point[0];
        }
      });
    });

    return [minMaxlats,minMaxlongs]

  }

  // generates random spot inside state and returns random spot
  getRandomSpot(selectedState: string, states: any): number[] {
    console.log('getting random spot');
    // isolates border for selected state
    this.border = this.getStateBorder(selectedState, states);

    // find maxmin lat and long - returns min and max as [[minmaxlat],minmaxlong]
    const minMax: number[][] = this.findStateMaxMin(this.border.geometry.coordinates);

    console.log(minMax)

    // selects random point inside of state
    this.selectRandomPointInState(minMax);

    // returns randomspot
    return this.randomSpot;
  }
}
