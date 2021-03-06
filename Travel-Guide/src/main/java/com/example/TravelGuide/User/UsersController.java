package com.example.TravelGuide.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path= "Users")
@CrossOrigin("*")
public class UsersController {

    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public List<Users> getUsers(){
        return usersService.getUsers();
    }

    @GetMapping("/{id}")
    public Users getUser(@PathVariable String id){
        return usersService.getUser(id);
    }

    @PostMapping
    public Users createUser(@RequestBody Users user){
        return usersService.createUser(user);
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id){
        usersService.deleteUser(id);
    }
    @PostMapping ("/all")
    public List<Users> addUsers(@RequestBody List<Users> users){
        usersService.addUsers(users);
        return getUsers();
    }
    @PutMapping("/{id}")
    public void updateUser(@PathVariable String id){
        usersService.updateUser(id);
    }



    @PutMapping("/image/{id}")
    public Users addImage(@PathVariable String id , @RequestBody Users user){
        usersService.addImage(id,user);
        return getUser(id);
    }


}
