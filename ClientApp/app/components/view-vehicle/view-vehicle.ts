import { ProgressService, BrowserXhrWithProgress } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';

import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserXhr } from '@angular/http';

@Component({
  templateUrl: 'view-vehicle.html',
  providers: [
            { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
            ProgressService
  ]
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild("fileInput") 
  set fileInput(val: ElementRef) {
    if(val) {
      console.log(val);
    }
  }
  vehicle: any;
  vehicleId: any;
  photos: any[] = [];
  progress: any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute, 
    private router: Router,
    private progressService: ProgressService,
    private photoService: PhotoService,
    private vehicleService: VehicleService) { 

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return; 
      }
    });
  }

  ngOnInit() { 
    this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);
    
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return; 
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {

    this.progressService.startTraking()
      .subscribe(progress => { 
        console.log(progress);
        this.zone.run(() => {
          this.progress = progress;
        });
      }, 
      () => { this.progress = null; });

  var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
  nativeElement.value = ''; 
  if(nativeElement.files != null) {
    var file = nativeElement.files[0];
    this.photoService.upload(this.vehicleId, file)
    .subscribe(photo =>  {
      this.photos.push(photo);
   });
  }
 }
}