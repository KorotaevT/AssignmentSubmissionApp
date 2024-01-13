package ru.korotaev.AssignmentSubmissionApp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.korotaev.AssignmentSubmissionApp.domain.Authority;
import ru.korotaev.AssignmentSubmissionApp.enums.Role;
import ru.korotaev.AssignmentSubmissionApp.domain.User;
import ru.korotaev.AssignmentSubmissionApp.repository.UserRepository;
import ru.korotaev.AssignmentSubmissionApp.util.AuthenticationRequest;
import ru.korotaev.AssignmentSubmissionApp.util.AuthenticationResponse;
import ru.korotaev.AssignmentSubmissionApp.util.RegisterRequest;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        Authority authority = new Authority(Role.STUDENT);
        var user = User.builder()
                .cohortStartDate(LocalDate.now())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .authorities(List.of(authority))
                .build();
        authority.setUser(user);
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));
        var user =  repository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }
}
