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
    query: any = {};

    constructor(private VehicleService: VehicleService) {}

    ngOnInit() {
        this.VehicleService.getMakes()
            .subscribe(makes => this.makes = makes);

            this.populateVehicles();
    }

    private populateVehicles() {
        this.VehicleService.getVehicles(this.query)
        .subscribe(vehicles => this.vehicles = vehicles);
    }

    onFilterChnage() {
        //this.filter.modelId = 2;
       this.populateVehicles(); 
    
    }

    resetFilter() {
        this.query = {};
        this.onFilterChnage();
    }

    sortBy(columnName: any) {
        if(this.query.sortBy === columnName) {
             this.query.isSortAscending = !this.query.isSortAscending;
        } else {
              this.query.sortBy = columnName;
              this.query.isSortAscending = true;
         }
            this.populateVehicles();
    }
}