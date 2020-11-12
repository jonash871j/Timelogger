import axios from "axios";

const baseUrl = "http://localhost:3001/api/"

export default {

    project(url = baseUrl + 'projects/') {
        return {
            getAll: () => axios.get(url),
            getAllSortedByDeadLine: () => axios.get(url + "GetProjectsByDeadLine"),
            getById: id => axios.get(url + id),
            create: newData => axios.post(url, newData),
            update: (id, updateData) => axios.put(url + id, updateData),
            delete: id => axios.delete(url + id),
        }
    }
}