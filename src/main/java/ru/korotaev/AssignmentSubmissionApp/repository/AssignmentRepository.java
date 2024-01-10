package ru.korotaev.AssignmentSubmissionApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.korotaev.AssignmentSubmissionApp.domain.Assignment;
import ru.korotaev.AssignmentSubmissionApp.domain.User;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByUser(User user);
}
