package com.example.TravelGuide.Cities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CitiesService {

    private final CitiesRepository citiesRepository;

    @Autowired
    public CitiesService(CitiesRepository citiesRepository){
        this.citiesRepository=citiesRepository;
    }

    public List<Cities> getAll(){
        return citiesRepository.findAll();
    }

    public Cities getCity(String id){
        Integer City_id = Integer.parseInt(id);
        return citiesRepository.findById(City_id).orElse(null);
    }

    public String addCity(Cities city){
        citiesRepository.save(city);
        return "created";

    }

    public void addCities(List<Cities> Cities){
        for(int i=0;i<Cities.size();i++){
            citiesRepository.save(Cities.get(i));}
    }

    public void deleteCity(String id ){
        Integer City_id = Integer.parseInt(id);
        citiesRepository.deleteById(City_id);

    }
}
