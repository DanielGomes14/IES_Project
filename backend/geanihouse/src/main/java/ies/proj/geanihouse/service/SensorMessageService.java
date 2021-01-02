package ies.proj.geanihouse.service;


import org.springframework.cloud.stream.messaging.Source;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import ies.proj.geanihouse.model.MQMessage;
import org.springframework.integration.support.MessageBuilder;



@EnableBinding(Source.class)
public class SensorMessageService{

    @Autowired
    private Source source;


    public void sendMessage(MQMessage msg){
        source.output().send(MessageBuilder.withPayload(msg).build());
        System.out.println("Message Sent");
    }


}