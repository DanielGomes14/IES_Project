package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.DeviceLog;

import java.util.List;

public interface DeviceLogRepository extends JpaRepository<DeviceLog, Long>{
    DeviceLog findById(long id);
}