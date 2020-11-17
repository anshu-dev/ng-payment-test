import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  submitted: boolean = false;
  todayDate: Date;

  constructor(private formBuilder: FormBuilder, private api: PaymentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.todayDate = new Date();
    this.todayDate.setHours(this.todayDate.getHours()- 12);
    this.paymentForm = this.formBuilder.group({
      creditCardNumber: ['', [Validators.required, Validators.maxLength(16)]],
      cardholder: ['', Validators.required],
      expirationDate: ['', Validators.required],
      securityCode: ['', [Validators.maxLength(3), Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.paymentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.paymentForm.invalid) {
      return;
    }

    this.api.paymentPost(this.paymentForm.value).subscribe((data) => {
      this.toastr.success('Data Successfully Created');
      this.submitted = false;
      this.paymentForm.reset();
    })

  }

  keypresshandler(event) {
    var charCode = event.keyCode;
    //Non-numeric character range
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
  }

}
