import React from 'react';
import { connect } from 'dva';
import st from './login.less';

class Login extends React.Component {

  state = {
    username: "",
    password: "",
  }

  qwe = () => {
    var name = this.state.username;
    if(name=="") {
      var s = document.getElementById("xiaoxi");
      s.innerHTML = "账号密码错误，请重新输入！";
    } else{

    }


  }

  nameFunc = (e) => {
    var s = document.getElementById("xiaoxi");      
    s.innerHTML = "";
    this.setState({
      username: e.target.value
    })   
  }

  passFunc = (e) => {
    var s = document.getElementById("xiaoxi");      
    s.innerHTML = "";
    this.setState({
      password: e.target.value
    }) 
  }
  
  submit = () =>{

  }
  render() {
    return (

      <div className={st.main}>
        <form onSubmit={this.submit()}>     
        <div className={st.change}>
            <label className={st.la}>账号</label>
            <input id="name" value={this.state.username} autoComplete="off" className={st.inpu} placeholder="请输入" name="name" onChange={()=>{this.nameFunc()}} />
        </div>
        <div className={st.change}>
          <label className="la">密码</label>
          <input type="password" value={this.state.password} className={st.inpu} placeholder="请输入" name="password" onChange={()=>{this.passFunc()}} />
        </div>

        <div className={st.mess}>
          <div className={st.tishi} id="xiaoxi">
          </div>
        </div>
        <div className={st.dbu}>
          <button type="submit" className={st.butt} onClick={()=>{this.qwe()}}>登 录</button>
          <button className={st.butt}>注 册</button>
        </div>
        </form> 
      </div> 
    );
  }
}
                    
export default Login;