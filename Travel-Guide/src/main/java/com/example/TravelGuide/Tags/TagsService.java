package com.example.TravelGuide.Tags;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagsService {

    private final TagsRepository tagsRepository;

    @Autowired
    public TagsService(TagsRepository tagsRepository){
        this.tagsRepository=tagsRepository;
    }

    public List<Tags> getAll(){
        return tagsRepository.findAll();
    }

    public Tags getTag(String id){
        Integer Tag_id = Integer.parseInt(id);
        return tagsRepository.findById(Tag_id).orElse(null);
    }

    public Tags addTag(Tags tag){
        return tagsRepository.save(tag);

    }

    public void addTags(List<Tags> Tags){
        for(int i=0;i<Tags.size();i++){
            tagsRepository.save(Tags.get(i));}
    }

    public void deleteTag(String id ){
        Integer Tag_id = Integer.parseInt(id);
        tagsRepository.deleteById(Tag_id);

    }

}
