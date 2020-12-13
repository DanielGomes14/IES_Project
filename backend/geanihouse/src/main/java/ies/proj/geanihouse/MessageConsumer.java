package ies.proj.geanihouse;


import ies.proj.geanihouse.controller.HomeController;
import ies.proj.geanihouse.model.ReceivedSensorData;
import ies.proj.geanihouse.model.Sensor;
import ies.proj.geanihouse.model.SensorData;
import org.apache.juli.logging.Log;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.cloud.stream.messaging.Sink;
import ies.proj.geanihouse.repository.SensorDataRepository;
import ies.proj.geanihouse.repository.SensorRepository;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.concurrent.ExecutionException;


@EnableBinding(Sink.class)
public class MessageConsumer {

    private static final Logger LOG = LogManager.getLogger(MessageConsumer.class);

    @Autowired
    private SensorDataRepository sensorDataRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @StreamListener(Sink.INPUT)
    public void log(ReceivedSensorData msg){
        long sensor_id = msg.getSensor_id();

        Sensor sensor = sensorRepository.findById(sensor_id);
        if (sensor==null){
            LOG.info("Id is not valid");
            return;
        }
        LOG.info("Inserting id: "+ sensor.getDivision());
        LOG.info(sensorRepository.findAll());
        SensorData sd = new SensorData(sensor,msg.getTimestamp(), msg.getValue());
        this.sensorDataRepository.save(sd);
    }


}
