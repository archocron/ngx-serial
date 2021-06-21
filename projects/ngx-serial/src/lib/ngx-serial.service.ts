import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxSerialService {

  constructor() { }
  
  doSomething() {
	// Make sure tree shaking won't remove the lib during the build
	console.log("Hola desde librería")
  }
}
