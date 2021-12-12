package com.example.TravelGuide.Tags;

import com.example.TravelGuide.Cities.Cities;
import com.example.TravelGuide.Cities.CitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "Tags")
@CrossOrigin("*")
public class TagsController {
    private final TagsService tagsService;

    @Autowired
    public TagsController(TagsService tagsService) {
        this.tagsService = tagsService;
    }

    @GetMapping
    public List<Tags> getTags(){
        return tagsService.getAll();
    }

    @GetMapping("/{id}")
    public Tags getTag(@PathVariable String id){
        return tagsService.getTag(id);
    }

    @PostMapping
    public Tags createTag(@RequestBody Tags tag){
        return tagsService.addTag(tag);
    }

    @DeleteMapping("/{id}")
    public void deleteTag(@PathVariable String id){
        this.deleteTag(id);
    }

    @PostMapping ("/all")
    public List<Tags> addTags(@RequestBody List<Tags> tags){
        tagsService.addTags(tags);
        return getTags();
    }

}
