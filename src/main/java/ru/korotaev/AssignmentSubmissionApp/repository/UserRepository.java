package ru.korotaev.AssignmentSubmissionApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.korotaev.AssignmentSubmissionApp.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);
}
