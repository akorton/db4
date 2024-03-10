package db4.service;

import db4.model.contest.Contest;
import db4.model.contest.ContestDtoResponse;
import db4.model.contest.ContestRepository;
import db4.model.problem.Problem;
import db4.model.solution.ProblemSolution;
import db4.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class ContestService {
    @Autowired
    private UserService userService;
    @Autowired
    private ContestRepository contestRepository;
    @Autowired
    private ProblemService problemService;

    public List<Contest> getAllContestByOrganizer(User user) {
        return contestRepository.findAllByCreator(user.getAccount());
    }

    public List<Contest> getAllContestsByUser(User user) {
        return problemService.getAllContestsByUser(user)
                .stream()
                .map(ProblemSolution::getContest)
                .toList();
    }

    public Contest getContestById(int id) {
        return contestRepository.getReferenceById(id);
    }

    public ContestDtoResponse toDto(Contest contest) {
        return ContestDtoResponse.builder()
                .contestId(contest.getContestId())
                .name(contest.getName())
                .endDate(contest.getEndDate())
                .startDate(contest.getStartDate())
                .problemIds(problemService.getAllProblemsInContest(contest,
                        userService.getUserByAccount(contest.getCreator()))
                        .stream()
                        .map((Problem::getProblemId))
                        .toList())
                .build();
    }

    @Transactional
    public void addContest(ContestDtoResponse contestDto, User creator) {
        Contest contest = contestRepository.save(Contest.builder()
                        .contestId(contestDto.getContestId())
                        .startDate(contestDto.getStartDate())
                        .endDate(contestDto.getEndDate())
                        .name(contestDto.getName())
                        .creator(creator.getAccount())
                        .build());
        problemService.addAllProblemsToContest(contest, contestDto.getProblemIds(), creator);
    }

    public void registerUser(User user, Integer contestId) {
        if (problemService.getAllContestsByUser(user)
                .stream()
                .anyMatch(c -> Objects.equals(c.getContest().getContestId(), contestId))) return;
        Contest contest = contestRepository.getReferenceById(contestId);
        User creator = userService.getUserByAccount(contest.getCreator());
        problemService.registerUser(user, contest, creator);
    }

    public List<Problem> getAllProblemsInContestByContestId(Integer contestId) {
        Contest contest = contestRepository.getReferenceById(contestId);
        User creator = userService.getUserByAccount(contest.getCreator());
        return problemService.getAllProblemsInContest(contest, creator);
    }

    public void submitProblem(Integer problemId, Integer contestId, User user, String answer) {
        Contest contest = contestRepository.getReferenceById(contestId);
        problemService.submitProblem(user, contest, problemId, answer);
    }

    public long getCorrectAnswersNumber(Integer contestId, User user) {
        Contest contest = contestRepository.getReferenceById(contestId);
        return problemService.getCorrectAnswersNumber(user, contest);
    }
}
