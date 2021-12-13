package com.example.TravelGuide.Places;

import com.example.TravelGuide.Trips.Trips;
import com.example.TravelGuide.Trips.TripsRepository;
import com.example.TravelGuide.User.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacesService {

    private final PlacesRepository placesRepository;
    private final TripsRepository tripsRepository;


    @Autowired
    public PlacesService(PlacesRepository placesRepository, TripsRepository tripsRepository){
        this.placesRepository=placesRepository;
        this.tripsRepository=tripsRepository;
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

    public Places addTripToPlace(int placeId, int tripId) {
        Places Place = placesRepository.findById(placeId).get();
        Trips Trip = tripsRepository.findById(tripId).get();
        Place.trips(Trip);
        return placesRepository.save(Place);
    }
}
