package ru.korotaev.AssignmentSubmissionApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.korotaev.AssignmentSubmissionApp.domain.Assignment;
import ru.korotaev.AssignmentSubmissionApp.domain.User;
import ru.korotaev.AssignmentSubmissionApp.repository.AssignmentRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;
    public Assignment save(User user){
        Assignment assignment = new Assignment();
        assignment.setStatus("Needs to be Submitted");
        assignment.setUser(user);

        return assignmentRepository.save(assignment);
    }

    public List<Assignment> findByUser(User user){
        return assignmentRepository.findByUser(user);
    }

    public Optional<Assignment> findById(Long assignmentId){
        return assignmentRepository.findById(assignmentId);
    }

    public Assignment save(Assignment assignment){
        return assignmentRepository.save(assignment);
    }
}
