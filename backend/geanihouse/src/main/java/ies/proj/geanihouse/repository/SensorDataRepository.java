package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.SensorData;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Date;

@Repository
public interface SensorDataRepository extends JpaRepository<SensorData, Long>{

    List<SensorData> findAllBySensor_Division_Id(long id);
    List<SensorData>findAllBySensor_Division_IdAndTimestampDateIsBetween(long id,Date start ,Date end);
    List<SensorData>findAllBySensor_Division_IdAndTimestampDateIsBetweenAndSensor_Type_NameIn(long id,Date start ,Date end, List<String> types);
    List<SensorData>findAllBySensor_Division_IdAndTimestampDateIsLessThanEqualAndSensor_Type_NameIn(long id,Date end, List<String> types);
    List<SensorData>findAllBySensor_Division_IdAndTimestampDateIsLessThanEqual(long id,Date end);
    List<SensorData>findAllBySensor_Division_IdAndTimestampDateIsGreaterThan(long id, Date end);
    List<SensorData>findAllBySensor_Division_IdAndSensor_Type_NameIn(long sensor_id, List<String> sensor_type_name);
    List<SensorData> findAllBySensor_Id(long id);
    List<SensorData> findFirstBySensor_IdOrderByTimestampDateDesc(long id);
    List<SensorData> findTop5BySensor_IdOrderByTimestampDateDesc(long id);
    void deleteByTimestampDateBefore(Date expireDate);
}