package ru.korotaev.AssignmentSubmissionApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.korotaev.AssignmentSubmissionApp.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    @Query("SELECT u from User u join Authority a on u.id=a.user.id where a.role='student'")
    List<User> findStudents();
}
