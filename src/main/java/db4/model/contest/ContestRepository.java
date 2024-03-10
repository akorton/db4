package db4.model.contest;

import db4.model.account.Account;
import db4.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Integer> {
    List<Contest> findAllByCreator(Account creator);
}
