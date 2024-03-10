package db4.model.tech_interview;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TechInterviewInputDto {
    private String login;
    private Timestamp date;
    private String id;
}
