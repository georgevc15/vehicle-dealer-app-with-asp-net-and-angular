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
    makes: KeyValuePair[] = [];
    filter: any = {};

    constructor(private VehicleService: VehicleService) {}

    ngOnInit() {
        this.VehicleService.getMakes()
            .subscribe(makes => this.makes = makes);

        this.VehicleService.getVehicles()
            .subscribe(vehicles => this.vehicles = 'any');
    }

    onFilterChnage() {
        //this.filter.makeId
        console.log('Filter');
    }

}