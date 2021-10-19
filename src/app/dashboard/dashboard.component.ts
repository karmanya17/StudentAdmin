import { Component, OnInit } from '@angular/core';
import { student } from '../model';
import { StudentserviceService } from '../studentservice.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private studentService:StudentserviceService) { }

  totalStudents:number=0
  ngOnInit(): void {
    this.gettotal();
  }
  gettotal(){
    this.studentService.getAllStudent().subscribe((data)=>{
        data.forEach((student)=>{
          this.totalStudents+=1;
        })
    })
  }
}
