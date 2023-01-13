import { Divider, PaginationProps, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useAppTranslation } from 'app/hooks';
import React from 'react';

interface BaseTableProps {
  columns: ColumnType<any>[];
  dataSource: any[];
  size?: 'small' | 'middle' | undefined;
  rowClassName?: any;
  currentPage?: number;
  total?: number;
  showTotal?: true;
  onChange?: (page: number, pageSize: number) => void;
  classNamePagination?: string;
  loading?:
    | {
        spinning: boolean;
        indicator: React.ReactElement<HTMLElement>;
      }
    | boolean;
  pagination?: PaginationProps;
  scroll?: any;
}
interface TableProps extends BaseTableProps {}

export const TableCommon: React.FunctionComponent<TableProps> = (props) => {
  const t = useAppTranslation();
  return (
    <div className="table-container">
      <Divider style={{ margin: 0 }} />
      <Table
        loading={props.loading}
        columns={props.columns}
        dataSource={props.dataSource}
        size={props.size}
        pagination={
          props.showTotal
            ? {
                onChange: props.onChange,
                total: props.total,
                showTotal: (total: any, range: any[]) =>
                  props.showTotal &&
                  t('common.showAll', { start: range[0], end: range[1], total: total }),
                className: 'table-pagination',
                size: 'small',
                current: props.currentPage ?? 1,
              }
            : false
        }
        className="table-common"
        scroll={props.scroll}
      />
    </div>
  );
};
