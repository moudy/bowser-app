export const ADD_PAGE = 'ADD_PAGE';
export const SELECT_PAGE_GROUP = 'SELECT_PAGE_GROUP';

export const addPage = (data) => ({...data, type: ADD_PAGE});
export const selectPageGroup = (data) => ({...data, type: SELECT_PAGE_GROUP});
