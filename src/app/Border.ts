export interface BorderGeo{
type: string;
coordinates: number[];
}

export interface Border{
    type: string;
    properties: any;
    geometry: BorderGeo;
}