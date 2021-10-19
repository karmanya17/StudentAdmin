import { Component, OnInit } from '@angular/core';
import { StudentserviceService } from '../studentservice.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { student } from '../model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-studentsearch',
  templateUrl: './studentsearch.component.html',
  styleUrls: ['./studentsearch.component.css']
})
export class StudentsearchComponent implements OnInit {
  searchForm:FormGroup
  studentData:student={
    id:0,
    name:"",
    dob:"",
    skills:"",
    department:"",
    city:"",
    state:"",
    country:"",
    address:"",
    zipcode:""
  }
  flag=0;
  constructor(private studentService:StudentserviceService) { 

    
    this.searchForm = new FormGroup({
      'id': new FormControl('', Validators.required),
    })
  }

  
  ngOnInit(): void {
    this.flag=0
  }
  submitStudent(){
    Object.keys(this.searchForm.controls).forEach(field => {
      const control = this.searchForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.searchForm.valid){

      console.log(this.searchForm.value);
      let id=parseInt(this.searchForm.value.id)
      console.log(id)
      this.studentService.getUserByID(id).subscribe((data) => {
        this.studentData=data
        if(Object.keys(data).length==0){
          this.flag=-1
        }
        else{
          this.flag=1;
        }
        
      },() => {
        
        alert("Something Went Wrong")
      })
      
    }
  }
}
