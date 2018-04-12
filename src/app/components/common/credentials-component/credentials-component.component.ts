import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Credentials } from '../../../models';
@Component({
  selector: 'app-credentials-component',
  templateUrl: './credentials-component.component.html',
  styleUrls: ['./credentials-component.component.css']
})
export class CredentialsComponentComponent implements OnInit {
  @Input() username: string;
  @Output() onSavedCredentials = new EventEmitter<Credentials>();

  public usernameFormControl = new FormControl('', [Validators.required]);
  public passwordFormControl = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
    this.usernameFormControl.setValue(this.username);
  }

  public save() {
    this.onSavedCredentials.emit(new Credentials(this.usernameFormControl.value, this.passwordFormControl.value));
  }
}
