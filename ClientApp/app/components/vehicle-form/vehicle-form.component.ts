import { Component, OnInit } from '@angular/core';

import { MakeService } from '../../services/make.service';
import { FeatureService } from './../../services/feature.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
   makes: any[] = [];
   features: any[];
   models: any = [];
   vehicle: any = {};
  
   constructor(
     private makeService: MakeService,
     private featureService: FeatureService) {
    this.makes = [];
    this.features = [];
    }

  ngOnInit() {
    this.makeService.getMakes().subscribe(makes => 
      this.makes = makes
    );
    this.featureService.getFeatures().subscribe(features => 
      this.features = features
    );
  }

  onMakeChange() {
    //console.log("Selected make", this.vehicle);
    var selectedMake = this.makes.find(m => m.id == this.vehicle.id);
    //console.log(selectedMake);
    this.models = selectedMake ? selectedMake.models: [];
  }
}
