package ru.korotaev.AssignmentSubmissionApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.korotaev.AssignmentSubmissionApp.enums.Role;
import ru.korotaev.AssignmentSubmissionApp.model.Assignment;
import ru.korotaev.AssignmentSubmissionApp.model.User;
import ru.korotaev.AssignmentSubmissionApp.dto.AssignmentResponseDto;
import ru.korotaev.AssignmentSubmissionApp.service.AssignmentService;
import ru.korotaev.AssignmentSubmissionApp.service.UserService;
import ru.korotaev.AssignmentSubmissionApp.util.AuthorityUtil;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "http://localhost:3000")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.save(user);

        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        Set<Assignment> assignmentByUser = assignmentService.findByUser(user);

        return ResponseEntity.ok(assignmentByUser);
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user) {
        Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
        AssignmentResponseDto assignmentResponseDto = new AssignmentResponseDto(assignmentOpt.orElse(new Assignment()));
        return ResponseEntity.ok(assignmentResponseDto);
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId, @RequestBody Assignment assignment, @AuthenticationPrincipal User user) {
        if(assignment.getCodeReviewer() != null){
            User codeReviewer = assignment.getCodeReviewer();
            codeReviewer = userService.findUserByUsername(codeReviewer.getUsername()).orElse(new User());
            if(AuthorityUtil.ihasRole(Role.REVIEWER.name(), codeReviewer)){
                assignment.setCodeReviewer(codeReviewer);
            };
        }
        Assignment updateAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updateAssignment);
    }
}
