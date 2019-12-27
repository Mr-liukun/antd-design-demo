import request from '@/utils/request';

export async function getList() {
  return request('http://localhost:8080/index/list', {
    method: 'GET',
  });
}

export async function getOne(id) {
  return request('http://localhost:8080/index/getone', {
    method: 'GET',
    params: {
      id: id
    }
  });
}

export async function delOne(id) {
  return request('http://localhost:8080/index/delone', {
    method: 'GET',
    params: {
      id:id
    }
  });
}

export async function addOne(obj) {

  return request('http://localhost:8080/index/addone',{
    method: 'POST',
    params : {
      name: obj.name,
      age : obj.age,
      desc: obj.desc
    }
  });
}

export async function updateOne(id, obj) {
  return request('http://localhost:8080/index/updateone', {
    method: 'GET',
    params: {
      id: id,
      name: obj.name,
      age: obj.age,
      desc: obj.desc,
    }
  });
}

export async function search(name, age, desc) {
  return request('http://localhost:8080/index/search', {
    method: 'GET',
    params: {
      name: name,
      age: age,
      desc: desc,
    }
  });
}
