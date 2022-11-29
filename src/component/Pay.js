import { Button, Checkbox, Divider, Form, Input, Radio } from "antd";
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
  return (
    <Fragment>
      <Radio.Group flex onChange={onChange} value={value}>
        <Radio value={"Tien anh"}>Tien anh</Radio>
        <Radio value={"Vinh"}>Vinh</Radio>
        <Radio value={"Hieu"}>Hieu</Radio>
        <Radio value={"Nghia Minh"}>Nghĩa Minh</Radio>
        <Radio value={"Quang Minh"}>Quang Minh</Radio>
      </Radio.Group>
      <div>
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
        <Form.Item label="Username" name="username">
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
      <div>
        Người chi:
        {value}
        <br />
        Người chịu:
        {checkedList}
        <br />
        money:
        {money}
      </div>
      <TableMoney value={value} checkedList={checkedList} money={money}/>
    </Fragment>
  );
}
