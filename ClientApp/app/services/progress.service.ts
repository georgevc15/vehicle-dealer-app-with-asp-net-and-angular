import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BrowserXhr } from '@angular/http';

@Injectable()
export class ProgressService {
    //private uploadProgress!: Subject<any>;
    private uploadProgress: Subject<ProgressService> = new Subject();

    startTraking() {
       this.uploadProgress =  new Subject();
        return this.uploadProgress;
    }

    notify(progress: any) {
        if(this.uploadProgress)
            this.uploadProgress.next(progress);
    }

    endTracking() {
        if(this.uploadProgress)
            this.uploadProgress.complete();
    }
}

@Injectable()
export class BrowserXhrWithProgress extends BrowserXhr {
    constructor(private service: ProgressService) {
        super(); 
    }
            build(): XMLHttpRequest {
                var xhr: XMLHttpRequest = super.build();
                
                xhr.upload.onprogress = (event) => {
                    this.service.notify(this.createProgress(event));
                };

                console
                xhr.upload.onloadend = () => {
                    //console.log("BEFORE", this.service.uploadProgress);
                    this.service.endTracking();
                    //console.log("AFTER", this.service.uploadProgress);
                }

                return xhr;
    }

    private createProgress(event: any) {

       return  {
            total: event.total,
            percentage: Math.round(event.loaded / event.total * 100)
      }

    }
}