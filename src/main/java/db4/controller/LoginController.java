package db4.controller;

import db4.model.RegisterDto;
import db4.model.account.Account;
import db4.model.account.AccountRepository;
import db4.model.role.Role;
import db4.model.role.RoleRepository;
import db4.model.user.User;
import db4.model.user.UserDto;
import db4.model.user.UserRepository;
import db4.security.JwtTokenUtil;
import db4.security.TokenResponse;
import db4.security.UserDetailsImpl;
import db4.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;


@RestController
public class LoginController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping(path = "login")
    TokenResponse login(@RequestBody UserDto dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getLogin(), dto.getPassword())
        );

        UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();

        return getDefaultResponse(user);
    }

    @PostMapping(path = "register")
    TokenResponse register(@RequestBody RegisterDto dto) {
        if (userRepository.existsById(dto.getLogin())) {
            throw new NoSuchElementException();
        }

        Account account = new Account();
        account.setPassword(dto.getPassword());
        account.setCity(dto.getCity());
        account.setEmail(dto.getEmail());
        account.setPhoneNumber(dto.getPhoneNumber());
        Account savedAccount = accountRepository.save(account);

        Role role = roleRepository.getReferenceByName(dto.getRole());

        User user = new User();
        user.setLogin(dto.getLogin());
        user.setRole(role);
        user.setAccount(savedAccount);
        user.setName(dto.getName());
        user.setBirthdate(dto.getBirthdate());
        user.setSurname(dto.getSurname());
        user.setLastName(dto.getLastName());
        userRepository.save(user);

        return getDefaultResponse(userService.getUserDetails(user));
    }

    private TokenResponse getDefaultResponse(UserDetails user) {
        return TokenResponse.builder()
                .token(jwtTokenUtil.generateToken(user))
                .build();
    }
}
