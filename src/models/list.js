import * as service from '@/services/list';

export default {
  namespace : "list",
  state : {
    editobj : {},
    datalist : [],
  },

  effects : {
    *showListEf( { _ }, {call, put}) {
        const payload = yield call(service.getList);
        yield put({type: 'showListRe', payload});          
    },

    *addOne( {payload,flag, id}, {call, put} ) {
      if(flag == "add") {
        var result = yield call(service.addOne, payload);
        yield  put({type:'addOneItem', payload,flag, result})
      }else if(flag == "edit") {     
        var result = yield call(service.updateOne, id, payload);
        yield  put({type:'addOneItem', payload,flag, result,id})
      } 
    },

    *delOne({payload}, {call, put}) {
      var result = yield call(service.delOne, payload);
      yield put({type:'delOneItem', result,payload});
    },

    *editOneShow({payload,flag}, {call, put}) {
      yield put({type:'editOneShowItem', payload,flag});
    },

    *search({name, age, desc}, {call, put}) {
      if(age == undefined) {
        age = "";
      }
      var reList = yield call(service.search, name, age, desc);
      yield put({type:'searchList', reList});
    },
  },

  reducers: {
    showListRe(state, {type, payload}) {        
      const newList = payload;
      return {
        datalist: newList,
      }
    },

    addOneItem(state, {type, payload,flag,result,id}) {
      const newList = state.datalist;
      if(flag === "add" && result.message == "ok") { // 添加
        payload.id = result.content;    
        return {
          datalist: [...newList, payload],
        }
      } else if(flag === "edit" && result.message == "ok") { // 更新
        for(var i=0; i<newList.length; i++) {
          if(newList[i].id == id) {
            payload.id = id;
            newList[i] = payload;
            break;
          }
        }
        return {
          datalist: newList,
        }
      }    
    },

    delOneItem(state, {type, result, payload}) {
      const newList = state.datalist;
      if(result.message == "ok") {
        const newList = state.datalist;
        for(var i=0; i<newList.length; i++){
          if(newList[i].id === payload) {
            newList.splice(i, 1);
            break;
          }
        }
      }
      return {
        datalist: newList,
      }
    },

    editOneShowItem(state, {type, payload,flag}) {
      const newList = state.datalist;
      var editobj= {};
      if(flag === "add") { //新增时表单的显示应为空，既input框中没有数据
        return {
          editobj: editobj,
          datalist: newList,
        }
      }else{
        for(var i=0; i<newList.length; i++){ //edit时表单中应有数据
          if(newList[i].id === payload) {
            editobj = newList[i];
            break;
          }
        }
        return {
          editobj: editobj,
          datalist: newList,
        }
      }
    },
    searchList(state, {type, reList}) {
      return {
        datalist: reList,
      }
    }
  },
}