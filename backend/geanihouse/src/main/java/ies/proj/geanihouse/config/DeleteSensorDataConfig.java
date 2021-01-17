package ies.proj.geanihouse.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.context.annotation.Configuration;

import java.util.Calendar;
import java.util.Date;
import ies.proj.geanihouse.repository.SensorDataRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.EnableScheduling;


@Configuration
@EnableScheduling
class DeleteSensorDataConfig{
    @Autowired
    private SensorDataRepository sensorDataRepository;

    @Transactional
    @Scheduled(cron = "0 0 1 * * MON" ) //      */20 * * * * *
    public void scheduleTaskUsingCronExpression() {
        // delete data 1 week old
        Calendar cal = Calendar.getInstance();
        Date today = cal.getTime();
        cal.setTime(today);
        cal.add(Calendar.WEEK_OF_YEAR, -1);
        //cal.add(Calendar.SECOND, -20);
        Date expireDate = cal.getTime();
        //call the method
        sensorDataRepository.deleteByTimestampDateBefore(expireDate);
    }
}