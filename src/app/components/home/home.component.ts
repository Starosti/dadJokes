import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { Joke } from 'src/app/model/Joke';
import { JokeService } from 'src/app/services/joke.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  joke!: Joke;
  subscription!: Subscription;
  spinnerIcon = faSpinner;

  constructor(private jokeService: JokeService) {}

  ngOnInit(): void {
    this.newJoke();
  }

  newJokeBtnClick(event: Event): void {
    this.newJoke(event.target as Element);
  }

  newJoke(elem?: Element): void {
    this.subscription?.unsubscribe();

    elem?.classList.add('hidden');
    document.querySelector('#spinner')?.classList.remove('hidden');

    this.subscription = this.jokeService
      .getJoke()
      .pipe(
        finalize(() => {
          elem?.classList.remove('hidden');
          document.querySelector('#spinner')?.classList.add('hidden');
        })
      )
      .subscribe((data) => (this.joke = data));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
