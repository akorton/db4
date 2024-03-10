package db4.model.problem_feedback;

import db4.model.problem.Problem;
import db4.model.tech_interview.TechInterview;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@IdClass(ProblemFeedbackId.class)
@NoArgsConstructor
@Builder
public class ProblemFeedbackId implements Serializable {
    private Problem problem;
    private TechInterview techInterview;
}
