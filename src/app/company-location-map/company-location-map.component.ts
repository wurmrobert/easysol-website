import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-company-location-map',
  templateUrl: './company-location-map.component.html',
  styleUrls: ['./company-location-map.component.scss']
})
export class CompanyLocationMapComponent implements OnInit, AfterViewInit {

  @Input()
  height = '100%';

  @Input()
  width = '100%';


  private map: mapboxgl.Map;
  private easySolutionsLocation: Location;
  private allMarkers: Array<mapboxgl.Marker> = [];

  public constructor() {
    this.easySolutionsLocation = new Location();
    this.easySolutionsLocation.address = 'Gugenedt 2, 4741 Gugenedt, Österreich';
    this.easySolutionsLocation.coordinats = new mapboxgl.LngLat(13.6801591, 48.25168069999999);
    this.easySolutionsLocation.viewBounds = new mapboxgl.LngLatBounds(
      new mapboxgl.LngLat(13.6788101197085, 48.2503317197085),
      new mapboxgl.LngLat(13.6815080802915, 48.25302968029149)
    );
  }

  public ngOnInit() { }

  public ngAfterViewInit() {
    this.initMap();
  }


  private initMap() {
    const style = 'mapbox://styles/wurmrobert/cizbwhs7s00gp2ro8dek9nf8z'; // light map as default

    const accessToken = 'pk.eyJ1Ijoid3VybXJvYmVydCIsImEiOiJjaW91ZDhpa3UwMDR5dzlsd2FkZzNzbXN0In0.GPs7V-K-hv1lCQQ0cDi3Eg';
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(accessToken);

    this.map = new mapboxgl.Map({
      container: 'map',
      style: style,
      center: this.easySolutionsLocation.coordinats,
      zoom: 7
    });

    // this.featureLayer = L.mapbox.featureLayer().addTo(this.map);

    const geojson = {
      'type': 'Feature',
      'properties': {
        'title': 'EasySolutions GmbH',
        'iconSize': [27.44, 48],
        'installationId': 1
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          this.easySolutionsLocation.coordinats.lng,
          this.easySolutionsLocation.coordinats.lat
        ]
      }
    }

    // create a DOM element for the marker
    const el = document.createElement('i');
    el.className = 'fa fa-map-marker';
    // el.style.backgroundImage = 'url("/assets/img/marker_blue.png")';
    el.style.color = '#f8b53b';
    el.style.fontSize = '4em';
    // el.style.width = geojson.properties.iconSize[0] + 'px';
    // el.style.height = geojson.properties.iconSize[1] + 'px';
    el.addEventListener('click', () => this.onMakerClicked(geojson));

    // add marker to map
    const marker = new mapboxgl.Marker(el, { offset: [-geojson.properties.iconSize[0] / 2, -geojson.properties.iconSize[1] / 2] })
      .setLngLat(geojson.geometry.coordinates as [number, number])
      .addTo(this.map);

    this.allMarkers.push(marker);

    setTimeout(() => {
     // this.fitMap();
    }, 2500);

  }

  private onMakerClicked = (marker: any) => {
    // let clicked = this.customer.Installations.Relations.find(r => r.Data.Id == marker.properties.installationId);
    // console.log('onMakerClicked: ', clicked);
  }

  private fitMap() {

    const mapMarkerBounds = new mapboxgl.LngLatBounds();

    mapMarkerBounds.extend(this.easySolutionsLocation.viewBounds);

    if (mapMarkerBounds) {
      this.map.fitBounds(mapMarkerBounds, { padding: 100 });
    }

  }

}


class Location {
  address: string;
  coordinats: mapboxgl.LngLat;
  viewBounds: mapboxgl.LngLatBounds;
}
