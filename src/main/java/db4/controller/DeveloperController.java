package db4.controller;

import db4.model.problem.Problem;
import db4.model.problem.ProblemRepository;
import db4.model.tech_interview.TechInterviewDto;
import db4.service.ProblemService;
import db4.service.TechInterviewService;
import db4.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("developer")
@RolesAllowed("DEVELOPER")
public class DeveloperController {
    @Autowired
    private TechInterviewService techInterviewService;
    @Autowired
    private UserService userService;
    @Autowired
    private ProblemRepository problemRepository;

    @GetMapping("tech-interview")
    List<TechInterviewDto> getTechInterviews() {
        return techInterviewService.getTechInterviewByInterviewer(userService.getUserFromSecurityContext())
                .stream()
                .map(i->techInterviewService.toDto(i))
                .toList();
    }

    @PostMapping("tech-interview/{id}/add")
    void addProblemToTechInterview(@PathVariable(name="id") Long id, @RequestBody Integer problemId) {
        techInterviewService.addProblem(id, problemId);
    }

    @GetMapping("problem/{id}/statement")
    String getProblemStatement(@PathVariable(name="id") Integer id) {
        return problemRepository.getReferenceById(id).getProblemText();
    }

    @GetMapping("tech-interview/{id}/problem/{problem_id}/comment")
    String getComment(@PathVariable(name = "id") Long id, @PathVariable(name = "problem_id") Integer problemId) {
        return techInterviewService.getComment(id, problemId);
    }

    @PostMapping("tech-interview/{id}/problem/{problem_id}/comment")
    void updateComment(@PathVariable(name = "id") Long id, @PathVariable(name = "problem_id") Integer problemId,
                    @RequestBody String comment) {
        techInterviewService.updateComment(id, problemId, comment);
    }
}
