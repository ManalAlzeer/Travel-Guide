package com.example.TravelGuide.User;

import com.example.TravelGuide.Places.Places;
import com.example.TravelGuide.Trips.Trips;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String Username;
    private String Password;
    private String Image;
    private int Age;
    private String PhoneNumber;
    private String Email;
    private String Gender;


    @JsonIgnoreProperties("users")
    @ManyToMany(mappedBy = "users")
    private List<Trips> trips = new ArrayList<>();

    public Users() {
    }

    public Users(int id, String username, String password, String image, int age, String phoneNumber, String email, String gender) {
        Id = id;
        Username = username;
        Password = password;
        Image = image;
        Age = age;
        PhoneNumber = phoneNumber;
        Email = email;
        Gender = gender;
    }

    public List<Trips> getTrips() {
        return trips;
    }

    public void setTrips(List<Trips> trips) {
        this.trips = trips;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getImage() {
        return Image;
    }

    public void setImage(String image) {
        Image = image;
    }

    public int getAge() {
        return Age;
    }

    public void setAge(int age) {
        Age = age;
    }

    public String getPhoneNumber() {
        return PhoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        PhoneNumber = phoneNumber;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getGender() {
        return Gender;
    }

    public void setGender(String gender) {
        Gender = gender;
    }

}
