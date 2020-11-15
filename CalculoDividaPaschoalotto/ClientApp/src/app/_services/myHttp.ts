import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class myHttp {

  private httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

  constructor(private http: HttpClient, private route: Router) { }

  post(url: string, model: Object) {

    return new Promise(resolve => {
      this.http.post<Object>(url, model, this.httpOptions).subscribe(result => {
        resolve(new myHttpResponse("success", result));
      },
        error => {
          resolve(new myHttpResponse("error", error));
        });
    });
  }
}

export class myHttpResponse {
  constructor(public status: string, public model: Object) { }
}
