package db4.model.solution;

import db4.model.contest.Contest;
import db4.model.problem.Problem;
import db4.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "problem_solution")
@IdClass(ProblemSolutionId.class)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProblemSolution {
    @ManyToOne
    @Id
    @JoinColumn(name = "login")
    private User user;
    @ManyToOne
    @JoinColumn(name = "contest_id")
    @Id
    private Contest contest;
    @ManyToOne
    @JoinColumn(name = "problem_id")
    @Id
    private Problem problem;
    @Column(name = "user_answer")
    private String userAnswer;
    private boolean status;
}
