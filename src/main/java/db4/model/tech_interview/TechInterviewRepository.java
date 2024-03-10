package db4.model.tech_interview;

import db4.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TechInterviewRepository extends JpaRepository<TechInterview, Long> {
    List<TechInterview> findAllByUser(User user);
    List<TechInterview> findAllByInterviewer(User interviewer);
}
