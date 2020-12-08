package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    User findById(long idl);
    User findByEmail(String email);

}