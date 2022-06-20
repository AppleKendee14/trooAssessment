import { Profiles } from './../models/profiles';
import { ServiceService } from './../service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  @ViewChild('f') form:NgForm;

  formNumber: FormGroup = new FormGroup({});

  inputFirstName ='';
  inputLastName ='';
  inputMiddleName = '';
  inputEmail ='';
  inputMobileNumber ='';
  idToUpdate:any;

  displayedColumns: string[] = ['id', 'firstName', 'lastName','middleName','email','mobileNumber','action'];

  dataSource;

  profiles:Profiles[];
  isUpdate:boolean = false;

 // profile: Profiles;

  clientForm:FormGroup;

  constructor(private ServiceService: ServiceService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.refresh();
    this.refreshForm()
  }

  refreshForm(){
    this.inputFirstName ='';
    this.inputLastName ='';
    this.inputMiddleName ='';
    this.inputEmail ='';
    this.inputMobileNumber ='';
  }
  refresh(){
    this.ServiceService.findProfiles().pipe(take(1)).subscribe(profiles => {
      this.profiles = profiles;
      this.refreshForm();
      this.dataSource = new MatTableDataSource(this.profiles);
      this.isUpdate=false;
    })

  }

  onAdd(data:Profiles){

    // if (data.mobileNumber.match("^(\+[\d]{1,5}|0)?[7-9]\d{9}$)")){
    //        console.log("mobile match");
    //     }

    this.ServiceService.addProfile(data).pipe(take(1)).subscribe(() => {
      this.refreshForm();
      this.refresh()
    })

  //   if (data.mobileNumber.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)){
  //      console.log("mobile match");
  //   }
  //   else{
  //     console.log("mobile didn't match");
  //  }

  }

  onDelete(id:number){
    this.ServiceService.deleteProfile(id).subscribe(() =>
    this.refresh()
    );
  }

  onUpdate(values:Profiles){
    this.isUpdate=true;
    this.idToUpdate = values.id;
    this.inputFirstName = values.firstName;
    this.inputLastName = values.lastName;
    this.inputMiddleName = values.middleName;
    this.inputEmail =values.email;
    this.inputMobileNumber=values.mobileNumber;
  }

  onCancel(){
    this.isUpdate=false;
    this.refresh()
  }
  onEdit(data){
    this.ServiceService.updateProfile(this.idToUpdate,data).subscribe(() => {
      this.refresh()
    });
  }

}
