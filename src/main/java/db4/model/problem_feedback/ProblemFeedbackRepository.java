package db4.model.problem_feedback;

import db4.model.tech_interview.TechInterview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemFeedbackRepository extends JpaRepository<ProblemFeedback, ProblemFeedbackId> {
    List<ProblemFeedback> findAllByTechInterview(TechInterview techInterview);
}
