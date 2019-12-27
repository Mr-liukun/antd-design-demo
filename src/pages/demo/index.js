import React from 'react';
import { Input, Button, Select,Tooltip } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { TreeSelect } from 'antd';
import sty from './index.less'

const { TreeNode } = TreeSelect;

const { Option } = Select;

@connect(({ demo }) => ({
  demo,
}))
class Demo extends React.Component {
  state = {
    inValue: ""
  }

  gvalue = (value) => {
    this.setState({
      inValue: value
    })
  }

  click = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "demo/showListEf",
      payload: this.state.inValue,
    });
  }

  render() {
    const { editobj } = this.props.demo;
    return (
      <PageHeaderWrapper>
        <Tooltip
          trigger={['focus']}
          title={"请输入年龄，只能是数字嗷~"}
          placement="topLeft"
        >
          <Input className="select" onChange={this.gvalue} />
        </Tooltip>
        <Button type="primary" onClick={this.click}>提交</Button>
        <h1>{editobj}</h1>
        {/* <Select allowClear defaultValue="请选择" onChange={this.gvalue}>
          <Option value="one">第一个</Option>
          <Option value="two">第二个</Option>
          <Option value="three">第三个</Option>
        </Select> */}
      </PageHeaderWrapper>
    )
  }
}

export default Demo;