package com.example.TravelGuide.Countries;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "Countries")
@CrossOrigin("*")
public class CountriesController {

    private final CountriesService countriesService;

    @Autowired
    public CountriesController(CountriesService countriesService) {
        this.countriesService = countriesService;
    }

    @GetMapping
    public List<Countries> getCountries(){
        return countriesService.getAll();
    }

    @GetMapping("/{id}")
    public Countries getCountry(@PathVariable String id){
        return countriesService.getCountry(id);
    }

    @PostMapping
    public Countries createCountry(@RequestBody Countries country){
        return countriesService.addCountry(country);
    }

    @DeleteMapping("/{id}")
    public void deleteCountry(@PathVariable String id){
        countriesService.deleteCountry(id);
    }
    @PostMapping ("/all")
    public List<Countries> addCountries(@RequestBody List<Countries> countries){
        countriesService.addCountries(countries);
        return getCountries();
    }
}
