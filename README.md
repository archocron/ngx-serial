# NgxSerial

NgxSerial eases the use of the Serial Web API in Angular.

You can establish a bidirectional communication with any device supporting RS232 protocol (native or over USB) using only a web browser, forget running local applications !

Examples of devices could be Arduino like boards, PLC's, Smart Card Readers, Access control devices.

This [Video](https://www.youtube.com/watch?v=Hsl_imkJa7o) show the library in action 

## Installation

First, install the package using npm install

    npm install ngx-serial

## Use

You have available ngx-serial on your project, add the following import in your component.

    import { NgxSerial } from 'ngx-serial';

You can use the class as follow.

    serial: NgxSerial;

    constructor() {
        this.serial = new NgxSerial(this.dataHandler);
    }

Data Handler will receive read data, so here you can implement your read logic. It will read until LF (can be changed passing the string to the constructor) is received.

    dataHandler(data: string) {
        console.log(data);
    }

To request permissions to use the COM port and connect , use the method connect(). 

    this.serial.connect(); 

To use connect() a user interaction is required, for example call this method when the user click a button.

To send data to the serial device use sendData(), this method accept a string as paremeter.

    this.serial.sendData("Data\n");

To free resources execute the method close()

    this.serial.close();

Default options values are.

    baudRate: 9600, dataBits: 8, parity: 'none', bufferSize: 256, flowControl: 'none'

In the constructor you can pass optionally an options Object and the control character (\n by default).

    let options = { baudRate: 9600, dataBits: 8, parity: 'none', bufferSize: 256, flowControl: 'none' };
    this.serial = new NgxSerial(this.dataHandler, options, "\n");

connect() and close() accept a callback function returning the serial port. Can be used to check the connection state.

    if(!this.port){
        this.serial.connect((port:any)=>{
        this.port = port;
    });

    if(this.port)
        this.serial.sendData("L1\n");

    if(this.port)
        this.serial.close((port:any)=>{
        this.port = port;
    });


     <div *ngIf="this.port">
        <span class = "greendot"></span>
        <span>Connected</span>
    </div>
    <div *ngIf="!this.port">
        <span class = "reddot"></span>
        <span>Disconnected</span>
    </div>


 To check an example application made on Angular click [here](https://github.com/archocron/ngx-serial-example) 
 The Arduino Code is located on src/assets/ngx-serial-example.ino

## Broswer support
At this moment (21/06/2021) Chrome, Opera and Edge are supporting Web Serial API

