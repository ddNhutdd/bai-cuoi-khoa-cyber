import { Button, Divider, Input, Space, Table } from 'antd'
const { Search } = Input
import css from './list-kh.module.scss'
import { useEffect, useState } from 'react';
import { layDanhSachKhoaHoc, xoaKhoaHoc } from '../../../services/khoa-hoc.service';
import { isPage } from '../index'
interface TypeKH {
  key: number
  maKhoaHoc: string
  tenKhoaHoc: string
  hinhAnh: string
  luotXem: string
  nguoiTao: string

}

function ListKhoaHoc(props: any) {
  const { setPage, setMaKhoaHoc } = props
  const [data, setData] = useState<TypeKH[]>([]);
  const [searchResults, setSearchResults] = useState<TypeKH[]>([]);
  const [searchText, setSearchText] = useState<string>()


  useEffect(() => {
    const fetchData = async () => {
      const data = await layDanhSachKhoaHoc();
      setData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredData = [];
    if (searchText) {
      filteredData = data.filter(item => {
        return item.tenKhoaHoc.includes(searchText);
      });
      setSearchResults(filteredData);
  
    }
     else {
      setSearchResults(data);
    }
  }, [searchText]);

  const buttonXoaKhoaHoc = async (record: TypeKH) =>{
      await xoaKhoaHoc(record.maKhoaHoc)
      .then(result =>{
        console.log(result)
      })
      .catch(err =>{
        console.log(err)
      })

      const data = await layDanhSachKhoaHoc()
      setData(data)
  }

  let dataSource: TypeKH[] = (data ?? []).map((item: any, index) => {
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
  if (searchResults.length > 0) {
    dataSource = searchResults;
    console.log('if: ',dataSource)  
  } else {
    dataSource = data;
    console.log('else: ',dataSource)
  }


  const columns = [
    {
      title: 'Mã khóa học',
      dataIndex: 'maKhoaHoc',
      key: 'maKhoaHoc',
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'tenKhoaHoc',
      key: 'tenKhoaHoc',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (hinhAnh: string) => (
        <img src={hinhAnh} style={{ width: '70px' }} />
      ),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'luotXem',
      key: 'luotXem',
    },
    {
      title: 'Người tạo',
      dataIndex: 'nguoiTao',
      key: 'nguoiTao',

    },
    {
      title: 'Thao tác',
      dataIndex: 'thaoTac',
      key: 'thaoTac',
      render: (_: any, record: TypeKH) => (
        <Space>
          <Button onClick={() => {
            const maKhoaHoc = record.maKhoaHoc;
            setPage(isPage.ghiDanh)
            setMaKhoaHoc(maKhoaHoc)
          }} type='primary'>
            Ghi danh
          </Button>

          <Button type="primary" ghost>Sửa</Button>
          <Button onClick={() => buttonXoaKhoaHoc(record)} type="primary" danger>Xóa</Button>
        </Space>
      ),
    },

  ];
  // console.log(searchResults.length)
  return (
    <div>
      <p className={css['ds-kh']}>Danh sách khóa học</p>
      <p className={css['add-kh']}
        onClick={() => {
          setPage(isPage.add)
        }}>Thêm khóa học</p>
      <div className={css['search-kh']}>
        <Input
          className={css['header__search']}
          placeholder='Nhập tên khóa học cần tim'
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className={css['table-kh']}>
        <Table
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </div>
  )
}

export default ListKhoaHoc
