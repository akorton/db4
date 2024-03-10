package db4.model.contest;

import db4.model.account.Account;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@Table(name = "contest")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contest {
    @Id
    @GeneratedValue(generator = "contest_contest_id_seq")
    @SequenceGenerator(name = "contest_contest_id_seq", allocationSize = 1)
    @Column(name = "contest_id")
    private Integer contestId;
    private String name;
    @Column(name = "start_date")
    private Date startDate;
    @Column(name = "end_date")
    private Date endDate;
    @ManyToOne
    @JoinColumn(name = "creator")
    private Account creator;
}
