package db4.model.solution;

import db4.model.contest.Contest;
import db4.model.problem.Problem;
import db4.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProblemSolutionId implements Serializable {
    private User user;
    private Contest contest;
    private Problem problem;
}
