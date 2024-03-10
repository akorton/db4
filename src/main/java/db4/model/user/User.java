package db4.model.user;

import db4.model.account.Account;
import db4.model.role.Role;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    private String login;
    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;
    private String name;
    private String surname;
    @Column(name = "last_name")
    private String lastName;
    private Date birthdate;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
