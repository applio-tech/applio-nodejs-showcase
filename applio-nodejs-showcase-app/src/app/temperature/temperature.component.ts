import { Component, OnInit } from '@angular/core';
import { ApiCallService} from 'src/app/services/api-call.service';
import { interval } from 'rxjs';


@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  data  = [{}];

  constructor(private apiCall: ApiCallService){this.getData();}

  ngOnInit(): void {
    interval(30000).subscribe(x => {
      this.getData();
    });
  }

  getData(){
    this.apiCall.gettempratureData().subscribe(apiResult => {
      this.data = apiResult;
    });
  }

}
