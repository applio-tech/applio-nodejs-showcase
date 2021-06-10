import { Component, OnInit } from '@angular/core';
// import { catchError, map, tap } from 'rxjs/operators';
import { ApiCallService} from 'src/app/services/api-call.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  data  = [{}];

  constructor(private apiCall: ApiCallService) {this.getData();}

  ngOnInit(): void {
    interval(30000).subscribe(x => {
      this.getData();
    });
  }

  getData(){
    this.apiCall.getOccupationData().subscribe(apiResult => {
      this.data = apiResult;
    });
  }


}
