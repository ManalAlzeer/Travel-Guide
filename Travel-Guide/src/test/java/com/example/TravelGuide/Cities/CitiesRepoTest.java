package com.example.TravelGuide.Cities;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class CitiesRepoTest {
    private final CitiesRepository citiesRepository;

    @Autowired
    public CitiesRepoTest(CitiesRepository citiesRepository) {
        this.citiesRepository = citiesRepository;
    }


    @Test
    void itShouldFindCity() {
        Cities city = new Cities("Riyadh", "Saudi Arabia");
        Cities savedCity = citiesRepository.save(city);
        Cities result = citiesRepository.findById(savedCity.getId()).orElse(null);
        assertNotNull(result);
    }

    @Test
    void itShouldSaveCity() {
        Cities city = new Cities("Riyadh", "Saudi Arabia");
        Cities savedCity = citiesRepository.save(city);
        assertTrue(Long.valueOf(savedCity.getId()) != null);
    }


}
