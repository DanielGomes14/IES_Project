package ies.proj.geanihouse.service;


import ies.proj.geanihouse.controller.DeviceConfController;
import ies.proj.geanihouse.model.MQMessage;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

@Service
public class DeviceConfigurationService {
    private static final Logger LOG = LogManager.getLogger(DeviceConfigurationService.class);
    private class MessagePrinterTask implements Runnable {

        private MQMessage message;

        public MessagePrinterTask(MQMessage message) {
            this.message = message;
        }

        public void run() {
            System.out.println(message);
        }

    }
    private final TaskScheduler executor;
    @Autowired
    public DeviceConfigurationService(TaskScheduler taskExecutor) {
        this.executor = taskExecutor;

    }

    public void scheduling(MQMessage message) {
        LOG.info("Sucessfully scheduled a new Task");
        executor.schedule(new MessagePrinterTask(message), new CronTrigger("0 0/1 * * * *"));
    }
}
