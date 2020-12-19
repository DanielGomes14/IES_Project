package ies.proj.geanihouse.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Time;
import java.sql.Timestamp;

import lombok.*;

@Entity
@Table(name="Notification")
@Getter @Setter
public class Notification{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title", nullable = false,length=100)
    private String title;

    @Column(name = "text", nullable = false,length=500)
    private String text;

    @CreationTimestamp
    @Column(name = "timestamp_date")
    private Timestamp timestampDate;

    @ManyToOne()
    @JoinColumn(name="home_id", nullable = false)
    private Home home;

    public Notification(){

    }

    public Notification(long id, String title, String text, Timestamp timestampDate, Home home) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.timestampDate = timestampDate;
        this.home = home;
    }

}