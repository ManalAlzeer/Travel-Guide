package com.example.TravelGuide.Cities;

import com.example.TravelGuide.Countries.Countries;
import com.example.TravelGuide.Places.Places;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Cities")
public class Cities {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String Name;
    private String Description;
    private String Image;
    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "country_id")
    private Countries country;

    @OneToMany(mappedBy = "city")
    @JsonIgnoreProperties("city")
    List<Places> places = new ArrayList<>();

    public Cities() {
    }

    public Cities(int id, String name, String description, String image, Countries country) {
        Id = id;
        Name = name;
        Description = description;
        Image = image;
        this.country = country;
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

    public Countries getCountry() {
        return country;
    }

    public void setCountry(Countries country) {
        this.country = country;
    }

    public List<Places> getPlaces() {
        return places;
    }

    public void setPlaces(List<Places> places) {
        this.places = places;
    }
}
