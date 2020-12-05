package ies.proj.geanihouse.model;

import javax.persistence.*;
import java.sql.Date;
import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;

//https://grokonez.com/spring-framework/spring-data/springjpa-save-filesimages-mysql-database-lob-annotation
//https://www.baeldung.com/spring-security-registration-password-encoding-bcrypt

@Entity
@Table(name = "user")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "first_name", nullable = false,length=50)
    private String firstName;

    @Column(name = "last_name", nullable = false,length=50)
    private String lastName;
    
    @Column(name = "email", nullable = false,length=320) 
    private String email;

    @Column(name = "sex" ,length=10)
    private String sex;
    
    @Column(name = "birth")
    private java.sql.Date birth;

    @Column(name = "password",nullable = false)
    private String password;


    
    @Lob
    @Column(name="profilepic")
    private byte[] profilepic;

    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    private Set<Home> homes = new HashSet<>();


    public User() {

    }

    public User(String firstName, String lastName, String email, java.sql.Date birth, String sex ,String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birth=birth;
        this.sex=sex;
        this.password=password;

    }

    public java.sql.Date getStartDate() {
        return birth;
    }
    
    public void setStartDate(java.sql.Date birth) {
    this.birth = birth;
    }

    private void setSex( String sex){
        this.sex=sex;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public byte[] getPic(){
        return this.profilepic;
    }
    public void setPic(byte[] pic){
        this.profilepic = pic;
    }
    
    @Override
    public String toString() {
        return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", emailId=" + email
                + "]";
    }

}
