import { ColumnType } from 'antd/lib/table';

export interface BaseTableProps {
  columns: ColumnType<any>[];
  dataSource: any[];
  size?: 'small' | 'middle' | undefined;
  rowClassName?: any;
  currentPage: number;
  total: number;
  showTotal?: true;
  onChange?: (page: number, pageSize: number) => void;
  classNamePagination?: string;
}