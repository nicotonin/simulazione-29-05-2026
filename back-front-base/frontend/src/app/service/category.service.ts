import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { User } from '../entities/user.entity';
import { environment } from '../../environments/environment';
import { Category } from '../entities/category.entity';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  protected http = inject(HttpClient);

  list() {
    return this.http.get<Category[]>(`${environment.apiUrl}/category/listCategory`);
  }
}
