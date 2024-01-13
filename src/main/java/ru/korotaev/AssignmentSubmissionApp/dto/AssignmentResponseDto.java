package ru.korotaev.AssignmentSubmissionApp.dto;

import lombok.Data;
import ru.korotaev.AssignmentSubmissionApp.domain.Assignment;
import ru.korotaev.AssignmentSubmissionApp.enums.AssignmentEnum;
import ru.korotaev.AssignmentSubmissionApp.enums.AssignmentStatusEnum;

@Data
public class AssignmentResponseDto {

    private Assignment assignment;
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    private AssignmentStatusEnum[] assignmentStatusEnum = AssignmentStatusEnum.values();

    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
    }
}
