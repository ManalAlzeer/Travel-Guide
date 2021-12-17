package com.example.TravelGuide.Trips;

import com.example.TravelGuide.Places.Places;
import com.example.TravelGuide.User.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Trips")
public class Trips {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String departure_date;
    private String return_date;

    @JsonIgnoreProperties("trips")
    @ManyToMany
    private List<Users> users = new ArrayList<>();

    @JsonIgnoreProperties("trips")
    @ManyToMany
    private List<Places> places = new ArrayList<>();

    public Trips() {
    }


    public Trips(int id, String departure_date, String return_date, List<Users> users, List<Places> places) {
        Id = id;
        this.departure_date = departure_date;
        this.return_date = return_date;
        this.users = users;
        this.places = places;
    }

    public void setUsers(List<Users> users) {
        this.users = users;
    }

    public void setPlaces(List<Places> places) {
        this.places = places;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getDeparture_date() {
        return departure_date;
    }

    public void setDeparture_date(String departure_date) {
        this.departure_date = departure_date;
    }

    public String getReturn_date() {
        return return_date;
    }

    public void setReturn_date(String return_date) {
        this.return_date = return_date;
    }

    public List<Users> getUsers() {
        return users;
    }


    public List<Places> getPlaces() {
        return places;
    }

    public void places(Places place) {places.add(place);}

    public void users(Users user) {
        users.add(user);
    }

}
