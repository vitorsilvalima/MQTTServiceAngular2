import { Injectable } from '@angular/core';

declare var Paho: any;


@Injectable()
export class MQTTService {
    private mqttClient:any;
    private onConnectionLost(error:any,erroMessage:any){
        console.log("Error :"+error +' '+erroMessage);
        console.log(error);
    }

    connect(){
        this.mqttClient = new Paho.MQTT.Client("10.96.73.230", 9001, "teste");
        this.mqttClient.onConnectionLost=this.onConnectionLost;
        var mqtt = this.mqttClient;
        return new Promise(function(resolve, reject) {
            function onFailure() {
                reject();
            }
            function onConnect(){
                console.log(mqtt);
                resolve();//resolve(response.data);
                //mqtt.subscribe('#');
            }
            mqtt.connect({onSuccess:onConnect,
                onFailure:onFailure,
                userName: "admin",
                password: "redhat",
            });
        });
    }
    on=(callback:any)=>{
        this.mqttClient.onMessageArrived=function () {
          var arg=arguments;
          //console.log(arg);
          callback.apply(null,arg);
        }
    }
    emit=(message:any)=>{

    }
    subscribe=(topic:String)=>{
        //console.log(this.mqttClient);
        this.mqttClient.subscribe(topic);
    }
}