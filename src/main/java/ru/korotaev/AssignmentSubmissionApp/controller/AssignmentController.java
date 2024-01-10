package ru.korotaev.AssignmentSubmissionApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.korotaev.AssignmentSubmissionApp.domain.Assignment;
import ru.korotaev.AssignmentSubmissionApp.domain.User;
import ru.korotaev.AssignmentSubmissionApp.service.AssignmentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "http://localhost:3000")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user){
        Assignment newAssignment = assignmentService.save(user);

        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user){
        List<Assignment> assignmentByUser = assignmentService.findByUser(user);

        return ResponseEntity.ok(assignmentByUser);
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user){
        Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);

        return ResponseEntity.ok(assignmentOpt.orElse(new Assignment()));
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId, @RequestBody Assignment assignment, @AuthenticationPrincipal User user){
        Assignment updateAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updateAssignment);
    }
}
