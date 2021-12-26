package com.example.TravelGuide.Places;

import com.example.TravelGuide.Reviews.Reviews;
import com.example.TravelGuide.Reviews.ReviewsRepository;
import com.example.TravelGuide.Trips.Trips;
import com.example.TravelGuide.Trips.TripsRepository;
import com.example.TravelGuide.User.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacesService {

    private final PlacesRepository placesRepository;
    private final ReviewsRepository reviewsRepository;


    @Autowired
    public PlacesService(PlacesRepository placesRepository, ReviewsRepository reviewsRepository){
        this.placesRepository=placesRepository;
        this.reviewsRepository=reviewsRepository;
    }

    public List<Places> getAll(){
        return placesRepository.findAll();
    }

    public Places getPlace(String id){
        Integer Place_id = Integer.parseInt(id);
        return placesRepository.findById(Place_id).orElse(null);
    }

    public String addPlace(Places place){
        placesRepository.save(place);
        return "created";

    }

    public void addPlaces(List<Places> Places){
        for(int i=0;i<Places.size();i++){
            placesRepository.save(Places.get(i));}
    }

    public void deletePlace(String id ){
        Integer Place_id = Integer.parseInt(id);
        placesRepository.deleteById(Place_id);

    }

    public Places addReview(Places places) {
        Places p = placesRepository.findById(places.getId()).orElse(null);
        Reviews r = reviewsRepository.save(places.getReviews().get(0));
        p.addreview(r);
        placesRepository.save(p);
        return p;
    }

    public List<Places> getPlacesByTags(String place_id, String tag_name) {
        Integer id = Integer.parseInt(place_id);
        return placesRepository.findPlacesByTag(id,tag_name);
    }

//    public Places addTripToPlace(int placeId, int tripId) {
//        Places Place = placesRepository.findById(placeId).get();
//        Trips Trip = tripsRepository.findById(tripId).get();
//        Place.trips(Trip);
//        return placesRepository.save(Place);
//    }
}
