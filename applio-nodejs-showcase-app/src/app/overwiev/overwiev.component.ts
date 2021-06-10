import { Component, OnInit } from '@angular/core';
// import { catchError, map, tap } from 'rxjs/operators';
import { ApiCallService} from 'src/app/services/api-call.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-overwiev',
  templateUrl: './overwiev.component.html',
  styleUrls: ['./overwiev.component.css']
})
export class OverwievComponent implements OnInit {
  data  = [{}];
  test = "test";
  constructor(private apiCall: ApiCallService) {this.getData();}

  ngOnInit(): void {
    interval(30000).subscribe(x => {
      this.getData();
    });
  }

  getData(){
    this.apiCall.getblueprintsData().subscribe(apiResult => {
      let a = apiResult.sort(this.dynamicSort("name"));
      console.log(a);
      this.data = a;
    });
  }
  
  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        console.log(a[property].replace( /^\D+/g, '') < b[property].replace( /^\D+/g, ''),a[property].replace( /^\D+/g, ''), b[property].replace( /^\D+/g, ''),a[property],b[property]  );
        var result = (a[property].replace( /^\D+/g, '') < b[property].replace( /^\D+/g, '')) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

}
