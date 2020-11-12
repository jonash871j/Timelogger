import React from 'react';
import { connect } from "react-redux";
import * as api from "../api/project";

const projectValues = {
    name: 'someProject',
    timeSpent: '1 hours',
    deadline: '2020-11-12',
}

// Used to get spent time from user and converting it into right format
function getSpentTime(elementId)
{
    var timeSpentVal = document.getElementById(elementId).value;

    // If less than half and hour, give error
    if (timeSpentVal < 0.5) {
        timeSpentVal = 0.5;
    }
    // If less than and hour, then convert it into minutes
    if (timeSpentVal < 1.0){
        timeSpentVal  *= 60;
        return timeSpentVal + " min";
    }
    else{
        return timeSpentVal + " hours";
    }
}

const ProjectBar = ({ classes, ...properties }) => {

    // Event for creating project
    const onCreate = () => {
     
        // Gets field values from id
        projectValues.name = document.getElementById("tb_name").value;
        projectValues.timeSpent = getSpentTime("tb_timeSpent");
        projectValues.deadline = document.getElementById("tb_deadline").value;

        properties.create(projectValues);
    }

    // Returns projects tools
    return(
        <div className="flex items-center my-6">
            <input id="tb_name" className="border rounded-full py-2 px-4" type="text" placeholder="Name" aria-label="Name"/>
            <input id="tb_timeSpent" className="border rounded-full py-2 px-4 ml-2" type="number" placeholder="Time spent (hours)" aria-label="Time Spent"/>
            <input id="tb_deadline" className="border rounded-full py-2 px-4 ml-2" type="date" placeholder="Deadline" aria-label="Deadline"/>

            <div className="w-1/2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded" onClick={() => onCreate()}>Add project</button>
            </div>
        </div>
    )
}

const mapStateToProperties = state => ({
    projectList: state.project.list
})

const mapApiToProperties = {
    create: api.create
}

export default connect(mapStateToProperties, mapApiToProperties)(ProjectBar);