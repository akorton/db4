package db4.service;

import db4.model.contest.Contest;
import db4.model.contest.ContestDtoResponse;
import db4.model.problem.Problem;
import db4.model.problem.ProblemRepository;
import db4.model.solution.ProblemSolution;
import db4.model.solution.ProblemSolutionId;
import db4.model.solution.ProblemSolutionRepository;
import db4.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class ProblemService {
    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private ProblemSolutionRepository problemSolutionRepository;

    public List<Problem> getAllProblemsInContest(Contest contest, User creator) {
        return problemSolutionRepository.findAllByUserAndContest(creator, contest)
                .stream()
                .map(ProblemSolution::getProblem)
                .toList();
    }

    public void addAllProblemsToContest(Contest contest, List<Integer> problemIds, User creator) {
        problemSolutionRepository.deleteAllByUserAndContest(creator, contest);
        problemIds.forEach(id -> {
            Problem problem = problemRepository.getReferenceById(id);
            problemSolutionRepository.save(ProblemSolution
                    .builder()
                    .contest(contest)
                    .problem(problem)
                    .user(creator)
                    .build());
        });
    }

    public List<ProblemSolution> getAllContestsByUser(User user) {
        return problemSolutionRepository.findAllUniqueByUser(user)
                .stream()
                .toList();
    }

    public void registerUser(User user, Contest contest, User creator) {
        problemSolutionRepository.save(ProblemSolution.builder()
                .user(user)
                .contest(contest)
                .problem(getAllProblemsInContest(contest, creator).get(0))
                .build());
    }

    public void submitProblem(User user, Contest contest, Integer problemId, String answer) {
        Problem problem = problemRepository.getReferenceById(problemId);
        problemSolutionRepository.save(ProblemSolution.builder()
                .problem(problem)
                .user(user)
                .contest(contest)
                .userAnswer(answer)
                .status(problem.getAnswer().equals(answer))
                .build());
    }

    public long getCorrectAnswersNumber(User user, Contest contest) {
        return problemSolutionRepository.findAllByUserAndContest(user, contest)
                .stream()
                .filter(ProblemSolution::isStatus)
                .count();
    }
}
