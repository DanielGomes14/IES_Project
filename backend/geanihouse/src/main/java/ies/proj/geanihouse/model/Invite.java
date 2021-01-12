package ies.proj.geanihouse.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Time;
import java.sql.Timestamp;

import lombok.*;

@Entity
@Table(name="Invite")
@Getter @Setter
public class Invite{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne()
    @JoinColumn(name="client_id", nullable = false)
    private Client client;

    @OneToOne()
    @JoinColumn(name="invclient_id", nullable = false)
    private Client invclient;

    @OneToOne()
    @JoinColumn(name="home_id", nullable = false)
    private Home home;

    public Invite() {
    }        

    public Invite(Client client, Home home, Client invclient) {
        this.client = client;
        this.invclient = invclient;
        this.home = home;
    }

}