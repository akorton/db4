package db4.model.solution;

import db4.model.contest.Contest;
import db4.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ProblemSolutionRepository extends JpaRepository<ProblemSolution, ProblemSolutionId> {

    List<ProblemSolution> findAllByUserAndContest(User user, Contest contest);
    void deleteAllByUserAndContest(User user, Contest contest);

    Set<ProblemSolution> findAllUniqueByUser(User user);
}
