import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { student } from './model';
@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {

  studentData:Array<student> = [];
  constructor(private http:HttpClient) { }

  saveStudent(student:student){
    this.studentData.push(student)
    return this.http.post(`https://fathomless-mesa-12601.herokuapp.com/student`,student)
  }

  getAllStudent(){
    return this.http.get<Array<student>>(`https://fathomless-mesa-12601.herokuapp.com/student-list`)
  }

  getUserByID(id:number){
    return this.http.get<student>(`https://fathomless-mesa-12601.herokuapp.com/student/${id}`)
  }

  updateUserById(studentID:number,student:student){
    return this.http.put(`https://fathomless-mesa-12601.herokuapp.com/student-edit/${studentID}`,student)
  }

  deleteUserById(id:number){
    return this.http.delete(`https://fathomless-mesa-12601.herokuapp.com/student-delete/${id}`)
  }
}
