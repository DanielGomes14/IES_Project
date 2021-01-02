package ies.proj.geanihouse.service;


import ies.proj.geanihouse.controller.DeviceConfController;
import ies.proj.geanihouse.model.MQMessage;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

@Service
@EnableBinding(Source.class)
public class DeviceConfigurationService {
    @Autowired
    Source source;

    private static final Logger LOG = LogManager.getLogger(DeviceConfigurationService.class);

    //
    private class SendMessageTask implements Runnable {


        private MQMessage message;

        public SendMessageTask(MQMessage message) {
            this.message = message;
        }

        public void run() {
            System.out.println(message);
            source.output().send(MessageBuilder.withPayload(message).build());
        }

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
    public void scheduling(MQMessage message,Timestamp timestamp) {
        LOG.info("Sucessfully scheduled a new Task");
        String reg = this.getCronExpression(timestamp);
        executor.schedule(new SendMessageTask(message), new CronTrigger(reg));
        //executor.schedule(new SendMessageTask(message), new CronTrigger("0 0/1 * * * *"));
    }
}
