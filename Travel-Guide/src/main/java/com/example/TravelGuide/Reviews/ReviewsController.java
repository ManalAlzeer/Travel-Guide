package com.example.TravelGuide.Reviews;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "Reviews")
@CrossOrigin("*")
public class ReviewsController {
    private final ReviewsService reviewsService;

    @Autowired
    public ReviewsController(ReviewsService reviewsService) {
        this.reviewsService = reviewsService;
    }

    @GetMapping
    public List<Reviews> getReviews(){
        return reviewsService.getAll();
    }

    @GetMapping("/{id}")
    public Reviews getReview(@PathVariable String id){
        return reviewsService.getReview(id);
    }

    @PostMapping
    public String createReview(@RequestBody Reviews review){
        return reviewsService.addReview(review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable String id){
        reviewsService.deleteReview(id);
    }

    @PostMapping ("/all")
    public List<Reviews> addTrips(@RequestBody List<Reviews> Reviews){
        reviewsService.addReviews(Reviews);
        return getReviews();
    }
}
