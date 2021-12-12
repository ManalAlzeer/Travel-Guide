package com.example.TravelGuide.Countries;

import javax.persistence.*;

@Entity
@Table(name = "countries")
public class Countries {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String Name;
    private String Continents;
    private String Language;

    public Countries() {
    }

    public Countries(int id, String name, String continents, String language) {
        Id = id;
        Name = name;
        Continents = continents;
        Language = language;
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

    public String getContinents() {
        return Continents;
    }

    public void setContinents(String continents) {
        Continents = continents;
    }

    public String getLanguage() {
        return Language;
    }

    public void setLanguage(String language) {
        Language = language;
    }

}
