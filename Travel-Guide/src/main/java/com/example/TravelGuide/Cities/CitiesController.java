package com.example.TravelGuide.Cities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "Cities")
@CrossOrigin("*")
public class CitiesController {
    private final CitiesService citiesService;

    @Autowired
    public CitiesController(CitiesService citiesService) {
        this.citiesService = citiesService;
    }

    @GetMapping
    public List<Cities> getCities(){
        return citiesService.getAll();
    }

    @GetMapping("/{id}")
    public Cities getCity(@PathVariable String id){
        return citiesService.getCity(id);
    }

    @PostMapping
    public String createCity(@RequestBody Cities city){
        return citiesService.addCity(city);
    }

    @DeleteMapping("/{id}")
    public void deleteCity(@PathVariable String id){
        citiesService.deleteCity(id);
    }

    @PostMapping ("/all")
    public List<Cities> addCities(@RequestBody List<Cities> cities){
        citiesService.addCities(cities);
        return getCities();
    }

}
