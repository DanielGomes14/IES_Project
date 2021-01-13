package ies.proj.geanihouse.repository;

import ies.proj.geanihouse.model.Invite;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


import java.util.List;

@Repository
public interface InviteRepository extends  JpaRepository<Invite,Long> {

    List<Invite> findAllByInvclient_id(long id);

    List<Invite> findAllByHome_id(long id);
}
