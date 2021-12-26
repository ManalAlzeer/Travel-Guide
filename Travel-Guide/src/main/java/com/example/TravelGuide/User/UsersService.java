package com.example.TravelGuide.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UsersService implements UserDetailsService{
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user= usersRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("User not exist");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(user.getRole()));


        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),authorities);
    }

    public List<Users> getUsers(){
        return usersRepository.findAll();
    }

    public Users getUser(String id){
        Integer user_id = Integer.parseInt(id);
        return usersRepository.findById(user_id).orElse(null);
    }

    public Users createUser(Users user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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

    public Users addImage(String id, Users user) {
        int Id = Integer.parseInt(id);
        Users newUser = usersRepository.findById(Id).orElse(null);
        if(newUser != null){
            newUser.setImage(user.getImage());
            usersRepository.save(newUser);
        }
        return newUser;
    }

    public void updateUser(String id){
        int Id = Integer.parseInt(id);
        Users user = usersRepository.findById(Id).orElse(null);
        usersRepository.save(user);
    }

}
