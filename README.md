# NgxSerial

NgxSerial eases the use of the Serial Web API in Angular.

## Installation

First, install the package using npm install

    $ npm install ngx-serial

## Use

You have available ngx-serial on your project, add the following import in your component.

    $ import { NgxSerial } from 'ngx-serial';

You can use the class as follow.

    $ serial: NgxSerial;

    $ constructor() {
    $   this.serial = new NgxSerial(this.dataHandler);
    $ }

Data Handler will receive read data, so here you can implement your read logic. It will read until CR + LF is received.

    $ dataHandler(data: string) {
    $   console.log(data);
    $ }

To request permissions to use the COM port and connect , use the method connect(). 
    $ this.serial.connect(); 

To use connect() a user interaction is required, for example call this method when the user click a button.

To send data to the serial device use sendData(), this method accept a string as paremeter.
    $ this.serial.sendData("Data\r\n");

To free resources execute the method close()
    $ this.serial.close();

## Broswer support
At this moment Chrome, Opera and Edge are supporting Web Serial API

