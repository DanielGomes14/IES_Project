package ies.proj.geanihouse;


import ies.proj.geanihouse.model.Transaction;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.cloud.stream.messaging.Sink;

@EnableBinding(Sink.class)
public class MessageConsumer {
    @StreamListener(Sink.INPUT)
    public void log(Transaction msg){
        System.out.println("Message contains orderid as " + msg.getOrderId());
    }
}
