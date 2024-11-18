import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, AfterViewInit{
  type: string = 'category';
  typeValue: string = '';
  title: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private categoriesService: CategoryService) {
    this.type = 'category';
    this.typeValue = this.route.snapshot.paramMap.get('category') || '';
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.type = 'category';
      this.typeValue = params.get('category') || '';
      this.categoriesService.getNameCategoryBySlug(this.typeValue).subscribe((category) => {
        this.title = category.name;
      });
    });
  }
}
