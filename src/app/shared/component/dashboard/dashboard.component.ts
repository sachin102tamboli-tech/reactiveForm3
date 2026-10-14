import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from '../../const/validators';
import { NoSpaceValidator } from '../../const/noPaceValidator';
import { EmpIdValidator } from '../../const/empIdValidator';
import { COUNTRIES } from '../../const/country';
import { Icountry } from '../../model/country';
import { CITIZENSHIPS } from '../../const/citizenship';
import { Iciti } from '../../model/citizenship';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loginForm !: FormGroup
  country : Icountry[] = COUNTRIES
  citizenships : Iciti[] = CITIZENSHIPS
  constructor() { }

  ngOnInit(): void {
    this.onLoginForm() 
    this.onAddSkill()
    this.onAddDependants()

    this.loginForm.get('address.current')?.valueChanges
    .subscribe(res =>{
      if(this.loginForm.get('address.current')?.valid){
        this.f['confirm'].enable()
      }
      else{
        this.f['confirm'].reset()
        this.f['confirm'].disable()
      }
    })

    this.loginForm.get('confirm')?.valueChanges
    .subscribe(res =>{
      if(res){
        let currentAdd = this.loginForm.get('address.current')?.value
        this.loginForm.get('address.permanant')?.patchValue(currentAdd)
        this.loginForm.get('address.permanant')?.disable()
      }
      else{
        this.loginForm.get('address.permanant')?.reset()
        this.loginForm.get('address.permanant')?.enable()
      }
    })
    
  }
  
  onLoginForm() {
    this.loginForm = new FormGroup({
      userId : new FormControl (null, [Validators.required,
        Validators.minLength(6),
        Validators.pattern(CustomRegex.username),
        NoSpaceValidator.noSpace],
      ),
      email : new FormControl(null, [Validators.required,
        Validators.pattern(CustomRegex.email)]
      ),
      empId : new FormControl(null, [Validators.required,
        EmpIdValidator.empidValidator]),
        address : new FormGroup ({
          current : new FormGroup({
            country : new FormControl('India'),
            state : new FormControl(null, [Validators.required]),
            city : new FormControl(null, [Validators.required]),
            pincode : new FormControl(null, [Validators.required])
          }), 
          permanant : new FormGroup({
            country : new FormControl('India'),
            state : new FormControl(null, [Validators.required]),
            city : new FormControl(null, [Validators.required]),
            pincode : new FormControl(null, [Validators.required])
          })
        }),

        confirm : new FormControl({value : false, disabled: true}),

        skills : new FormArray([
          new FormControl(null,[Validators.required])
        ]),

        dependants : new FormArray([
         
        ])
    })
  }
  onSubmit() {
    console.log(this.loginForm)
  }

  get userId (){
    return this.loginForm.get('userId') as FormControl
  }

  onAddSkill(){
    {
      if(this.skillsArray.valid){
        let control = new FormControl(null, [Validators.required])
        this.skillsArray.push(control)
      }
    }
    console.log(this.skillsArray)
  }

  onAddDependants() {
    console.log(this.loginForm)
    if(this.dependantArray.valid){
      let dependantgrp = new FormGroup({
        fullName : new FormControl(null, [Validators.required]),
            relationship : new FormControl('Father'),
            citizenship : new FormControl('Indian'),
            isTravelingWithYou : new FormControl(true, [Validators.required])
      })
      this.dependantArray.push(dependantgrp)
    }
  }
  onRemove(i : number){
    return this.skillsArray.removeAt(i)
  }

  onRemoved(i : number){
    return this.dependantArray.removeAt(i)
  }
  
  get f() {
    return this.loginForm.controls
  }

  get skillsArray(){
    return this.loginForm.get('skills') as FormArray
  }

  get dependantArray(){
    return this.loginForm.get('dependants') as FormArray
  }
}
