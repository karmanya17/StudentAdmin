import { Component, OnInit } from '@angular/core';
import { StudentserviceService } from '../studentservice.service';
import { student } from '../model';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentList:Array<student> = []
  constructor(private studentsService:StudentserviceService) {
  
   console.log(this.studentList)
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.studentsService.getAllStudent().subscribe((data) => {
      this.studentList = data
     })
  }
  deleteData(id:any){
    this.studentsService.deleteUserById(id).subscribe((data) => {
      this.loadData()
    })
  }

}
