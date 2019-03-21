import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VehicleService } from './../../../services/vehicle.service';
import { Observable } from 'rxjs/Observable';
import { KeyValuePair } from './../models/vehicle';

@Component({
    templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent implements OnInit {
    vehicles: any = {};
    allVehicles: Vehicle[]  = [];
    makes: KeyValuePair[] = [];
    filter: any = {};

    constructor(private VehicleService: VehicleService) {}

    ngOnInit() {
        this.VehicleService.getMakes()
            .subscribe(makes => this.makes = makes);

        this.VehicleService.getVehicles()
            .subscribe(vehicles => this.vehicles = this.allVehicles);
    }

    onFilterChnage() {
        //this.filter.makeId
        console.log('Filter');
        var vehicles = this.allVehicles;
        if(this.filter.makeId)
            vehicles = vehicles.filter(v => v.make.id = this.filter.make.id)

            if(this.filter.model.id)
                vehicles = vehicles.filter(v => v.model.id == this.filter.model.Id);
    
                this.vehicles = vehicles;
            }

            resetFilter() {
                this.filter = {};
                this.onFilterChnage();
            }
}