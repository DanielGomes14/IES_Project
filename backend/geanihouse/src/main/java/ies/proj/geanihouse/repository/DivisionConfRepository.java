package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.DivisionConf;

import java.util.List;
@Repository
public interface DivisionConfRepository extends JpaRepository<DivisionConf, Long>{
    List<DivisionConf> findAllByDivisionId(long id);
}