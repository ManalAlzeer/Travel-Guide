package com.example.TravelGuide.Countries;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountriesService {


    private final CountriesRepository countriesRepository;

    @Autowired
    public CountriesService(CountriesRepository countriesRepository) {
        this.countriesRepository = countriesRepository;
    }

    public List<Countries> getAll(){
        return countriesRepository.findAll();
    }

    public Countries getCountry(String id){
        Integer Country_id = Integer.parseInt(id);
        return countriesRepository.findById(Country_id).orElse(null);
    }

    public Countries addCountry(Countries country){
        return countriesRepository.save(country);

    }

    public void addCountries(List<Countries> countries){
        for(int i=0;i<countries.size();i++){
            countriesRepository.save(countries.get(i));}
    }

    public void deleteCountry(String id ){
        Integer Country_id = Integer.parseInt(id);
        countriesRepository.deleteById(Country_id);

    }

}
