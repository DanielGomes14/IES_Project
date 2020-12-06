package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.Type;

import java.util.List;



public interface TypeRepository extends JpaRepository<Type, Long>{
        List<Type> findById(long id);
        List<Type> findAllByHome_id(long id);
}
