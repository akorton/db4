package db4.model.problem_feedback;

import db4.model.problem.Problem;
import db4.model.tech_interview.TechInterview;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "problem_feedback")
@IdClass(ProblemFeedbackId.class)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProblemFeedback {
    @Id
    @ManyToOne
    @JoinColumn(name = "techinterview_id")
    private TechInterview techInterview;
    private String comment;
    @Id
    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem problem;
}
