package db4.controller;

import db4.model.contest.ContestDtoResponse;
import db4.model.problem.ProblemRepository;
import db4.model.user.User;
import db4.service.ContestService;
import db4.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(path = "company")
@RolesAllowed("COMPANY")
public class CompanyController {
    @Autowired
    private UserService userService;
    @Autowired
    private ContestService contestService;
    @Autowired
    private ProblemRepository problemRepository;

    @GetMapping(path = "contest")
    List<ContestDtoResponse> allContests() {
        User user = userService.getUserFromSecurityContext();
        return contestService.getAllContestByOrganizer(user)
                .stream().map(contestService::toDto)
                .toList();
    }

    @GetMapping(path = "contest/{id}")
    ContestDtoResponse getContest(@PathVariable(name = "id") int id) {
        User user = userService.getUserFromSecurityContext();
        return contestService.toDto(contestService.getContestById(id));
    }

    @GetMapping(path = "problem/check")
    Boolean checkProblemExists(@RequestParam(name = "id") int id) {
        if (!problemRepository.existsById(id)) {
            throw new NoSuchElementException();
        }
        return Boolean.TRUE;
    }

    @PostMapping(path = "contest/add")
    Boolean addContest(@RequestBody ContestDtoResponse dto) {
        User user = userService.getUserFromSecurityContext();
        contestService.addContest(dto, user);
        return Boolean.TRUE;
    }
}
