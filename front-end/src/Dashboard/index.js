import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ajax from "../Services/fetchService";
import Card from "react-bootstrap/Card";
import { Button, Col, Row } from "react-bootstrap";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";

const Dashboard = () => {
  const user = useUser();
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ajax(`/api/assignments`, "GET", user.jwt).then(
      (assignmentsData) => {
        setAssignments(assignmentsData);
      }
    );
    if (!user.jwt) {
      user.jwt = "";
      navigate("/login");
    }
  }, [user.jwt]);

  function createAssignment() {
    ajax(`/api/assignments`, "POST", user.jwt).then(
      (assignment) => {
        window.location.href = `/assignments/${assignment.id}`;
      }
    );
  }

  return (
    <div style={{ margin: "2em" }}>
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={() => {
              user.setJwt(null);
              window.location.href = "/login";
            }}
          >
            Logout
          </div>
        </Col>
      </Row>
      <div className="mb-5 d-flex justify-content-center align-items-center">
        <Button size="lg" onClick={() => createAssignment()}>
          Submit new Assignment
        </Button>
      </div>

      <div className="assignment-wrapper needs-update">
        <div className="assignment-wrapper-title h3 px-2">Needs Update</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "Needs Update")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Needs Update")
              .map((assignment) => (
                <Card
                  key={assignment.id}
                  style={{ width: "18rem", height: "18rem" }}
                >
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-strat">
                      <StatusBadge text={assignment.status} />
                    </div>
                    <Card.Text style={{ marginTop: "1m" }}>
                      <p>
                        <b>GitHub URL:</b> {assignment.githubUrl}
                      </p>
                      <p>
                        <b>Branch:</b> {assignment.branch}
                      </p>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        window.location.href = `/assignments/${assignment.id}`;
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No assignments found</div>
        )}
      </div>

      <div className="assignment-wrapper pending-submission">
        <div className="assignment-wrapper-title h3 px-2">
          Pending Submission
        </div>
        {assignments &&
        assignments.filter(
          (assignment) => assignment.status === "Pending Submission"
        ).length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter(
                (assignment) => assignment.status === "Pending Submission"
              )
              .map((assignment) => (
                <Card
                  key={assignment.id}
                  style={{ width: "18rem", height: "18rem" }}
                >
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-strat">
                      <StatusBadge text={assignment.status} />
                    </div>
                    <Card.Text style={{ marginTop: "1m" }}>
                      <p>
                        <b>GitHub URL:</b> {assignment.githubUrl}
                      </p>
                      <p>
                        <b>Branch:</b> {assignment.branch}
                      </p>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        window.location.href = `/assignments/${assignment.id}`;
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No assignments found</div>
        )}
      </div>

      <div className="assignment-wrapper in-review">
        <div className="assignment-wrapper-title h3 px-2">In Review</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "In Review")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "In Review")
              .map((assignment) => (
                <Card
                  key={assignment.id}
                  style={{ width: "18rem", height: "18rem" }}
                >
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-strat">
                      <StatusBadge text={assignment.status} />
                    </div>
                    <Card.Text style={{ marginTop: "1m" }}>
                      <p>
                        <b>GitHub URL:</b> {assignment.githubUrl}
                      </p>
                      <p>
                        <b>Branch:</b> {assignment.branch}
                      </p>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        window.location.href = `/assignments/${assignment.id}`;
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No assignments found</div>
        )}
      </div>
      <div className="assignment-wrapper submitted">
        <div className="assignment-wrapper-title h3 px-2">Awaiting Review</div>
        {assignments &&
        assignments.filter(
          (assignment) =>
            assignment.status === "Submitted" ||
            assignment.status === "Resubmitted"
        ).length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter(
                (assignment) =>
                  assignment.status === "Submitted" ||
                  assignment.status === "Resubmitted"
              )
              .sort((a, b) => {
                if (a.status === "Resubmitted") return -1;
                else return 1;
              })
              .map((assignment) => (
                <Card
                  key={assignment.id}
                  style={{ width: "18rem", height: "18rem" }}
                >
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-strat">
                      <StatusBadge text={assignment.status} />
                    </div>
                    <Card.Text style={{ marginTop: "1m" }}>
                      <p>
                        <b>GitHub URL:</b> {assignment.githubUrl}
                      </p>
                      <p>
                        <b>Branch:</b> {assignment.branch}
                      </p>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        window.location.href = `/assignments/${assignment.id}`;
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No assignments found</div>
        )}
      </div>
      <div className="assignment-wrapper completed">
        <div className="assignment-wrapper-title h3 px-2">Completed</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "Completed")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Completed")
              .map((assignment) => (
                <Card
                  key={assignment.id}
                  style={{ width: "18rem", height: "18rem" }}
                >
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-strat">
                      <StatusBadge text={assignment.status} />
                    </div>
                    <Card.Text style={{ marginTop: "1m" }}>
                      <p>
                        <b>GitHub URL:</b> {assignment.githubUrl}
                      </p>
                      <p>
                        <b>Branch:</b> {assignment.branch}
                      </p>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        window.location.href = `/assignments/${assignment.id}`;
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No assignments found</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
