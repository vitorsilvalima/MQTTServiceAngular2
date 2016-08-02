import { Component } from '@angular/core';
import { MQTTService } from './mqttService/mqtt.service';

@Component({
    selector: 'my-app',
    providers:[MQTTService],
    templateUrl: 'app/app.component.html'
})
export class AppComponent { 
    title = 'MQTT Service Test';
    messages:Array<any>;
    private onMessage=(message:any)=>{
        this.messages.push(message);
        console.log("Successfully received a message!!!")
        console.log(message);
    }
    constructor(private mqtt:MQTTService){
        var mqtt = this.mqtt;
        this.mqtt.connect().then(function() {
            mqtt.subscribe('#');
            console.log('Succcessfully connected!!!');
        });
        this.messages = new Array();
        this.mqtt.on(this.onMessage);
    }
}
