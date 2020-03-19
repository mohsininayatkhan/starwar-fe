import { Injectable } from '@angular/core';
import * as PostModels from  'src/shared/models/timeline/post.models';
import * as AuthModels from  'src/shared/models/auth/auth.models';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

 @Injectable()
export class ErrorHandlerService
{     
    constructor(private toastr: ToastrService) {}

    getPostErrors(error: HttpErrorResponse)
    {
        let errorResponse: PostModels.PostErrorResponse;
      
        if ((typeof error.error.message === 'undefined') || error.error.message == '') {
          errorResponse = {
            message : 'Something went wrong.',
            errors: null
          };               
        } else if (typeof error.error.errors === 'undefined') {
          errorResponse = {
            message: error.error.message,
            errors: null
          }
        } else {
          const errorDetail = error.error.errors;
          const errorFields = Object.keys(errorDetail);
          let errorsList = [];
      
          errorFields.forEach(element => {
            const fieldErrors = errorDetail[element];
            fieldErrors.forEach(error => {
              errorsList.push(error);
            });
          });
          
          errorResponse = {
            message: error.error.message,
            errors: errorsList
          }
        }
        return errorResponse;
    } 

    getAuthErrors(error: HttpErrorResponse)
    {
        let errorResponse: AuthModels.AuthErrorResponse;
      
        if (typeof error.error.message === 'undefined') {
          errorResponse = {
            message : 'Something went wrong.',
            errors: null
          };               
        } else if (typeof error.error.errors === 'undefined') {
          errorResponse = {
            message: error.error.message,
            errors: null
          }
        } else {
          const errorDetail = error.error.errors;
          const errorFields = Object.keys(errorDetail);
          let errorsList = [];
      
          errorFields.forEach(element => {
            const fieldErrors = errorDetail[element];
            fieldErrors.forEach(error => {
              errorsList.push(error);
            });
          });
          
          errorResponse = {
            message: error.error.message,
            errors: errorsList
          }
        }
        return errorResponse;
    }

    showErrors(errorResponse: AuthModels.AuthErrorResponse) 
    {          
        if(errorResponse.errors==null) {
            this.toastr.error('Sorry!', errorResponse.message);
        } else {
            errorResponse.errors.forEach(element => {                        
                this.toastr.error(errorResponse.message, element);
            });
        }
    }
}