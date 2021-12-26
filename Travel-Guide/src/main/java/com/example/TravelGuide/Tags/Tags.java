package com.example.TravelGuide.Tags;

import com.example.TravelGuide.Places.Places;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Tags")
public class Tags {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String Name;

    @JsonIgnoreProperties("tag")
    @ManyToMany(mappedBy = "tag")
    private List<Places> places = new ArrayList<>();

    public Tags() {
    }

    public Tags(int id, String name, List<Places> places) {
        Id = id;
        Name = name;
        this.places = places;
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

    public List<Places> getPlaces() {
        return places;
    }

    public void setPlaces(List<Places> places) {
        this.places = places;
    }
}
