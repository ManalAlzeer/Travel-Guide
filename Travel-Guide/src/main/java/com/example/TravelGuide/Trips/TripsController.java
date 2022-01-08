package com.example.TravelGuide.Trips;

import com.example.TravelGuide.Places.Places;
import com.example.TravelGuide.User.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "Trips")
@CrossOrigin("*")
public class TripsController {
    private final TripsService tripsService;

    @Autowired
    public TripsController(TripsService tripsService) {
        this.tripsService = tripsService;
    }

    @GetMapping
    public List<Trips> getTrips(){
        return tripsService.getAll();
    }

    @GetMapping("/{id}")
    public Trips getTrip(@PathVariable String id){
        return tripsService.getTrip(id);
    }

    @PostMapping
    public String createTrip(@RequestBody Trips Trip){
        return tripsService.addTrip(Trip);
    }

    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable String id){
        tripsService.deleteTrip(id);
    }

    @PostMapping ("/all")
    public List<Trips> addTrips(@RequestBody List<Trips> Trips){
        tripsService.addTrips(Trips);
        return getTrips();
    }
//    int TripId, int UserId
    @PutMapping("/{TripId}/users/{UserId}")
    public Trips addUsersToTrips(@PathVariable int TripId, @PathVariable int UserId) {
        return tripsService.addUsersToTrips(TripId,UserId);
    }
}
