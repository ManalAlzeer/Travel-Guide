package com.example.TravelGuide.User;

import com.example.TravelGuide.Places.Places;
import com.example.TravelGuide.Reviews.Reviews;
import com.example.TravelGuide.Trips.Trips;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;
    private String image;
    private int age;
    private String phoneNumber;
    private String email;
    private String gender;
    private String role;


    @JsonIgnoreProperties("users")
    @ManyToMany(mappedBy = "users")
    private List<Trips> trips = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Reviews> reviews = new ArrayList<>();


    public Users() {
    }

    public Users(int id, String username, String password, String image, int age, String phoneNumber, String email, String gender, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.image = image;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.gender = gender;
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Trips> getTrips() {
        return trips;
    }

    public void setTrips(List<Trips> trips) {
        this.trips = trips;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}