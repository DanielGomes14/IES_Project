package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.DeviceConf;

import java.util.List;

public interface DeviceConfRepository extends JpaRepository<DeviceConf, Long>{
    DeviceConf findById(long id);
}