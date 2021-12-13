package com.example.TravelGuide.Places;

import com.example.TravelGuide.Cities.Cities;
import com.example.TravelGuide.Tags.Tags;
import com.example.TravelGuide.Trips.Trips;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Places")
public class Places {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String Name;
    private String Description;
    private String Image;
    private String Location;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "city_id")
    private Cities city;

    @ManyToMany
    private List<Tags> tag = new ArrayList<>();

    @ManyToMany
    private List<Trips> trips = new ArrayList<>();


    public Places(int id, String name, String description, String image, String location, Cities city, List<Tags> tag, List<Trips> trips) {
        Id = id;
        Name = name;
        Description = description;
        Image = image;
        Location = location;
        this.city = city;
        this.tag = tag;
        this.trips = trips;
    }

    public Places() {
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getImage() {
        return Image;
    }

    public void setImage(String image) {
        Image = image;
    }

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        Location = location;
    }

    public Cities getCity() {
        return city;
    }

    public void setCity(Cities city) {
        this.city = city;
    }

    public List<Tags> getTag() {
        return tag;
    }

    public void setTag(List<Tags> tag) {
        this.tag = tag;
    }

    public List<Trips> getTrips() {
        return trips;
    }

    public void setTrips(List<Trips> trips) {
        this.trips = trips;
    }

    public void trips(Trips trip) {
        trips.add(trip);
    }
}