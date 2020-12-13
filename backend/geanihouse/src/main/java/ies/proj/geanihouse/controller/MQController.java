package ies.proj.geanihouse.controller;


import java.io.IOException;

import ies.proj.geanihouse.model.ReceivedSensorData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@EnableBinding(Source.class)
public class MQController {

    @Autowired
    Source source;

    @PostMapping(value="/txn")
    public String sendMessage(@RequestBody String payload) {
        System.out.println(payload);
        ObjectMapper ob = new ObjectMapper();
        ReceivedSensorData txn = null;
        try {
            txn = ob.readValue(payload, ReceivedSensorData.class);
        } catch (JsonParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println(txn);
        source.output().send(MessageBuilder.withPayload(txn).build());
        System.out.println("Successfully sent to rabbitmq");
        return "success";
    }
}