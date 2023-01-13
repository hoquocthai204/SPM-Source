import { Table } from 'antd';
import { useAppTranslation } from 'app/hooks';
import React from 'react';

interface GroupContainerSettingProps {
  logo: string;
  headerText: string;
  keyGroup: string;
  titleElement: string[];
  detailElement: React.ReactNode[];
}

const GroupContainerSetting: React.FunctionComponent<GroupContainerSettingProps> = (props) => {
  const t = useAppTranslation();

  const columns = [
    {
      title: () => (
        <div className="setting__group-header">
          <span>{props.headerText}</span>
          <img src={props.logo} alt="" />
        </div>
      ),
      dataIndex: props.keyGroup,
      key: props.keyGroup,
      render: (data: any, index: any) => (
        <div className="setting__group-element" key={String(index)}>
          <span className="setting__element-title">{data.title}</span>
          {data.detail}
        </div>
      ),
    },
  ];

  const dataSource = props.titleElement.map((e, i) => ({
    key: i,
    [props.keyGroup]: {
      title: e,
      detail: props.detailElement[i],
    },
  }));

  return (
    <div className="setting__group">
      <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default GroupContainerSetting;
