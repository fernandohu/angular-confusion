import {Component, OnInit, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {baseURL} from "../shared/baseurl";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;

  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author name is required',
      'minlength': 'Author name must be at least 2 characters long',
      'maxlength': 'Author name can not be more than 25 characters long'
    },
    'rating': {
      'required': 'A rating is required'
    },
    'comment': {
      'required': 'A comment is required',
      'minlength': 'Comment must be at least 2 characters long',
      'maxlength': 'Comment can not be more than 200 characters long'
    }
  };

  errMsg: string;

  dishcopy = null;

  constructor(private dishService: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe(
        dishIds => this.dishIds = dishIds,
        err => this.errMsg = <any>err
      );

    this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(
        dish => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
        },
        err => this.errMsg = err
      );

    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [5, [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  cleanErrors() {
    this.formErrors = {
      'author': '',
      'rating': '',
      'comment': ''
    };
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }

    const form = this.commentForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    const comment = this.commentForm.value;

    comment.date = new Date().toISOString();

    this.dishcopy.comments.push(comment);
    this.dishcopy.save().subscribe(
      dish => {
        this.dish = dish;
        console.log(this.dish);
      }
    );

    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.prev = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
