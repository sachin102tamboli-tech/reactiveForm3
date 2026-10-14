import { AbstractControl, ValidationErrors } from "@angular/forms";

export class EmpIdValidator {
    static empidValidator(control : AbstractControl) : ValidationErrors |null {
        let val : string = control.value
        if(!val){
            return null
        }
        let custRegx = /^[A-Z]\d{3}$/
        let isValid = custRegx.test(val)


        if(isValid){
            return null
        }
        else {
            return { 
                invalidEmpId: "Invalid Emp ID (E123)" 
            }
        }
    }
}