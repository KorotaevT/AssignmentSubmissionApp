package ru.korotaev.AssignmentSubmissionApp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Assignment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer number;
    public String status;
    private String githubUrl;
    private String branch;
    private String codeReviewUrl;
    @ManyToOne(optional = false)
    private User user;
    @ManyToOne
    private User codeReviewer;
}
