package ru.korotaev.AssignmentSubmissionApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.korotaev.AssignmentSubmissionApp.dto.CommentDto;
import ru.korotaev.AssignmentSubmissionApp.model.Comment;
import ru.korotaev.AssignmentSubmissionApp.model.User;
import ru.korotaev.AssignmentSubmissionApp.repository.AssignmentRepository;
import ru.korotaev.AssignmentSubmissionApp.repository.CommentRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Comment save(CommentDto commentDto, User user) {
        Comment comment = Comment.builder()
                .text(commentDto.getText())
                .createdBy(user)
                .assignment(assignmentRepository.findById(commentDto.getAssignmentId()).orElse(null))
                .createdDate(LocalDateTime.now())
                .build();
        return commentRepository.save(comment);
    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
        Set<Comment> comments = commentRepository.findByAssignmentId(assignmentId);
        return comments;
    }
}
