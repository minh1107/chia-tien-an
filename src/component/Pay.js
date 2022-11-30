import { Button, Checkbox, Descriptions, Divider, Form, Input, Layout, List, Menu, Radio, Slider } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { Fragment, useState } from "react";
import TableMoney from "./TableMoney";

const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Tien anh", "Vinh", "Hieu", "Nghia Minh", "Quang Minh"];
const defaultCheckedList = [];

export default function Pay() {
  const [value, setValue] = useState("Tien anh");
  const [money, setMoney] = useState();
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
    // thong ke   
  const onFinish = (values) => {
    setMoney(parseInt(values.username));

  };
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onChangeCheckbox = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const houseMoney = (value) => {
    console.log(value.housemoney);
    setMoney(parseInt(value.housemoney));
    setCheckedList(['Tien anh', 'Vinh', 'Hieu', 'Nghia Minh', 'Quang Minh'])
    console.log(checkedList);
    setValue()
    
  }
  return (
    <div style={{display: 'flex', margin: "20px"}}>
      <div  style={{flex: 1}}>
      <label>Người chi: </label>
      <Radio.Group flex onChange={onChange} value={value}>
        <Radio value={"Tien anh"}>Tien anh</Radio>
        <Radio value={"Vinh"}>Vinh</Radio>
        <Radio value={"Hieu"}>Hieu</Radio>
        <Radio value={"Nghia Minh"}>Nghĩa Minh</Radio>
        <Radio value={"Quang Minh"}>Quang Minh</Radio>
      </Radio.Group>
      <div>
        <label>Người ăn: </label>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
        <Divider />
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChangeCheckbox}
        />
      </div>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Nhập tiền"  name="username">
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Descriptions title="Thông tin check">
          <Descriptions.Item label="Người chi">{value}</Descriptions.Item>
          <Descriptions.Item label="Người tham gia">{checkedList}</Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">{money}</Descriptions.Item>
      </Descriptions>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={houseMoney}
        autoComplete="off"
      >
        <Form.Item label="Nhập tiền nhà"  name="housemoney">
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Thêm tiền nhà
          </Button>
        </Form.Item>
      </Form>
      </div>
      <div style={{flex: 2}}>
      <TableMoney value={value} checkedList={checkedList} money={money}/>
      </div>
    </div>
  );
}

