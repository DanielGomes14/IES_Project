package ies.proj.geanihouse;


import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.*;
import ies.proj.geanihouse.repository.DeviceLogRepository;
import ies.proj.geanihouse.repository.DeviceRepository;
import ies.proj.geanihouse.repository.NotificationRepository;



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
    private Notification lastnotification;
    @Autowired
    private SensorDataRepository sensorDataRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private DeviceLogRepository deviceLogRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @StreamListener(Sink.INPUT)
    public void log(ReceivedSensingData msg) throws ResourceNotFoundException,ErrorDetails {

        if (msg.getMethod().equals("SENSORDATA")){
            long sensor_id = msg.getId();

            Sensor sensor = sensorRepository.findById(sensor_id)
                            .orElseThrow(() -> new ResourceNotFoundException("Sensor with id " + sensor_id + " not found"));

            String typeName = sensor.getType().getName();
            Notification notification = null;

            if ( typeName.equals("Temperature")){
                if(msg.getValue() > 40){
                    notification = new Notification(0,"Temperature Alarm","Temperature is higher than 40ºC",msg.getTimestamp(),sensor.getDivision().getHome());
                }else if (msg.getValue()<10){
                    notification = new Notification(0,"Temperature Alarm","Temperature is lower than 0ºC",msg.getTimestamp(),sensor.getDivision().getHome());
                }
            }else if(typeName.equals("Humidity")){
                if(msg.getValue() > 80){
                    notification = new Notification(0,"Humidity Alarm","Humidity is higher than 80%",msg.getTimestamp(),sensor.getDivision().getHome());
                }else if (msg.getValue()<10){
                    notification = new Notification(0,"Humidity Alarm","Humidity is lower than 10%",msg.getTimestamp(),sensor.getDivision().getHome());
                }
            }else if(typeName.equals("Luminosity")){
                if(msg.getValue() > 85){
                    notification = new Notification(0,"Luminosity Alarm","Luminosity is lower than 85%",msg.getTimestamp(),sensor.getDivision().getHome());
                }else if (msg.getValue()<15){
                    notification = new Notification(0,"Luminosity Alarm","Luminosity is lower than 15%",msg.getTimestamp(),sensor.getDivision().getHome());
                }
            }
            
            if (notification != null){
                System.out.println("Teste" + notification.getText());
                if(this.lastnotification== null || checkLastNotification(notification,this.lastnotification) ){
                    System.out.println(notification.getTitle());
                    this.lastnotification=notification;
                    notificationRepository.save(notification);
                }

            }

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

    public  boolean checkLastNotification(Notification notification, Notification lastnotification ){
        if(!notification.getText().equals(lastnotification.getText())){
            return true;
        }
        LOG.info("possibily new notifcation");
        //check if it's not the same notifcation and the notification is of the same type as the last one
        if(notification.getTimestampDate().compareTo(lastnotification.getTimestampDate()) !=0 ){
            LOG.info("not the same object");
            //if the last notification was sent more than 5 minutes ago, a new notifcation will be sent
            System.out.println(notification.getTimestampDate().getTime());
            LOG.info("Diff" + (notification.getTimestampDate().getTime()-lastnotification.getTimestampDate().getTime()));
            if(notification.getTimestampDate().getTime()-lastnotification.getTimestampDate().getTime()>=5 * 60 * 1000){
                LOG.info("New Notification coming");
                return  true;
            }
            return false;
        }
        return  false;

    }
}
