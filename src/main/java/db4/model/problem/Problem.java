package db4.model.problem;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@Table(name = "problems")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Problem {
    @Id
    @GeneratedValue(generator = "problems_problem_id_seq")
    @SequenceGenerator(name = "problems_problem_id_seq", allocationSize = 1)
    @Column(name = "problem_id")
    private int problemId;
    @Column(name = "problem_text")
    private String problemText;
    private String answer;
}
