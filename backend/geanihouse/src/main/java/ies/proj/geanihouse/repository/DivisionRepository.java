package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.Division;

import java.util.List;

@Repository
public interface DivisionRepository extends JpaRepository<Division, Long>{
    List<Division> findById(long id);
    List<Division> findAllByHome_Id(long id);
}