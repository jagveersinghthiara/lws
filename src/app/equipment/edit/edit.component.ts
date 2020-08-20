import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  equipmentForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  fileData: File = null;
  imgURL: any;
  message: string;
  imagesUrl = environment.imagesUrl;
  imagePath: any;
  image: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();

    this.http.get(this.baseUrl + 'equipment/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        this.f.name.setValue(response.body.name);
        this.f.description.setValue(response.body.description);

        this.image = response.body.image;
        if (this.image && this.image != '') {
          this.imgURL = this.imagesUrl + response.body.image;
        } else {
          this.imgURL = 'https://dummyimage.com/400x170/E9EFF4/000000&text=Photo';
        }
    this.spinner.hide();
       
      },
      (error) => {
    this.spinner.hide();

        this.toastr.success('Something Went Wrong');
      });
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
    this.fileData = files[0] as File;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  ngOnInit() {

    this.equipmentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [this.fileData],
    });
  }

  get f() { return this.equipmentForm.controls; }


  /*
  Customer Edit Function
  */
  editEquipment() {
    this.submitted = true;
    if (this.equipmentForm.invalid) {
      return;
    }
    this.spinner.show();

    const formData = new FormData();
    formData.append('name', this.f.name.value);
    formData.append('description', this.f.description.value);
    formData.append('image', this.fileData);
    if (this.fileData) {
      formData.append('imagechnaged', 'yes');
    } else {
      formData.append('imagechnaged', 'no');
    }
    this.http.put(this.baseUrl + 'equipment/' + this.activatedRoute.snapshot.paramMap.get('id'), formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.router.navigate(['/equipment/view']);
        this.spinner.hide();

      },
      (error) => {
        this.toastr.success('Something Went Wrong');
        this.spinner.hide();

      });
  }
}
