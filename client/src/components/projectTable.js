import React, { useEffect} from "react";
import { connect } from "react-redux";
import * as api from "../api/project";

const projectValues = {
    name: '',
    timeSpent: '',
    deadline: '',
}

var isSortedByDeadLine = false;

const ProjectTable = ({ classes, ...properties }) => {
    // Event for deleting project
    const onDelete = id => {
        if (window.confirm('Are you sure to delete this project?')){
            properties.delete(id);
        }
    }

    // Event for getting all projects
    const onGetAll = () => {
        properties.getAll();
    }
    
    // Event for getting all projects sorted by deadline
    const onSortedByDeadLine = () => {
        if (isSortedByDeadLine)
        {
            onGetAll();
            isSortedByDeadLine = false;
        }
        else
        {
            properties.getAllSortedByDeadLine();
            isSortedByDeadLine = true;
        }
    }

    // When site refreshes, 
    useEffect(() => {
        onGetAll();
    }, [])

    var totalSpentTime = 0;

    // Returns project bar and table
    return (
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-4 py-2 w-12">Id</th>
                    <th className="border px-4 py-2">Project Name</th>
                    <th className="border px-4 py-2 w-64">Time Spent</th>
                    <th className="border px-4 py-2 w-64">
                        <button className="font-bold" onClick={() => onSortedByDeadLine()}>Deadline</button>
                    </th>
                    <th className="border px-4 py-2 w-24"></th>
                </tr>
            </thead>
            <tbody>
            {
                // Adds each project into table row
                properties.projectList.map((record, index) => {
                    
                    // Converts datetime string into date object
                    let date = new Date(record.deadline);
                    totalSpentTime += record.timeSpent;
                    
                    return (
                    <tr key={index} hover>
                        <td className="border px-4 py-2">{record.id}</td>
                        <td className="border px-4 py-2">{record.name}</td>
                        <td className="border px-4 py-2">{record.timeSpent}</td>
                        <td className="border px-4 py-2">{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</td>
                        <td className="border px-4 py-2">
                            <button className=" font-bold" onClick={() => onDelete(record.id)}>Delete</button>
                        </td>
                    </tr>
                    )
                })
            }
            </tbody>
        </table>      
    );
}

const mapStateToProperties = state => ({
    projectList: state.project.list
})

const mapApiToProperties = {
    create: api.create,
    delete: api.Delete,
    getAll: api.getAll,
    getAllSortedByDeadLine: api.getAllSortedByDeadLine,
}

export default connect(mapStateToProperties, mapApiToProperties)(ProjectTable);