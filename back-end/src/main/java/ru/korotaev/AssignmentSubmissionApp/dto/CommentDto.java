package ru.korotaev.AssignmentSubmissionApp.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentDto {
    private Long id;
    private Long assignmentId;
    private String text;
    private String user;
    private LocalDateTime createdDate;
}
