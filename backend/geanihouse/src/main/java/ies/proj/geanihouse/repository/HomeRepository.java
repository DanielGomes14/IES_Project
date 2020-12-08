package ies.proj.geanihouse.repository;

import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface HomeRepository extends  JpaRepository<Home,Long> {
    Home findById(long idl);
    List<Home> findAllByClients_id(long id);

}
