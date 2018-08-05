package rs.ftn.osa.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.ftn.osa.entity.User;
import rs.ftn.osa.entity.UserTokenState;
import rs.ftn.osa.security.JwtAuthenticationRequest;
import rs.ftn.osa.security.TokenHelper;
import rs.ftn.osa.service.CustomUserDetailsService;

@RestController
@RequestMapping(value = "/auth")
public class AuthentactionController {
	
	@Autowired
	TokenHelper tokenHelper;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private CustomUserDetailsService userDetailsService;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
            HttpServletResponse response) throws AuthenticationException, IOException {
		System.out.println("ovo je nesto: "+authenticationRequest);
		final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
		
		// Ubaci username + password u kontext
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        System.out.println("pokusao da se uloguje: "+authentication);
        
        // Kreiraj token
        User user = (User)authentication.getPrincipal();
        String jws = tokenHelper.generateToken( user.getUsername());

        // Vrati token kao odgovor na uspesno autentifikaciju
        return ResponseEntity.ok(new UserTokenState(jws));
		
	}

}
