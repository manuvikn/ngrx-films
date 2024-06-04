export class Film {
  public title: string;
  public year: number;
  public imdbID: number;
  public type: string;
  public poster: string;

  constructor(
    title: string,
    year: number,
    id: number,
    type: string,
    poster: string
  ) {
    this.title = title;
    this.year = year;
    this.imdbID = id;
    this.type = type;
    this.poster = poster;
  }
}
