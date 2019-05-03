import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VehicleService } from './../../../services/vehicle.service';
import { Observable } from 'rxjs/Observable';
import { KeyValuePair } from './../models/vehicle';

@Component({
    templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent implements OnInit {
    private readonly PAGE_SIZE = 3;
    
    queryResult: any = {};
    makes: KeyValuePair[] = [];
    query: any = {
        pageSize: this.PAGE_SIZE
    };
    columns = [
        { title: 'Id'},
        { title: 'Contact Name', key: 'id', isSortable: true },
        { title: 'Make', key: 'make', isSortable: true },
        { title: 'Model', key: 'model', isSortable: true },
        { }
    ];

    constructor(private VehicleService: VehicleService) {}

    ngOnInit() {
        this.VehicleService.getMakes()
            .subscribe(makes => this.makes = makes);

            this.populateVehicles();
    }

    private populateVehicles() {
        this.VehicleService.getVehicles(this.query)
        .subscribe(result =>  this.queryResult = result);
    }

    onFilterChnage() {
        this.query.page = 1;
        this.populateVehicles(); 
    
    }

    resetFilter() {
        this.query = {
            page: 1,
            pageSize: this.PAGE_SIZE
        };
        this.populateVehicles();
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

    onPageChange(page : number) {
        this.query.page = page;
        this.populateVehicles();
    }
}