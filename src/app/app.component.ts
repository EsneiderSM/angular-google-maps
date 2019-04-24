import { Component, ViewChild, OnInit, NgZone, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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

    this.getPosition().subscribe(
      (pos: Position) => {
        this.coordinates = {
          latitude: +(pos.coords.latitude),
          longitude: +(pos.coords.longitude)
        };
        this.zoomMap = 10;
      });


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
          this.zoomMap = 12;
        });
      });
    });

  }



  public getPosition(): Observable<Position> {
    return Observable.create(
      (observer) => {
        navigator.geolocation.watchPosition((pos: Position) => {
          observer.next(pos);
        }),
          () => {
            console.log('Position is not available');
          },
          {
            enableHighAccuracy: true
          };
      });
  }

}
