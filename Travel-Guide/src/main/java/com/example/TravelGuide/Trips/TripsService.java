package com.example.TravelGuide.Trips;

import com.example.TravelGuide.Places.Places;
import com.example.TravelGuide.Reviews.Reviews;
import com.example.TravelGuide.Reviews.ReviewsRepository;
import com.example.TravelGuide.User.Users;
import com.example.TravelGuide.User.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TripsService {

    private final TripsRepository tripsRepository;
    private final UsersRepository usersRepository;

    @Autowired
    public TripsService(TripsRepository tripsRepository , UsersRepository usersRepository){
        this.tripsRepository=tripsRepository;
        this.usersRepository=usersRepository;
    }

    public List<Trips> getAll(){
        return tripsRepository.findAll();
    }

    public Trips getTrip(String id){
        Integer Trip_id = Integer.parseInt(id);
        return tripsRepository.findById(Trip_id).orElse(null);
    }

    public String addTrip(Trips Trip){
        tripsRepository.save(Trip);
        return "created";

    }

    public void addTrips(List<Trips> Trips){
        for(int i=0;i<Trips.size();i++){
            tripsRepository.save(Trips.get(i));}
    }

    public void deleteTrip(String id ){
        Integer Trip_id = Integer.parseInt(id);
        tripsRepository.deleteById(Trip_id);

    }

    public Trips addUsersToTrips(int TripId, int UserId) {
        Trips Trip = tripsRepository.findById(TripId).get();
        Users User = usersRepository.findById(UserId).get();
        Trip.users(User);
        return tripsRepository.save(Trip);
    }
}
