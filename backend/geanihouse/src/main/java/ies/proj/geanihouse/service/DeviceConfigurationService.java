package ies.proj.geanihouse.service;


import ies.proj.geanihouse.controller.DeviceConfController;
import ies.proj.geanihouse.controller.DeviceLogController;
import ies.proj.geanihouse.model.Device;
import ies.proj.geanihouse.model.DeviceConf;
import ies.proj.geanihouse.model.DeviceLog;
import ies.proj.geanihouse.model.MQMessage;
import ies.proj.geanihouse.model.Notification;
import ies.proj.geanihouse.repository.DeviceConfRepository;
import ies.proj.geanihouse.repository.DeviceRepository;
import ies.proj.geanihouse.repository.NotificationRepository;
import org.apache.juli.logging.Log;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.IdentityHashMap;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

@Service
@EnableBinding(Source.class)
public class DeviceConfigurationService {
    @Autowired
    Source source;

    @Autowired
    DeviceRepository deviceRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    DeviceLogController deviceLogController;

    private final Map<Long, ScheduledFuture<?>> scheduledTasks = new IdentityHashMap<>();
    private static final Logger LOG = LogManager.getLogger(DeviceConfigurationService.class);

    private class SendMessageTask implements Runnable {

        private DeviceConf deviceConf;
        private MQMessage message;

        public SendMessageTask(MQMessage message,DeviceConf deviceConf) {
            this.message = message;
            this.deviceConf=deviceConf;
        }

        public void run() {
            //For eletronic types we dont send a message to the MQ, therefore the message parameter will be null
            if(message!=null){
                LOG.info("Sent to rabbitmq Configuration Message");
                source.output().send(MessageBuilder.withPayload(message).build());
                scheduledTasks.remove(deviceConf.getId());
            }
            else{
                LOG.info("Changed State for Device");
            }   

            double state = deviceConf.getValue();
            Device d = deviceConf.getDevice();
            d.setState(state);

            DeviceLog log = new DeviceLog(d,System.currentTimeMillis(),state);

            deviceLogController.save(log);
            deviceRepository.save(d);
            savenewNotification(d);

        }
        public void savenewNotification(Device d){
            String state = d.getState()==0? " Off" : " On";
            //create notification
            Notification notf = new Notification(0,"Device State Update",
                    "Device " + d.getName() + " is now " + state,
                    new Timestamp(System.currentTimeMillis()),
                    d.getDivision().getHome()
            );
            notificationRepository.save(notf);
        }
        public MQMessage getMessage(){return this.message;}

    }

    private final TaskScheduler executor;
    @Autowired
    public DeviceConfigurationService(TaskScheduler taskExecutor) {
        this.executor = taskExecutor;

    }
    public String getCronExpression(Timestamp timestamp){
        StringBuilder sb = new StringBuilder();
        //start schedule one minute before configuration date
        sb.append("0 ").append(timestamp.getMinutes()).append(" "+ timestamp.getHours()).append(" * * *");
        LOG.info(sb.toString());
        return sb.toString();
    }

    public void scheduling(DeviceConf deviceConf, MQMessage message, Timestamp timestamp) {

        String reg = this.getCronExpression(timestamp);
        SendMessageTask task = new SendMessageTask(message,deviceConf);

        ScheduledFuture<?> future = executor.schedule(task, new CronTrigger(reg));
        scheduledTasks.put(deviceConf.getId(),future);
        LOG.info("Sucessfully scheduled a new Task");
        }

    public  void editSchedule(DeviceConf deviceConf,MQMessage message,Timestamp timestamp){
        String reg = this.getCronExpression(timestamp);
        ScheduledFuture task = scheduledTasks.get(deviceConf.getId());
        task.cancel(true);
        scheduledTasks.remove(deviceConf.getId());
        this.scheduling(deviceConf,message,timestamp);
        LOG.info("Success Editing Schedule!");
        }

    public  void cancelSchedule(DeviceConf deviceConf){
        ScheduledFuture task = scheduledTasks.get(deviceConf.getId());
        task.cancel(true);
        scheduledTasks.remove(deviceConf.getId());
        LOG.info("Success Removing Schedule!");
    }

}

