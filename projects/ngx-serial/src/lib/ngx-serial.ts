import { NONE_TYPE } from "@angular/compiler";

export class NgxSerial {
    
  /*autoconnect: boolean = false;
  index: number = -1;*/
  private port: any;
  private options = { baudRate: 9600, dataBits: 8, parity: 'none', bufferSize: 256, flowControl: 'none' }; //Default
  private writer: any;
  private  readFunction:Function;

  /*constructor(readFunction:Function, autoconnect?: boolean, index?: number) {
    this.readFunction = readFunction;
    if (autoconnect) {
        this.autoconnect = autoconnect;
    }

    if (index) {
        this.index = index;
    }
    
}*/
constructor(readFunction:Function) {
    this.readFunction = readFunction;
       
}
 public  async sendData(data: string) {
    await this.writer.write(data);
}

 
 
  private async readLoop() {  
      while (this.port.readable) {
        const textDecoder = new TextDecoderStream();
      const readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable
      .pipeThrough(new TransformStream(new LineBreakTransformer()))
      .getReader();
          try {
              while (true) {
                  const { value, done } = await reader.read();
                  if (done) {
                      // Allow the serial port to be closed later.
                      reader.releaseLock();
                      break;
                  }
                  if (value) {
                      //console.log(value);
                      this.readFunction(value);
                  }
              }
          } catch (error) {
              // TODO: Handle non-fatal read error.
          }
      }
  }
  public async close(){
    
      this.writer.releaseLock();
      await this.port.close();
  }
  
  public async connect() {
      if ("serial" in navigator) {
          // The Web Serial API is supported by the browser.
          let nav: any = navigator;
          const ports = await nav.serial.getPorts();
  
         /* if (ports.length == 0 || !this.autoconnect) {
              this.port = await nav.serial.requestPort();
          } else {
              if (this.index != -1)
                  this.port = ports[this.index];
              else
                  this.port = ports[0];
  
          }*/
  

          this.port = await nav.serial.requestPort();

  
          await this.port.open(this.options);
  
          const textEncoder = new TextEncoderStream();
          const writableStreamClosed = textEncoder.readable.pipeTo(this.port.writable);    
          this.writer = textEncoder.writable.getWriter();
  
          this.readLoop();
  
  
  
      } else {
          console.error("This browser does NOT support serial API");
  
      }
  
  }
}

class LineBreakTransformer {
    chunks:any = "";
    constructor() {
      // A container for holding stream data until a new line.
      this.chunks = "";
    }
  
    transform(chunk:any, controller:any) {
      // Append new chunks to existing chunks.
      this.chunks += chunk;
      // For each line breaks in chunks, send the parsed lines out.
      const lines = this.chunks.split("\r\n");
      this.chunks = lines.pop();
      lines.forEach((line: any) => controller.enqueue(line));
    }
  
    flush(controller:any) {
      // When the stream is closed, flush any remaining chunks out.
      controller.enqueue(this.chunks);
    }
  }