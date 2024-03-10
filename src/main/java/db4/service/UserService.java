package db4.service;

import db4.model.account.Account;
import db4.model.role.Role;
import db4.model.user.User;
import db4.model.user.UserRepository;
import db4.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserDetails getUserDetails(String username) {
        return getUserDetails(userRepository.findById(username).orElseThrow());
    }

    public UserDetails getUserDetails(User user) {
         return new UserDetailsImpl(user.getLogin(),
                user.getAccount().getPassword(), user.getRole());
    }

    public UserDetailsService getUserDetailsService() {
        return this::getUserDetails;
    }

    public User getUserFromSecurityContext() {
        UserDetails userDet = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.getReferenceById(userDet.getUsername());
    }

    public User getUserByAccount(Account account) {
        return userRepository.findByAccount(account);
    }
}
