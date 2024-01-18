package ru.korotaev.AssignmentSubmissionApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.korotaev.AssignmentSubmissionApp.model.User;
import ru.korotaev.AssignmentSubmissionApp.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
}
