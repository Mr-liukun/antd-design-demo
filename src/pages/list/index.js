import React from 'react';
import { Divider, Card, Icon, Table, Modal, Button, Form, Input, Row, Col, Tooltip, Select, InputNumber } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import sty from './index.less'

const { Option } = Select;
const namespace = "list";

const { confirm } = Modal;
const FormItem = Form.Item;
@connect(
  ({ list }) => ({
    list,
  }))
@Form.create()
class List extends React.Component {
  state = {
    visible: false,
    flag: "",
    name: "",
    age: undefined,
    desc: "",
    id: undefined
  }

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width:'250px',
     // ellipsis:true, //列数据超出范围是否省略
      //fixed: true //列是否固定
      render: text => (
        <Tooltip title={text} placement="topLeft">
          <span className="td-text-overflow">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width:'250px',
      ellipsis:true
    },
    {
      title: '性别',
      dataIndex: 'desc',
      width:'250px',
      render: text => (
        <Tooltip title={text} placement="topLeft">
          <span className="td-text-overflow">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '婚否',
      dataIndex: 'desc',
      width:'250px',
      render: text => (
        <Tooltip title={text} placement="topLeft">
          <span className="td-text-overflow">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '国籍',
      dataIndex: 'desc',
      width:'250px',
      render: text => (
        <Tooltip title={text} placement="topLeft">
          <span className="td-text-overflow">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '自我介绍',
      dataIndex: 'desc',
      width:'250px',
      // ellipsis:true,
      render: text => (
        <Tooltip title={text} placement="topLeft">
          <span className="td-text-overflow">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '操作',
      dataIndex: '',
      width:'250px',
      ellipsis:true,
      fixed: "right",
      render: (text, record) => (
        <div>
          {/* <Popconfirm title="Are you sure delete this task?" 
            onConfirm={() => {this.deleteOne(record.id)}} 
            okText="Yes" cancelText="No"
          > */}
          {/* <a>删除</a>
          </Popconfirm>  */}
          <a onClick={() => { this.deleteOne(record.id) }}>删除</a><Divider type="vertical" /><a onClick={() => { this.editOneShow(record.id, "edit") }}>编辑</a>
        </div>
      ),
    }
  ];

  componentDidMount() {
    this.props.dispatch({
      type: `${namespace}/showListEf`,
    })
  };

  modalCancel = () => {
    this.setState({
      visible: false,
    })
  }

  modalOk = () => {
    const { dispatch, form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: "list/addOne",
          payload: values,
          flag: this.state.flag,
          id: this.state.id,
        });
        this.setState({
          visible: false,
          flag: "add"
        });
      }
    });
  }

  submit = e => {
    const { dispatch } = this.props;

    dispatch({
      type: 'list/search',
      name: this.state.name,
      age: this.state.age,
      desc: this.state.desc
    });

    e.preventDefault();
  }

  reset = () => {
    this.setState({
      name: "",
      age: undefined,
      desc: ""
    })
  }

  nameFunc = e => {
    this.setState({
      name: e.target.value,
    })
  }

  ageFunc = e => {
    this.setState({
      age: e
    })
  }

  descFunc = e => {
    this.setState({
      desc: e.target.value,
    })
  }

  editOneShow(ids, fla) {
    const { dispatch } = this.props;

    dispatch({
      type: "list/editOneShow",
      payload: ids,
      flag: fla,
    });
    this.setState({
      visible: true,
      flag: fla,
      id: ids
    });
  };

  deleteOne(id) {
    const { dispatch } = this.props;
    const list = this.props.list.datalist;

    confirm({
      title: '删除',
      content: '确定删除这条数据吗？',
      onOk() {
        dispatch({
          type: "list/delOne",
          payload: id,
        });  
      },
      onCancel() { },
    });
    this.setState({
      datalist: list,
    });
  };

  showTo(total) {
    return '总共有 '+total+' 条数据';
  }


  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { editobj = {}, datalist = [] } = this.props.list;

    return (
      <PageHeaderWrapper title={false}>
        {/* <Form onSubmit={this.submit}>
          <Card hoverable={false} className={sty.card}>
            <Row gutter={[0, 50]}>
              <Col span={1}></Col>
              <Col span={7} >你好名称：<Input onChange={this.nameFunc} value={this.state.name} name="name" placeholder="请输入" className={sty.inSty} /></Col>
              <Col span={7} push={1}>你好年龄：
                  <Select allowClear name="age" onChange={this.ageFunc} placeholder="请选择" value={this.state.age} id={sty.sel}>
                  <Option value="12">12</Option>
                  <Option value="18">18</Option>
                  <Option value="20">20</Option>
                </Select>
              </Col>
              <Col span={7} push={2}>你好描述：<Input onChange={this.descFunc} value={this.state.desc} name="desc" placeholder="请输入" className={sty.inSty} /></Col>
            </Row>
            <Row>
              <Col span={4} ></Col>
              <Col span={4} ></Col>
              <Col span={4} ></Col>
              <Col span={4} ></Col>
              <Col span={4} ></Col>
              <Col span={4} push={1}><Button icon="search" type="primary" htmlType="submit" className={sty.rtop}>搜索</Button><Button icon="rollback" onClick={this.reset}>清空</Button></Col>
            </Row>
          </Card>
        </Form>  */}
        <Card>
        <Form layout="inline" style={{ margin: 5 }}>
        <Row type="flex" gutter={[{ md: 8, lg: 24, xl: 48},20]}>
          <Col md={8} sm={24} >
            <FormItem label="人员工号" >
              {getFieldDecorator('name', {
              })(
                <Input placeholder="请输入"/>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="人员姓名">
              {getFieldDecorator('name', {
              })(
                <Input placeholder="请输入"/>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} >
            <FormItem label="手机号码" >
              {getFieldDecorator('name', {
              })(
                <Input placeholder="请输入"/>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态" >
              {getFieldDecorator('inspectionType', {
                initialValue: 'ALL',
              })(
                <Select defaultValue="ALL">
                  <Option value="ALL" >全部</Option>
                  <Option value="ZAI">在职</Option>
                  <Option value="LI">离职</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={16} sm={24}
            //className={sty.searchButton} 
            >
            <div style={{ float: 'right'}} >
              <Button icon="search" type="primary" onClick={this.handleSearch} >查询</Button>
              <Button icon="delete" style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
            </div>
          </Col>
        </Row>
      </Form>
      </Card>

          <Card>
            <Button icon="plus" type="primary" onClick={() => { this.editOneShow(0, "add") }}>新建</Button>
            <Table className={sty.buttonSty}
              columns={this.columns}
              scroll={datalist && datalist.length > 0 ? { x: 1400 } : {}}
              dataSource={datalist}
              rowKey="id"
              pagination={{
                defaultCurrent: 1,
                total: datalist.length,
                showSizeChanger: true ,
                showQuickJumper: true,
                showTotal: this.showTo,
              }}
            />
          </Card>
          <Modal maskClosable={false} destroyOnClose="true" forceRender="true" title="新建记录" visible={this.state.visible} onOk={this.modalOk} onCancel={this.modalCancel}>
            <Form 
              labelCol={{x1:4, lg:4, md:4, sm:24}}  //前面的label占多少
              wrapperCol={{x1:20, lg:20, md:20, sm:24}} //后面的内容占多少，显示一行
              >
                  <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true }],
                  initialValue: editobj.name
                })(
                  <Input placeholder="请输入名字"/>
                )}
              </Form.Item>           
            
              <Form.Item label="年龄">
                {getFieldDecorator('age', {
                   rules: [{ required: true }],
                  initialValue: editobj.age
                })(
                  <InputNumber style={{width:'393px'}} min={10} max={120} placeholder="请输入年龄" />
                )}
              </Form.Item>
              <Form.Item label="描述">
                {getFieldDecorator('desc', {
                   rules: [{ required: true }],
                  initialValue: editobj.desc
                })(
                  <Input placeholder="请输入自我介绍" />
                )}
              </Form.Item>
            </Form>
          </Modal>
      </PageHeaderWrapper>
    );
  };
}
export default List;
