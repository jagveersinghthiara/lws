import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  equipmentForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  fileData: File = null;
  imgURL: any;
  message: string;
  imagePath: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

  ) { }
  ngOnInit() {
    this.equipmentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [this.fileData],
      tempimage:['']
  });

    this.imgURL = 'https://dummyimage.com/400x170/E9EFF4/000000&text=Photo';
  }


  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.f.image.setValue(files[0].name ? files[0].name : '');
    const reader = new FileReader();
    this.imagePath = files;
    this.fileData =  files[0] as File;
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

get f() { return this.equipmentForm.controls; }


/*
Equipment Add Function
*/
  addEquipment() {
    this.submitted = true;
    if (this.equipmentForm.invalid) {
      return;
    }
    this.spinner.show();
    const formData = new FormData();
    formData.append('name', this.f.name.value);
    formData.append('description', this.f.description.value);
    formData.append('image', this.fileData);
    this.http.post(this.baseUrl + 'equipment', formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.equipmentForm.reset();
          // tslint:disable-next-line: forin
        for (const i in this.equipmentForm.controls) {
            this.equipmentForm.controls[i].setErrors(null);
          }
        this.imgURL = 'https://dummyimage.com/400x170/E9EFF4/000000&text=Photo';
        this.f.image.setValue('');
        this.fileData = null;
        this.spinner.hide();
        this.router.navigate(['/equipment/view']);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.message);
      });
  }
}
