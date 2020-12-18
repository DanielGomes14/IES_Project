package ies.proj.geanihouse;


import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.*;
import ies.proj.geanihouse.repository.DeviceLogRepository;
import ies.proj.geanihouse.repository.DeviceRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.cloud.stream.messaging.Sink;
import ies.proj.geanihouse.repository.SensorDataRepository;
import ies.proj.geanihouse.repository.SensorRepository;



@EnableBinding(Sink.class)
public class MessageConsumer {

    private static final Logger LOG = LogManager.getLogger(MessageConsumer.class);

    @Autowired
    private SensorDataRepository sensorDataRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private DeviceRepository deviceRepository;
    @Autowired
    private DeviceLogRepository deviceLogRepository;

    @StreamListener(Sink.INPUT)
    public void log(ReceivedSensingData msg) throws ResourceNotFoundException,ErrorDetails {

        if (msg.getMethod().equals("SENSORDATA")){
            long sensor_id = msg.getId();

            Sensor sensor = sensorRepository.findById(sensor_id)
                            .orElseThrow(() -> new ResourceNotFoundException("Sensor with id " + sensor_id + " not found"));

            LOG.info("Inserting sensor data for sensor with  id: "+ sensor.getId());
            SensorData sd = new SensorData(sensor,msg.getTimestamp(), msg.getValue());
            this.sensorDataRepository.save(sd);
            LOG.info("Adding sensor data");
        }
        else if (msg.getMethod().equals("DEVICELOG")){
            long device_id= msg.getId();
            Device device = deviceRepository.findById(device_id)
                            .orElseThrow(() -> new ResourceNotFoundException("Sensor with id " + device_id + " not found"));
            LOG.info("Inserting  Logs for device with id: "+ device.getId());
            DeviceLog deviceLog= new DeviceLog(device,msg.getTimestamp(), msg.getValue());
            this.deviceLogRepository.save(deviceLog);
            LOG.info("Added Device Log");
        }
        else throw  new ErrorDetails("Method Error");
    }


}
