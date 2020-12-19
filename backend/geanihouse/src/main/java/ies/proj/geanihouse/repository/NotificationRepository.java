package ies.proj.geanihouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.proj.geanihouse.model.Notification;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>{
    List<Notification> findAllByHome_idOrderByTimestampDateDesc(long id);
    List<Notification> findTop5ByHome_idOrderByTimestampDateDesc(long id);
}