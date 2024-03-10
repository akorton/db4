package db4.controller;

import db4.model.tech_interview.TechInterview;
import db4.model.tech_interview.TechInterviewDto;
import db4.model.tech_interview.TechInterviewInputDto;
import db4.service.TechInterviewService;
import db4.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RolesAllowed("HR")
@RequestMapping(path = "hr")
public class HrController {

    @Autowired
    private UserService userService;
    @Autowired
    private TechInterviewService techInterviewService;

    @GetMapping("tech-interview")
    List<TechInterviewDto> getTechInterviews(@RequestParam(name = "limit", defaultValue = "10") Integer limit) {
        return techInterviewService.getTechInterviews(limit)
                .stream()
                .map(i->techInterviewService.toDto(i))
                .toList();
    }

    @PostMapping("tech-interview/add")
    void addTechInterview(@RequestBody TechInterviewInputDto dto) {
        techInterviewService.addFromDto(dto);
    }
}
