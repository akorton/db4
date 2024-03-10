package db4.model.role;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(generator = "roles_id_seq")
    @SequenceGenerator(name = "roles_id_seq", allocationSize = 1)
    private int id;
    private String name;
}
