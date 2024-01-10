import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import ajax from '../Services/fetchService';

const AssignmentView = () => {
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        branch: "",
        githubUrl: ""
    });
    const [jwt, setJwt] = useLocalState("", "jwt");

    function updateAssignment(prop, value){
        const newAssignment = { ...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function save(){
        ajax(`http://localhost:8080/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            (assignmentData) => {
                setAssignment(assignmentData);
    });
}

    useEffect(() => {
        ajax(`http://localhost:8080/api/assignments/${assignmentId}`, "GET", jwt).then(
            (assignmentData) => {
                setAssignment(assignmentData);
      });
    }, []);

    return (
        <div>
            <h1>Assignment {assignmentId}</h1>
            {
                assignment ? (
                <>
                <h2>
                    Status: {assignment.status}
                </h2>   
                <h3>
                    Code Review Video URL: <input type="url" id="githubUrl" onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                    value = {assignment.githubUrl}
                    />
                </h3>
                <h3>
                    Branch: <input type="text" id="branch" onChange={(e) => updateAssignment("branch", e.target.value)}
                    value = {assignment.branch}
                    />
                </h3>
                <button onClick={() => save()}>Submit Assignment</button>
                </>
                ) : ( <></>
            )}
        </div>
    );
};

export default AssignmentView;