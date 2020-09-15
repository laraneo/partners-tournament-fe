export const ACTIONS = {
    GET_ALL: 'trule-type/get_all',
    GET: 'trule-type/get',
    GET_LIST: 'trule-type/get_list',
    SET_LOADING: 'trule-type/set_loading',
    SET_PAGINATION: 'trule-type/set_pagination',
};
  
  interface Get {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }
  
  interface GetAll {
    type: typeof ACTIONS.GET_ALL
    payload: Array<string|number>
  }

  interface GetList {
    type: typeof ACTIONS.GET_LIST
    payload: Array<string|number>
  }
  
  interface SetLoading {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }

  interface SetPagination {
    type: typeof ACTIONS.SET_PAGINATION
    payload: Array<string|number>
  }
  
  
  export type ActionTypes = Get | GetAll | SetLoading | SetPagination | GetList