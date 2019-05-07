import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';

declare var google: any;

@Component({
  selector: 'app-map-agm',
  templateUrl: './map-agm.component.html',
  styleUrls: ['./map-agm.component.scss']
})
export class MapAgmComponent implements OnInit {

  @ViewChild("search")
  public searchElementRef: ElementRef;
  public searchControl: FormControl;

  constructor(
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone
  ) { }

  title: string = 'My first AGM project';

  zoomMap: number = 4;
  coordinates = {
    latitude: 2.8894434,
    longitude: -73.783892
  };


  ngOnInit(): void {

    //set current position
    this.setCurrentPosition();

    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.coordinates.latitude = place.geometry.location.lat();
          this.coordinates.longitude = place.geometry.location.lng();
          this.zoomMap = 15;
        });
      });
    });

  }


  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coordinates.latitude = position.coords.latitude;
        this.coordinates.longitude = position.coords.longitude;
        this.zoomMap = 15;
      });
    }
  }

}
