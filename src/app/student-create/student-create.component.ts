import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentserviceService } from '../studentservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  studentForm:FormGroup
  constructor(private router:Router,private studentservice:StudentserviceService) {
    this.studentForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'dob':new FormControl('',Validators.required),
      'skills': new FormControl('', Validators.required),
      'department': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'zipcode': new FormControl('', Validators.required),

    })
  }

  ngOnInit(): void {
  }

  submitStudent(){
    Object.keys(this.studentForm.controls).forEach(field => {
      const control = this.studentForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.studentForm.valid){
      console.log("Student submitted");
      console.log(this.studentForm.value);
      this.studentservice.saveStudent(this.studentForm.value).subscribe(() => {
        this.router.navigate(['/student-list'])
      },() => {
        alert("Something Went Wrong")
      })
      
    }
  }


}
