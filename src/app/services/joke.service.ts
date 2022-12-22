import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Joke } from '../model/Joke';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  constructor(private http: HttpClient) {}

  getJoke(): Observable<Joke> {
    return this.http.get<Joke>('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });
  }
}
