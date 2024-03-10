package db4.model.tech_interview;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TechInterviewDto {
    private Integer id;
    private String login;
    private String date;
    private String interviewer;
    private List<Integer> tasks;
    private Boolean result;
}
