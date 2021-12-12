package com.example.TravelGuide.Places;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacesService {

    private final PlacesRepository placesRepository;

    @Autowired
    public PlacesService(PlacesRepository placesRepository){
        this.placesRepository=placesRepository;
    }

    public List<Places> getAll(){
        return placesRepository.findAll();
    }

    public Places getPlace(String id){
        Integer Place_id = Integer.parseInt(id);
        return placesRepository.findById(Place_id).orElse(null);
    }

    public Places addPlace(Places place){
        return placesRepository.save(place);

    }

    public void addPlaces(List<Places> Places){
        for(int i=0;i<Places.size();i++){
            placesRepository.save(Places.get(i));}
    }

    public void deletePlace(String id ){
        Integer Place_id = Integer.parseInt(id);
        placesRepository.deleteById(Place_id);

    }

}
