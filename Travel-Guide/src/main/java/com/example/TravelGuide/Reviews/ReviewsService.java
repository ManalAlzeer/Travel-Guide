package com.example.TravelGuide.Reviews;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewsService {

    private final ReviewsRepository reviewsRepository;

    @Autowired
    public ReviewsService(ReviewsRepository reviewsRepository){
        this.reviewsRepository=reviewsRepository;
    }

    public List<Reviews> getAll(){
        return reviewsRepository.findAll();
    }

    public Reviews getReview(String id){
        Integer Review_id = Integer.parseInt(id);
        return reviewsRepository.findById(Review_id).orElse(null);
    }

    public String addReview(Reviews Review){
        reviewsRepository.save(Review);
        return "created";

    }

    public void addReviews(List<Reviews> Reviews){
        for(int i=0;i<Reviews.size();i++){
            reviewsRepository.save(Reviews.get(i));}
    }

    public void deleteReview(String id ){
        Integer Review_id = Integer.parseInt(id);
        reviewsRepository.deleteById(Review_id);

    }
}
