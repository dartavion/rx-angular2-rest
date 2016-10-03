import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Character} from "../objects/character";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class StarWarsService {

  private charactersUrl = 'http://swapi.co/api/people';
  private googleImageUrl = 'https://www.googleapis.com/customsearch/v1?';
  private cx = '013122818466828674084:g04t2f8jgjo';
  private key = 'AIzaSyADsRflXgDFNb2r9LUT2KPCRb3fQAHFiy4';

  constructor(private http: Http) { }

  getImages(query) {
    if(!query) return;
    let url = `${this.googleImageUrl}q=${query}&cx=${this.cx}&key=${this.key}`;

    return this.http.get(url)
      .map(StarWarsService.extractImageData)
      .flatMap(data => Observable.from(data))
      .pluck('pagemap')
      .pluck('imageobject')
      .scan(StarWarsService.scanData, {count: 0})
      .take(1)
      .catch(StarWarsService.handleError);
  }

  getLightSideCharacters(): Observable<Character[]> {
    return this.http.get(this.charactersUrl)
      .map(StarWarsService.extractData)
      .catch(StarWarsService.handleError);
  }

  private static scanData(data, images) {
    return {
      count: data.count += 1,
      image: images[0].contenturl
      || images[0].url
      || 'http://static.srcdn.com/slir/w538-h800-q90-c538:800/wp-content/uploads/Star-Wars-Logo-News.jpg'
    }
  }

  private static extractImageData(res: Response) {
    let body = res.json();
    return body.items || { };
  }

  private static extractData(res: Response) {
    let body = res.json();
    return body.results || { };
  }

  private static handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
