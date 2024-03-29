import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoggerService } from './logger.service';
import { DataService } from './data.service';
import { PlainLoggerService } from "./plain-logger.service";
import { throwIfAlreadyLoaded } from "app/core/module-import-guard";
import { BookTrackerErrorHandlerService } from './book-tracker-error-handler.service';
import { BooksResolverService } from './books-resolver.service';
import { AddHeaderInterceptor } from './add-header.interceptor';
import { LogResponseInterceptor } from './log-response.interceptor';
import { HttpCacheService } from './http-cache.service';
import { CacheInterceptor } from './cache.interceptor';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    LoggerService, 
    DataService,
    BooksResolverService,
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true },
    HttpCacheService
  ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
  
 }
