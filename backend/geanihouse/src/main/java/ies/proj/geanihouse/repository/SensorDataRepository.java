package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.SensorData;

import java.util.List;

public interface SensorDataRepository extends JpaRepository<SensorData, Long>{
    List<SensorData> findById(long id);
}