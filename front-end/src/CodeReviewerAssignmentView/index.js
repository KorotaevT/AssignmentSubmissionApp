import React, { useEffect, useRef, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import StatusBadge from "../StatusBadge";
import { useNavigate } from "react-router-dom";

const CodeReviewerAssignmentView = () => {
    const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  const prevAssignmentValue = useRef(assignment);

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  function save(status) {
    if (status && assignment.status !== status) {
      updateAssignment("status", status);
    } else {
      persist();
    }
  }

  function persist() {
    ajax(
      `http://localhost:8080/api/assignments/${assignmentId}`,
      "PUT",
      jwt,
      assignment
    ).then((assignmentData) => {
      setAssignment(assignmentData);
    });
  }

  useEffect(() => {
    if (prevAssignmentValue.current.status !== assignment.status) {
      persist();
    }
    prevAssignmentValue.current = assignment;
  }, [assignment]);

  useEffect(() => {
    ajax(
      `http://localhost:8080/api/assignments/${assignmentId}`,
      "GET",
      jwt
    ).then((assignmentResponse) => {
      let assignmentData = assignmentResponse.assignment;
      if (assignmentData.branch === null) assignmentData.branch = "";
      if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
      setAssignment(assignmentData);
      setAssignmentEnums(assignmentResponse.assignmentEnums);
      setAssignmentStatuses(assignmentResponse.assignmentStatusEnum);
    });
  }, []);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.number ? <h1>Assignment {assignment.number}</h1> : <></>}
        </Col>
        <Col>
          <StatusBadge text={assignment.status} />
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="my-4" controlId="githubUrl">
            <Form.Label column sm="3" md="2">
              GitHub URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                readOnly
                value={assignment.githubUrl}
                placeholder="https://github.com/username/repo-name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="3" md="2">
              Branch:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="text"
                placeholder="example_branch_main"
                readOnly
                onChange={(e) => updateAssignment("branch", e.target.value)}
                value={assignment.branch}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="codeReviewUrl">
            <Form.Label column sm="3" md="2">
              Video Review URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                placeholder="https://screencast-o-matic.com/something"
                onChange={(e) =>
                  updateAssignment("codeReviewUrl", e.target.value)
                }
                value={assignment.codeReviewUrl}
              />
            </Col>
          </Form.Group>

          <div className="d-flex gap-5">
            {assignment.status === "Completed" ? (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => save(assignmentStatuses[2].status)}
              >
                Re-Claim
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() => save(assignmentStatuses[4].status)}
              >
                Complete Review
              </Button>
            )}
            {assignment.status === "Needs Update" ? (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => save(assignmentStatuses[2].status)}
              >
                Re-Claim
              </Button>
            ) : (
              <Button
                size="lg"
                variant="danger"
                onClick={() => save(assignmentStatuses[3].status)}
              >
                Reject Assignment
              </Button>
            )}

            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
            >
              Back
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CodeReviewerAssignmentView;
