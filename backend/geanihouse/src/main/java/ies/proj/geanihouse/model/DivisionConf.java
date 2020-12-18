package ies.proj.geanihouse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "Division_Conf")
@Getter @Setter
public class DivisionConf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "min_value")
    private double minValue;

    @Column(name = "max_value")
    private double maxValue;

    @ManyToOne()
    @JoinColumn(name="division_id", nullable = false)
    private Division division;

    @ManyToOne()
    @JoinColumn(name="type_id", nullable = false)
    private Type type;

    public DivisionConf(){

    }
    public DivisionConf(long id, Division division, Type type, double minValue, double maxValue){
        this.id = id;
        this.division = division;
        this.type = type;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
}
