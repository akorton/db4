package db4.model.tech_interview;

import db4.model.account.Account;
import db4.model.problem_feedback.ProblemFeedback;
import db4.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "techinterview")
public class TechInterview {
    @Id
    @GeneratedValue(generator = "techinterview_techinterview_id_seq")
    @SequenceGenerator(name = "techinterview_techinterview_id_seq", allocationSize = 1)
    @Column(name = "techinterview_id")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "login")
    private User user;
    private Timestamp date;
    private Boolean status;
    @ManyToOne
    @JoinColumn(name = "interviwer_id")
    private User interviewer;
}
