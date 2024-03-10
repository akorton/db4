package db4.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.sql.Date;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class RegisterDto {
    private String login;
    private String password;
    private String name;
    private String surname;
    private String lastName;
    private Date birthdate;
    private String role;
    private String email;
    private String phoneNumber;
    private String city;
}
