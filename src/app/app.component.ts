import { Component,OnInit } from '@angular/core';
import { Form } from './form';
import { FormService } from './form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/* export class AppComponent {
  title = 'user-form';
} */
export class AppComponent implements OnInit {
  forms: Form[];
  error = '';
  success = '';

  form = new Form('','',0,'','','');

  constructor(private formService: FormService) {
  }

  ngOnInit() {
    this.getForm();
  }

  getForm(): void {
    this.formService.getAll().subscribe(
      (res: Form[]) => {
        this.forms = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addForm(f) {
    this.resetErrors();

    this.formService.store(this.form)
      .subscribe(
        (res: Form[]) => {
          // Update the list of cars
          this.forms = res;

          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

  update(name, price, id) {
    this.resetErrors();

    this.formService.update({ model: name.value, price: price.value, id: +id })
      .subscribe(
        (res) => {
          this.forms   = res;
          this.success = 'Updated successfully';
        },
        (err) => this.error = err
      );
  }

  deleteForm(id) {
    this.resetErrors();

    this.formService.delete(+id)
      .subscribe(
        (res: Form[]) => {
          this.forms = res;
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
  }

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }
}