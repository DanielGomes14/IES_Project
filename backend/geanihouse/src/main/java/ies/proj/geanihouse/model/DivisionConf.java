package ies.proj.geanihouse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "Division_Conf")
public class DivisionConf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "min_value")
    private double minValue;

    @Column(name = "max_value")
    private double maxValue;

    @ManyToOne()
    @JoinColumn(name="division_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Division division;

    @ManyToOne()
    @JoinColumn(name="type_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getMinValue() {
        return minValue;
    }

    public void setMinValue(double min_value) {
        this.minValue = min_value;
    }

    public double getMaxValue() {
        return maxValue;
    }

    public void setMaxValue(double max_value) {
        this.maxValue = max_value;
    }

    public Division getDivision() {
        return division;
    }

    public void setDivision(Division division) {
        this.division = division;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }


    public String toString(){
        return this.division.getName() + " : " + this.minValue + " - " + this.maxValue + " > " + this.type.getName();
    }

}
