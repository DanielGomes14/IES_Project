package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.SensorData;

import java.util.List;
import java.util.Optional;

@Repository
public interface SensorDataRepository extends JpaRepository<SensorData, Long>{

    List<SensorData> findAllBySensor_Division_Id(long id);
    List<SensorData> findAllBySensor_Id(long id);
    List<SensorData> findFirstBySensor_IdOrderByTimestampDateDesc(long id);
    List<SensorData> findTop5BySensor_IdOrderByTimestampDateDesc(long id);
}