
import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Link } from 'react-router-dom';
import ajax from '../Services/fetchService';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

const Dashboard = () => {
  
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    ajax("http://localhost:8080/api/assignments", "GET", jwt).then(
      (assignmentsData) => {
        setAssignments(assignmentsData);
  });
}, [jwt]);

  function createAssignment(){
    ajax("http://localhost:8080/api/assignments", "POST", jwt).then(
      (assignment) => {
        window.location.href = `/assignments/${assignment.id}`;
      })
  }

    return (
            <div style = {{margin: "2em"}}>
              <div className='mb-5'>
              <Button size='lg' onClick={() => createAssignment()}>Submit new Assignment</Button>
              </div>
              {assignments ? (
                <div 
                className='d-grid gap-5'
                style={{gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                >
                  {assignments.map((assignment) => (
                      <Card 
                            key={assignment.id}
                            style={{ width: '18rem', height: "18rem" }}
                            >
                            <Card.Body className='d-flex flex-column justify-content-around'>
                              <Card.Title>Assignment #{assignment.id}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">
                                {assignment.status}
                                </Card.Subtitle>
                              <Card.Text style={{marginTop: "1m"}}>
                                <p><b>GitHub URL:</b> {assignment.githubUrl}</p>
                                <p><b>Branch:</b> {assignment.branch}</p>
                              </Card.Text>
                                <Button 
                                  variant = "secondary"
                                  onClick={() => {
                                    window.location.href=`/assignments/${assignment.id}`;
                                }}>Edit</Button>
                            </Card.Body>
                          </Card>
                ))}
                </div>
                ) : (
              <></>
              )}
            </div>
    );
};

export default Dashboard;