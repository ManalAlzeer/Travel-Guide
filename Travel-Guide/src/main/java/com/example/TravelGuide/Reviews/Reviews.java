package com.example.TravelGuide.Reviews;

import com.example.TravelGuide.Places.Places;
import com.example.TravelGuide.User.Users;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "Reviews")
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private int rating;
    private String comment;

//    @ManyToOne(fetch = FetchType.EAGER, optional = true)
//    @JoinColumn(name = "place_id")
//    @JsonIgnoreProperties("reviews")
//    private Places place;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JsonIgnoreProperties("trips")
    @JoinColumn(name = "user_id")
    private Users user;

    public Reviews() {
    }

    public Reviews(int id, int rating, String comment, Users user) {
        Id = id;
        this.rating = rating;
        this.comment = comment;
//        this.place = place;
        this.user = user;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

//    public Places getPlace() {
//        return place;
//    }
//
//    public void setPlace(Places place) {
//        this.place = place;
//    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
