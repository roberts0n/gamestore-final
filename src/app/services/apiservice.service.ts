import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from
'@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {


  constructor(private http : HttpClient) { }

    steamApiUrl = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=570&count=3&maxlength=300&format=json&key=FE27769565A428D11FD33C306759454E';
    deeplApiUrl = 'https://api-free.deepl.com/v2/translate';
    deeplApiKey = '77f9ab04-cd7a-4c2f-83ce-35cedca1bc65:fx';
    steamApiKey = 'FE27769565A428D11FD33C306759454E'
    private apiURL = 'https://api.rawg.io/api/stores';
    private apiKey = 'b51c0d15c6ab4282ae1cb180ff3a3045';
    private gamesApiURL = 'https://api.rawg.io/api/games'; 


  getNoticias(appId: number, count : number = 3, maxLength : number = 300, ):Observable<any[]>{
    const url = `${this.apiURL}?appid=${appId}&count=${count}&maxlength=${maxLength}&format=json&key=${this.steamApiKey}`;

    return this.http.get(url).pipe(
      retry(3),
      map((response: any) => response.appnews.newsitems),
      map(newsItems => newsItems.map((item: any) => ({
        title: item.title,
        contents: item.contents,
        date: new Date(item.date * 1000),
        author: item.author,
        url: item.url
      })))
    );
  }

  getStores(): Observable<any> {
    return this.http.get(`${this.apiURL}?key=${this.apiKey}`);
  }


  getJuegosRecientes(limit: number): Observable<any> {
    // Definir las fechas fijas que quieres usar
    const startDate = '2024-09-18'; // Fecha de inicio
    const endDate = '2024-10-18'; // Fecha de fin
  
    const url = `${this.gamesApiURL}?key=${this.apiKey}&dates=${startDate},${endDate}&ordering=-released&page_size=${limit}`;
    return this.http.get(url);
  }


 /*  getJuegosProximos( limit: number ): Observable<any> {
    const today = new Date().toISOString().split('T')[0]; 
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    const threeMonthsLaterDate = threeMonthsLater.toISOString().split('T')[0]; 
  
   
    const url2 = `https://api.rawg.io/api/games?key=b51c0d15c6ab4282ae1cb180ff3a3045&dates=2024-11-03,2025-01-31&ordering=released&page_size=6`
    
    return this.http.get(url2);
  }
   */


  getJuegosProximos(limit: number = 6): Observable<any> {
    const today = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    const threeMonthsLaterDate = threeMonthsLater.toISOString().split('T')[0]; // Fecha de dentro de tres meses
  
    const url = `https://api.rawg.io/api/games?key=b51c0d15c6ab4282ae1cb180ff3a3045&dates=${today},${threeMonthsLaterDate}&ordering=released&page_size=${limit}`;
    const url2 = `https://api.rawg.io/api/games?key=b51c0d15c6ab4282ae1cb180ff3a3045&dates=2024-11-03,2025-01-31&ordering=released&page_size=6`
  
    return this.http.get(url2).pipe(
      map((response: any) => 
        response.results.map((game: any) => ({
          name: game.name,
          releaseDate: game.released,
          platforms: game.parent_platforms.map((platform: any) => platform.platform.name),
          image: game.background_image, // Extrae los nombres de las plataformas
        }))
      )
    );
  }


  getJuegoByNombre(nombre : string){
    const apiKey = 'b51c0d15c6ab4282ae1cb180ff3a3045'; // Tu API key
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(nombre)}`;

    return this.http.get(url);
  }

  getJuegoById(id: number):  Observable<any> {
    const apiKey = 'b51c0d15c6ab4282ae1cb180ff3a3045';
    const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
    return this.http.get(url);
  }

  getScreenshotsById(gameId: number): Observable<any> {
    const url = `https://api.rawg.io/api/games/${gameId}/screenshots?key=${this.apiKey}`;
    return this.http.get<any>(url);
  }




  }


