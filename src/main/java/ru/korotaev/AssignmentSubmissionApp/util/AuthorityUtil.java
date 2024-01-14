package ru.korotaev.AssignmentSubmissionApp.util;

import ru.korotaev.AssignmentSubmissionApp.model.User;

public class AuthorityUtil {

    public static Boolean ihasRole(String role, User user){
        return user.getAuthorities()
                .stream().anyMatch(auth -> auth.getAuthority().equals(role));
    }
}
