package ies.proj.geanihouse.repository;

import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface HouseRepository extends  JpaRepository<Home,Long> {
    Home findById(long idl);
    List<Home> findAllByUsersContains(User user);
}
