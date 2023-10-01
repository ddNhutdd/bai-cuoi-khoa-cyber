import { Button, Input, Space, Table } from 'antd'
const { Search } = Input
import css from './list-kh.module.scss'
import { useEffect, useState } from 'react';
import { layDanhSachKhoaHoc } from '../../../services/khoa-hoc.service';
import { isPage } from '../index'
interface TypeKH {
  key: number
  // STT: number
  maKhoaHoc: string
  tenKhoaHoc: string
  hinhAnh: string
  luotXem: string
  nguoiTao: string
}

function ListKhoaHoc(props: any) {
  const { setPage } = props
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await layDanhSachKhoaHoc();
      console.log(data)
      setData(data);
    };

    fetchData();
  }, []);

  const dataSource: TypeKH[] = (data ?? []).map((item: any, index) => {
    const dataDetail: TypeKH = {
      key: index,
      maKhoaHoc: item?.maKhoaHoc,
      tenKhoaHoc: item?.tenKhoaHoc,
      hinhAnh: item?.hinhAnh,
      luotXem: item?.luotXem,
      nguoiTao: item?.nguoiTao.hoTen,
    }
    return dataDetail;
  })


  const columns = [
    {
      title: 'Ma khoa hoc',
      dataIndex: 'maKhoaHoc',
      key: 'age',
    },
    {
      title: 'Ten khoa hoc',
      dataIndex: 'tenKhoaHoc',
      key: 'tenKhoaHoc',
    },
    {
      title: 'Hinh anh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (hinhAnh: string) => (
        <img src={hinhAnh} style={{ width: '70px' }} />
      ),
    },
    {
      title: 'Luot xem',
      dataIndex: 'luotXem',
      key: 'luotXem',
    },
    {
      title: 'Nguoi tao',
      dataIndex: 'nguoiTao',
      key: 'nguoiTao',
    },
    {
      title: 'Thao tac',
      dataIndex: 'thaoTac',
      key: 'thaoTac',
      render: () => (
        <Space>
          <Button type='primary'>Ghi danh</Button>
          <Button type="primary" ghost>Sửa</Button>
          <Button type="primary" danger>X</Button>
        </Space>



      ),
    },

  ];
  return (
    <div>
      <p className={css['ds-kh']}>Danh sách khóa học</p>
      <p className={css['add-kh']}
        onClick={() => {
          setPage(isPage.add)
        }}>Thêm khóa học</p>
      <div className={css['search-kh']}>
        <Search
          className={css['header__search']}
          placeholder='input search text'
          enterButton
        />
      </div>
      <div className={css['table-kh']}>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  )
}

export default ListKhoaHoc
