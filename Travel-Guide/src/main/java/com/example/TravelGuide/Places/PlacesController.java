package com.example.TravelGuide.Places;


import com.example.TravelGuide.Cities.Cities;
import com.example.TravelGuide.Cities.CitiesService;
import com.example.TravelGuide.Trips.Trips;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "Places")
@CrossOrigin("*")
public class PlacesController {
    private final PlacesService placesService;

    @Autowired
    public PlacesController(PlacesService placesService) {
        this.placesService = placesService;
    }

    @GetMapping
    public List<Places> getPlaces(){
        return placesService.getAll();
    }

    @GetMapping("/{id}")
    public Places getPlace(@PathVariable String id){
        return placesService.getPlace(id);
    }

    @PostMapping
    public String createPlace(@RequestBody Places place){
        return placesService.addPlace(place);
    }

    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable String id){
        placesService.deletePlace(id);
    }

    @PostMapping ("/all")
    public List<Places> addPlaces(@RequestBody List<Places> places){
        placesService.addPlaces(places);
        return getPlaces();
    }

    //    int TripId, int UserId
    @PutMapping("/{placeId}/trips/{tripId}")
    public Places addTripToPlace(@RequestBody @PathVariable int placeId, @PathVariable int tripId) {
        return placesService.addTripToPlace(placeId,tripId);
    }

}
