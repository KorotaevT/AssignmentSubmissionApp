package ru.korotaev.AssignmentSubmissionApp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.korotaev.AssignmentSubmissionApp.service.AuthenticationService;
import ru.korotaev.AssignmentSubmissionApp.util.AuthenticationRequest;
import ru.korotaev.AssignmentSubmissionApp.util.AuthenticationResponse;
import ru.korotaev.AssignmentSubmissionApp.util.RegisterRequest;

@RestController
@RequestMapping("/demo")
@RequiredArgsConstructor
public class DemoController {

    @GetMapping("/hello")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello");
    }
}
