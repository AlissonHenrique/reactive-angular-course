import { CoursesStore } from './../services/courses.store';
import { MessagesService } from './../messages/messages.service';
import { LoadingService } from './../loading/loading.service';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$:  Observable<Course[]>;



  constructor(
    private courseService:CoursesService,
    private coursesStore:CoursesStore,
    private loadingService:LoadingService,
    private messagesService:MessagesService
  ) { }

  ngOnInit() {
    this.reloadCourses()
      //this.loadingService.loadingOn();

  }

reloadCourses() {

  this.beginnerCourses$ = this.coursesStore.filterByCategory('BEGINNER');
  this.advancedCourses$ = this.coursesStore.filterByCategory('ADVANCED');


     const courses$ = this.courseService.loadAllCourses().pipe(
      map(courses => courses.sort(sortCoursesBySeqNo)),
      catchError(err => {
        this.messagesService.showErrors("Could not load courses");
        return throwError(err);
      }
    ))

      // const loadCourses$ =  this.loadingService.showLoaderUntilCompleted(courses$)

      // this.beginnerCourses$ = loadCourses$.pipe(map(courses => courses.filter(course => course.category == 'BEGINNER')));
      // this.advancedCourses$ = loadCourses$.pipe(map(courses => courses.filter(course => course.category == 'ADVANCED')));
  }

}




