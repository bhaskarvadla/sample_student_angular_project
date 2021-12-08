import {FormBuilder,Validators} from '@angular/forms';

export class StudentForm {
  // tslint:disable-next-line:typedef
  public static create(formBuilder: FormBuilder = new FormBuilder()) {
    return formBuilder.group(
      {
        firstName: ['', Validators.required],
        secondName: [
          ''
        ],
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        stdClass: ['', Validators.required]
      }
    );
  }

  // tslint:disable-next-line:typedef
  public static createWithValues(data: any, formBuilder: FormBuilder = new FormBuilder()) {
    return formBuilder.group(
      {
        firstName: [
          data.firstName
        ],
        secondName: [
          data.secondName
        ],
        email: [
          data.email, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
        ],
        stdClass: [
          data.stdClass
        ],
        id:[
          data.id
        ]
      }
    );
  }
}
