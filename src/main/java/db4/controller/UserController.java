package db4.controller;

import db4.model.contest.ContestDtoResponse;
import db4.model.problem.Problem;
import db4.model.problem.ProblemRepository;
import db4.model.tech_interview.TechInterviewDto;
import db4.model.user.User;
import db4.service.ContestService;
import db4.service.TechInterviewService;
import db4.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "user")
@RolesAllowed("USER")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private ContestService contestService;
    @Autowired
    private TechInterviewService techInterviewService;

    @GetMapping("contest")
    List<ContestDtoResponse> userContests() {
        User user = userService.getUserFromSecurityContext();
        return contestService.getAllContestsByUser(user)
                .stream()
                .map(contestService::toDto)
                .distinct()
                .toList();
    }

    @GetMapping("contest/add")
    void addContest(@RequestParam("id") Integer id) {
        User user = userService.getUserFromSecurityContext();
        contestService.registerUser(user, id);
    }

    @GetMapping("contest/{id}/tasks")
    List<Problem> getContestProblems(@PathVariable(name = "id") Integer id) {
        return contestService.getAllProblemsInContestByContestId(id);
    }

    @PostMapping("contest/{contest_id}/tasks/{task_id}/submit")
    void submitAnswer(@PathVariable(name = "contest_id") Integer contestId,
                      @PathVariable(name = "task_id") Integer taskId,
                      @RequestBody String answer) {
        User user = userService.getUserFromSecurityContext();
        contestService.submitProblem(taskId, contestId, user, answer);
    }

    @GetMapping("contest/{contest_id}/results")
    long getCorrectAnswersNumber(@PathVariable(name = "contest_id") Integer contestId) {
        User user = userService.getUserFromSecurityContext();
        return contestService.getCorrectAnswersNumber(contestId, user);
    }

    @GetMapping("tech-interview")
    List<TechInterviewDto> getTechInterviews() {
        return techInterviewService.getTechInterviewsByUser(userService.getUserFromSecurityContext())
                .stream()
                .map(i->techInterviewService.toDto(i))
                .toList();
    }
}
