import api from "./api";

export const API_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    GET_ALL: 'GET_ALL',
    GET_ALL_SORTED_BY_DEADLINE: 'GET_ALL_SORTED_BY_DEADLINE',
    GET_BY_SEARCH: 'GET_BY_SEARCH'
}

const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})

export const getAll = () => dispatch => {
    api.project().getAll()
        .then(response => {
            dispatch({
                type: API_TYPES.GET_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.project().create(data)
        .then(res => {
            dispatch({
                type: API_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}


export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.project().update(id, data)
        .then(res => {
            dispatch({
                type: API_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.project().delete(id)
        .then(res => {
            dispatch({
                type: API_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const getAllSortedByDeadLine = () => dispatch => {
    api.project().getAllSortedByDeadLine()
        .then(response => {
            dispatch({
                type: API_TYPES.GET_ALL_SORTED_BY_DEADLINE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
