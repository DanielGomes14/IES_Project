package ies.proj.geanihouse.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import ies.proj.geanihouse.repository.SensorDataRepository;
import org.springframework.scheduling.annotation.Scheduled;


@Service
class DeleteDataService{
    @Autowired
    private SensorDataRepository sensorDataRepository;

    @Scheduled(cron = "/10 * * * * * ") //     0 0 1 * * MON
    public void scheduleTaskUsingCronExpression() {
        // delete data 1 week old
        Calendar cal = Calendar.getInstance();
        Date today = cal.getTime();
        cal.add(Calendar.WEEK_OF_YEAR, -1);
        Date expireDate = cal.getTime();
        //call the method
        sensorDataRepository.deleteByTimestampDateBefore(expireDate);
    }
}