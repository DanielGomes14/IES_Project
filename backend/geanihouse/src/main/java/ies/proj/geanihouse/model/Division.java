package ies.proj.geanihouse.model;



import javax.persistence.*;


/*
    Created by Bruno Bastos
    on 5-12-2020
*/



@Entity
@Table(name="Division")
public class Division{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    @ManyToOne()
    @JoinColumn(name="home_id", referencedColumnName = "id", insertable = false, updatable = false)    
    private Home home;

    @Column(name = "name", nullable = false,length=50)
    private String name ;

    public Division(){

    }
    public Division(long id,String name,Home home){
        this.id = id;
        this.home = home;
    }
   
    public long getId() {
        return id;
    }

    public void setId(long id){
        this.id = id;
    }


    public void setHome(Home home){
        this.home = home;
    }

    public Home getHome(){
        return this.home;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }
    
}



