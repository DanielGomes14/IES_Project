package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.SensorData;

import java.util.List;
@Repository
public interface SensorDataRepository extends JpaRepository<SensorData, Long>{

    List<SensorData> findAllBySensor_Division_Id(long id);
}