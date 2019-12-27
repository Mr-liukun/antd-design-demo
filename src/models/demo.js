import request from '../utils/request';

export default {
  namespace : "demo",
  state : {
    editobj : "",
  },

  effects : {
    *showListEf( { payload }, {call, put}) {
        yield put({type: 'showListRe', payload});          
    },
  },

  reducers: {
    showListRe(state, {type, payload}) {        
      return {
        editobj: payload,
      }
    },
  },
}