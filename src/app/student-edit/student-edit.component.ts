import { Component, OnInit } from '@angular/core';
import { student } from '../model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentserviceService } from '../studentservice.service';
@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  id: number = 0;
  studentForm: FormGroup;
  constructor(private activeRoute: ActivatedRoute,private router:Router,private studentService:StudentserviceService) {
    // this.id = this.activeRoute.snapshot.params.id;

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
    this.activeRoute.params.subscribe((paramsData) => {
      this.id = paramsData.id;
      this.studentService.getUserByID(paramsData.id).subscribe((data) => {
        console.log(data)
        this.studentForm.patchValue(data)
      })
    })



  }

submitStudent() {
  Object.keys(this.studentForm.controls).forEach(field => {
    const control = this.studentForm.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    }
  });

  if(this.studentForm.valid){
    // console.log(this.userForm.value)
    this.studentService.updateUserById(this.id,this.studentForm.value).subscribe((data) => {
      this.router.navigate(["/student-list"])
    })
  }

}

}
