import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private url = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getAll() {
    // Add your code here
    return this.http.get<Course[]>(`${this.url}/courses/all`);
  }

  createCourse(course: Course) {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post(`${this.url}/add`, course);
  }

  editCourse(id: string, course: Course) {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.put(`${this.url}/${id}`, course);
  }

  getCourse(id: string) {
    // Add your code here
    return this.http.get(`${this.url}/${id}`);
  }

  deleteCourse(id: string) {
    // Add your code here
    return this.http.delete(`${this.url}/${id}`);
  }

  filterCourses(value: string) {
    // Add your code here
    return this.http.get(`${this.url}/filter`, { params: { title: value } });
  }

  getAllAuthors() {
    // Add your code here
    return this.http.get(`${this.url}/authors/all`);
  }

  createAuthor(name: string) {
    // Add your code here
    return this.http.post(`${this.url}/authors/add`, { name });
  }

  getAuthorById(id: string) {
    // Add your code here
    return this.http.get(`${this.url}/authors/${id}`);
  }
}
