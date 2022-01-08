package com.example.TravelGuide.Security;

import com.example.TravelGuide.User.UsersRepository;
import com.example.TravelGuide.filter.CustomAuthenticationFilter;
import com.example.TravelGuide.filter.CustomAuthorizationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UsersRepository usersRepository;

    public SecurityConfig(UserDetailsService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder, UsersRepository usersRepository) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.usersRepository = usersRepository;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean(),usersRepository);
        customAuthenticationFilter.setFilterProcessesUrl("/login");
        http.cors().configurationSource(request -> {
            var cors = new CorsConfiguration();
            cors.setAllowedOrigins(List.of("*"));
            cors.setAllowedMethods(List.of("GET","POST", "PUT", "DELETE", "OPTIONS"));
            cors.setAllowedHeaders(List.of("*"));
            return cors;});
        http.cors().and().csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // Define the authorization patterns below
//        http.authorizeRequests().anyRequest().permitAll();
        http.authorizeRequests().antMatchers( HttpMethod.GET,"/Countries/**").permitAll();
        http.authorizeRequests().antMatchers( HttpMethod.GET,"/Cities/**").permitAll();
        http.authorizeRequests().antMatchers( HttpMethod.GET,"/Users/**").permitAll();
        http.authorizeRequests().antMatchers( HttpMethod.GET,"/Trips/**").permitAll();
        http.authorizeRequests().antMatchers( HttpMethod.GET,"/Tags/**").permitAll();
        http.authorizeRequests().antMatchers( HttpMethod.GET,"/Reviews/**").permitAll();
        http.authorizeRequests().antMatchers( HttpMethod.GET,"/Places/**").permitAll();
        http.authorizeRequests().antMatchers( HttpMethod.POST,"/login/**").permitAll();
//      http.authorizeRequests().antMatchers( HttpMethod.GET,"/login/**").permitAll();

//      Upload image "Update User"
        http.authorizeRequests().antMatchers( HttpMethod.PUT,"/Users/**").hasAnyAuthority("Admin","Traveler");
//      Delete User
        http.authorizeRequests().antMatchers( HttpMethod.DELETE,"/Users/**").hasAnyAuthority("Admin","Traveler");

//      Add Reviews
        http.authorizeRequests().antMatchers( HttpMethod.POST,"/Places/addReview").hasAnyAuthority("Admin","Traveler");
//      Admin delete reviews
        http.authorizeRequests().antMatchers( HttpMethod.DELETE,"/Reviews").hasAnyAuthority("Admin");


//        add, delete and update trips "New"

        http.authorizeRequests().antMatchers( HttpMethod.POST,"/Trips/{TripId}/users/{UserId}").hasAnyAuthority("Admin","Traveler");//////////
        http.authorizeRequests().antMatchers( HttpMethod.POST,"/Trips/**").hasAnyAuthority("Admin","Traveler");
        http.authorizeRequests().antMatchers( HttpMethod.DELETE,"/Trips/**").hasAnyAuthority("Admin","Traveler");
        http.authorizeRequests().antMatchers( HttpMethod.PUT,"/Trips/**").hasAnyAuthority("Admin","Traveler");


//       Admin add, delete and update Places "New"
        http.authorizeRequests().antMatchers( HttpMethod.POST,"/Places/**").hasAnyAuthority("Admin");
        http.authorizeRequests().antMatchers( HttpMethod.DELETE,"/Places/**").hasAnyAuthority("Admin");
        http.authorizeRequests().antMatchers( HttpMethod.PUT,"/Places/**").hasAnyAuthority("Admin");


//        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
    @Bean
    @Override

    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

}
