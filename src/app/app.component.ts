import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { latLng, Marker, tileLayer } from 'leaflet';
import { AppService } from './app.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

declare const L: any;
import '@ansur/leaflet-pulse-icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastrModule.forRoot(), LeafletModule.forRoot()],
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  token =
    'pk.eyJ1Ijoic3VwYW5hZGl0IiwiYSI6ImNrMmVweWdrcTA4ZzgzY3A1NDE5ZnQwazkifQ.hK2Mz6cFk-jeIHzFBdaKTg';
  style = `ck1w9autf0f0r1co76j79eab7`;

  options = {
    layers: [
      tileLayer(
        `https://api.mapbox.com/styles/v1/supanadit/${this.style}/tiles/256/{z}/{x}/{y}@2x?access_token=${this.token}`,
        {
          maxZoom: 18,
        }
      ),
    ],
    zoom: 12,
    center: latLng(-6.914744, 107.60981),
  };

  // @ts-ignore
  listMarker: Array<Marker> = [];

  // tslint:disable-next-line:variable-name
  constructor(private appService: AppService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.appService.getStreamUser().subscribe((listMarker: Array<Marker>) => {
      this.listMarker = listMarker;
    });
  }
}
