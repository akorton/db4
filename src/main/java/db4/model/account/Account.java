package db4.model.account;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(generator = "accounts_account_id_seq")
    @SequenceGenerator(name = "accounts_account_id_seq", allocationSize = 1)
    @Column(name = "account_id")
    private int accountId;
    private String password;
    private String email;
    @Column(name = "phone_number")
    private String phoneNumber;
    private String city;
}
