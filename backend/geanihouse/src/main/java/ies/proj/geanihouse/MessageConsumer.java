package ies.proj.geanihouse;


import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.*;
import ies.proj.geanihouse.repository.DeviceLogRepository;
import ies.proj.geanihouse.repository.DeviceRepository;
import ies.proj.geanihouse.repository.DivisionConfRepository;
import ies.proj.geanihouse.repository.NotificationRepository;

import java.sql.Timestamp;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.cloud.stream.messaging.Sink;
import ies.proj.geanihouse.repository.SensorDataRepository;
import ies.proj.geanihouse.repository.SensorRepository;
import ies.proj.geanihouse.service.SensorMessageService;



@EnableBinding(Sink.class)
public class MessageConsumer {

    private static final Logger LOG = LogManager.getLogger(MessageConsumer.class);
    private Notification lastnotification;

    @Autowired
    SensorMessageService smservice;

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

    @Autowired 
    private DivisionConfRepository divisionconfRepository;

    @StreamListener(Sink.INPUT)
    public void log(ReceivedSensingData msg) throws ResourceNotFoundException,ErrorDetails {
        LOG.info("received data: "+ msg);

        if (msg.getMethod().equals("SENSORDATA")){
            long sensor_id = msg.getId();

            Sensor sensor = sensorRepository.findById(sensor_id)
                            .orElseThrow(() -> new ResourceNotFoundException("Sensor with id " + sensor_id + " not found"));

            LOG.info("Inserting sensor data for sensor with  id: "+ sensor.getId());
            SensorData sd = new SensorData(sensor,msg.getTimestamp(), msg.getValue());
            this.sensorDataRepository.save(sd);
            LOG.info("Adding sensor data");


            List<SensorData> last5 = sensorDataRepository.findTop5BySensor_IdOrderByTimestampDateDesc(sensor_id);
            if(last5.size()>=5){
                double value = 0;
                for(SensorData d: last5)
                    value+=d.getData();

                value/=last5.size();
                checkConfig(sensor,value);
            }

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
                if(this.lastnotification== null || checkLastNotification(notification,this.lastnotification) ){
                    this.lastnotification=notification;
                    notificationRepository.save(notification);
                }

            }

            
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
        //check if it's not the same notifcation and the notification is of the same type as the last one
        if(notification.getTimestampDate().compareTo(lastnotification.getTimestampDate()) !=0 ){
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

    public void checkConfig(Sensor sensor, double value){

        DivisionConf dc = divisionconfRepository.findAllByDivisionIdAndTypeId(
                            sensor.getDivision().getId(), 
                            sensor.getType().getId()
                            );
        
        if (dc==null){
            System.out.println("No config");
            return;
        }

        System.out.println(dc);

        double midValue = (dc.getMaxValue()+dc.getMinValue()) / 2;
        

        // Only sends message if the value of the device is not already set to that value
        List<Device> devices = deviceRepository.findAllByDivisionIdAndTypeId(
            sensor.getDivision().getId(), 
            sensor.getType().getId()
            );
        
            // turns on the device at the midvalue of the division configuration
        for(Device d: devices)
            if (d.getState() != midValue && (value > dc.getMaxValue() || value < dc.getMinValue())){

                LOG.info("Value is outside desired configuraions");
                
                // sends start configuration message to sensors 
                MQMessage msg = new MQMessage("START_CONF",sensor.getId(),sensor.getType().getName(),midValue);
                smservice.sendMessage(msg);

                // finds all devices in that division of that type and turns them on at that value
                // adds the event to the device log
                // creates a notification
                Timestamp timestamp = new Timestamp(System.currentTimeMillis());
                
                d.setState(midValue);
                deviceRepository.save(d);
                DeviceLog log = new DeviceLog(d,timestamp,midValue);
                deviceLogRepository.save(log);
                Notification n = new Notification(0,"Device State Update",
                    "Device " + d.getName() + "is now " + midValue,
                    timestamp,
                    d.getDivision().getHome());
                notificationRepository.save(n);
            }

            
    }

}
