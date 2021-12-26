package com.example.TravelGuide.Places;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlacesRepository extends JpaRepository<Places, Integer> {
    @Query(value = "select * from places p join places_tag pt on pt.places_id = p.id join tags t on pt.tag_id = t.id where p.city_id = ?1 and t.name = ?2", nativeQuery = true)
    List<Places> findPlacesByTag(int id ,String tag_name);
}
