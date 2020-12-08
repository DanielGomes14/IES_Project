package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.Device;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Long>{
    Device findById(long id);
}