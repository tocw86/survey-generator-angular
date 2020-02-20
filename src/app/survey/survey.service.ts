import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class SurveyService {

  private apiUrl: string;
  errorPage;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  /**
   * Get user id
   * @return string uuid
   */
  public getUserId(): string {
    const localStorageItem = localStorage.getItem('current_upc_survey');
    if (localStorageItem != null) {
        return JSON.parse(localStorageItem).uuid;
    }
    return null;
}

/**
 * Get token
 * @return string token
 */
  getToken(): string {
    const localStorageItem = localStorage.getItem('current_upc_survey');
    if (localStorageItem != null) {
      return JSON.parse(localStorageItem).token;
    }
    return null;
}

/**
 * Send survey
 * @param survey 
 * @param callback 
 */
  sendSurvey(survey,  callback): any {
    survey.user_id = this.getUserId();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post(environment.apiUrl + '/datacenter/store/survey',
    {survey: JSON.stringify(survey), clientSecret: environment.clientSecret, uuid: this.getUserId(),
      surveyId: this.getSurveyId(), token: this.getToken()},
    {headers}).subscribe(response => {
      if (response && response['message']  && response['message'] == 'Created') {
        callback();
      }

    });
  }
  /**
   * Get survey id
   */
  getSurveyId() {
    const localStorageItem = localStorage.getItem('current_upc_survey');
    if (localStorageItem != null) {
        return JSON.parse(localStorageItem).survey.surveyId;
    }
    return null;
  }

  /**
   * Get survey
   * @param uuid 
   * @param surveyId 
   */
  async getSurvey(uuid, surveyId) {
    if (uuid) {
      const data = await this.http.post(this.apiUrl + '/datacenter/get/survey', 
      { clientSecret: environment.clientSecret, uuid, surveyId }).toPromise().catch(response => {
        if(response && response.error){
          return {};
        } 
      });
      if (data && data['survey'] && data['token'] && data['uuid'])
      return { survey: data['survey'], token: data['token'], uuid: data['uuid'] };
      else
      return {};
    }
  }

  /**
   * Store to local
   * @param survey 
   */
  public storeSurvey(survey) {
    localStorage.setItem('current_upc_survey', JSON.stringify(survey));
  }

}
