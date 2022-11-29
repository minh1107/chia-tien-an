import { Button, Form, Input, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
export default function TableMoney({value, checkedList, money}) {

  const [dataSource, setDataSource] = useState([
    // data mau
  ]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'tien anh',
      dataIndex: 'tienanh',
    },
    {
      title: 'Vinh',
      dataIndex: 'vinh',
    },
    {
      title: 'Hieu',
      dataIndex: 'hieu',
    },
    {
      title: 'Minh Nghia',
      dataIndex: 'minhnghia',
    },
    {
      title: 'Quang Minh',
      dataIndex: 'quangminh',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    let taMoney = 0, vMoney = 0, hMoney = 0, mnMoney = 0, qmMoney = 0;
    if(value == "Tien anh") taMoney = money/(checkedList.length)*(checkedList.length-1);
    else if(value == "Vinh") vMoney = money/(checkedList.length)*(checkedList.length-1)
    else if(value == 'Hieu') hMoney = money/(checkedList.length)*(checkedList.length-1) 
    else if (value == "Nghia Minh") mnMoney = money/(checkedList.length)*(checkedList.length-1)
    else if (value == "Quang Minh") qmMoney = money/(checkedList.length)*(checkedList.length-1)
    if(checkedList.includes('Tien anh' && value != "Tien anh")) taMoney = - money/(checkedList.length)
    if(checkedList.includes('Vinh') && value != "Vinh") vMoney = - money/(checkedList.length)
    if(checkedList.includes('Hieu') && value != "Hieu") hMoney = - money/(checkedList.length)
    if(checkedList.includes('Nghia Minh') && value != "Nghia Minh") mnMoney = - money/(checkedList.length)
    if(checkedList.includes('Quang Minh') && value != "Quang Minh") qmMoney = - money/(checkedList.length)

    const newData = {
      key: count,
      tienanh: taMoney,
      vinh: vMoney,
      hieu: hMoney,
      minhnghia: mnMoney,
      quangminh: qmMoney,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  console.log(dataSource);
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const [result, setresult] = useState([])
  const totalMoney = () => {
    var ta = 0, v = 0,h = 0,mn = 0,qm = 0;

    dataSource.map((data) => {
      h += data.hieu;
      ta += data.tienanh
      v += data.vinh
      mn += data.minhnghia
      qm += data.quangminh
    })
    setresult([
      ta, v, h ,mn,qm
    ])
  }
  return (
    <><h1>Money table</h1>
     <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <Button onClick={totalMoney}>Tính tổng tiền</Button>
      <br/>
        tien anh: {result[0]}<br/>
        Vinh: {result[1]}<br/>
        Hieu: {result[2]}<br/>
        Nghia minh: {result[3]}<br/>
        Quang minh: {result[4]}<br/>
    </div>
    
    </>
  )
}
