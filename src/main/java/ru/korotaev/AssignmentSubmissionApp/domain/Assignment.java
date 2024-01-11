package ru.korotaev.AssignmentSubmissionApp.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Assignment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    public String status;
    private String githubUrl;
    private String branch;
    private String codeReviewUrl;

    @ManyToOne(optional = false)
    private User user;
}
