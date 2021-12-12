package com.example.TravelGuide.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<Users> getAll(){
        return usersRepository.findAll();
    }

    public Users getUser(String id){
        Integer user_id = Integer.parseInt(id);
        return usersRepository.findById(user_id).orElse(null);
    }

    public Users addUser(Users user){
        return usersRepository.save(user);

    }

    public void addUsers(List<Users> users){
        for(int i=0;i<users.size();i++){
            usersRepository.save(users.get(i));}
    }

    public void deleteUser(String id ){
        Integer user_id = Integer.parseInt(id);
        usersRepository.deleteById(user_id);

    }

}
