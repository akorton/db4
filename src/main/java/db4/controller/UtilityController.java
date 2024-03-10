package db4.controller;

import db4.service.TechInterviewService;
import db4.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UtilityController {
    @Autowired
    private UserService userService;
    @Autowired
    private TechInterviewService techInterviewService;

    @GetMapping("role")
    @RolesAllowed({"HR", "USER", "COMPANY", "DEVELOPER"})
    String getRole() {
        return userService.getUserFromSecurityContext().getRole().getName();
    }

    @PostMapping("tech-interview/{id}/status")
    @RolesAllowed({"HR", "DEVELOPER"})
    void changeStatus(@RequestBody Boolean status, @PathVariable(name="id") Long id) {
        techInterviewService.changeStatus(id, status);
    }
}
