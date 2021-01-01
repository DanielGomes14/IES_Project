package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.DeviceConf;

import java.util.List;

@Repository
public interface DeviceConfRepository extends JpaRepository<DeviceConf, Long>{
    List<DeviceConf> findAllByDevice_Id(long id);
    List<DeviceConf> findFirstByDevice_idOrderByIdDesc(long id);
}