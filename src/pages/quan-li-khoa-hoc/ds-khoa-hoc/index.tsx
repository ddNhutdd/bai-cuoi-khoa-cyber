import { Button, Input, Space, Table } from 'antd'
import css from './list-kh.module.scss'
import { useEffect, useState } from 'react';
import { layDanhSachKhoaHoc, xoaKhoaHoc } from '../../../services/khoa-hoc.service';
import { isPage } from '../index'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ALERT_CONFIG, API_RESPONSE, MA_NHOM } from '../../../constants';
import { getLocalStorage } from '../../../utils';
interface TypeKH {
  key: number
  maKhoaHoc: string
  tenKhoaHoc: string
  hinhAnh: string
  luotXem: string
  nguoiTao: string

}

// function ListKhoaHoc(props: any) {
//   const { setPage, setMaKhoaHoc } = props
//   const [data, setData] = useState<TypeKH[]>([]);
//   const [searchResults, setSearchResults] = useState<TypeKH[]>([]);
//   const [searchText, setSearchText] = useState<string>()
//   const [notFound, setNotFound] = useState(false);

//   const maNhom = getLocalStorage(MA_NHOM)
//   console.log(maNhom)

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await layDanhSachKhoaHoc(maNhom);
//       setData(data);
//     };

//     fetchData();
//   }, [maNhom]);

//   useEffect(() => {
//     let filteredData = [];
//     if (searchText) {
//       filteredData = data.filter(item => {
//         return item.tenKhoaHoc.includes(searchText);
//       });
//       if (filteredData.length === 0) {
//         setNotFound(true);
//       }
//       setSearchResults(filteredData);
//     }
//     else {
//       setSearchResults(data);
//     }
//   }, [searchText]);

//   const buttonXoaKhoaHoc = async (record: TypeKH) => {
//     try {
//       const response = await xoaKhoaHoc(record.maKhoaHoc);

//       if (response && response.data === API_RESPONSE.huyThanhCong) {
//         toast.success(response.data, ALERT_CONFIG)
//       }
//       else {
//         toast.error(API_RESPONSE.khongTheHuy, ALERT_CONFIG)
//       }
//       const data = await layDanhSachKhoaHoc(maNhom);
//       setData(data);
//     } catch (error) {
//       console.log(error);

//     }
//   }

//   let dataSource: TypeKH[] = (data ?? []).map((item: any, index) => {
//     const dataDetail: TypeKH = {
//       key: index,
//       maKhoaHoc: item?.maKhoaHoc,
//       tenKhoaHoc: item?.tenKhoaHoc,
//       hinhAnh: item?.hinhAnh,
//       luotXem: item?.luotXem,
//       nguoiTao: item?.nguoiTao.hoTen,
//     }
//     return dataDetail;
//   })
//   if (searchResults.length > 0) {
//     dataSource = searchResults;
//     console.log('if: ', dataSource)
//   } else {
//     dataSource = data;
//     console.log('else: ', dataSource)
//   }


//   const columns = [
//     {
//       title: 'Mã khóa học',
//       dataIndex: 'maKhoaHoc',
//       key: 'maKhoaHoc',
//     },
//     {
//       title: 'Tên khóa học',
//       dataIndex: 'tenKhoaHoc',
//       key: 'tenKhoaHoc',
//     },
//     {
//       title: 'Hình ảnh',
//       dataIndex: 'hinhAnh',
//       key: 'hinhAnh',
//       render: (hinhAnh: string) => (
//         <img src={hinhAnh} style={{ width: '70px' }} />
//       ),
//     },
//     {
//       title: 'Lượt xem',
//       dataIndex: 'luotXem',
//       key: 'luotXem',
//     },
//     {
//       title: 'Người tạo',
//       dataIndex: 'nguoiTao',
//       key: 'nguoiTao',

//     },
//     {
//       title: 'Thao tác',
//       dataIndex: 'thaoTac',
//       key: 'thaoTac',
//       render: (_: any, record: TypeKH) => (
//         <Space>
//           <Button onClick={() => {
//             const maKhoaHoc = record.maKhoaHoc;
//             setPage(isPage.ghiDanh)
//             setMaKhoaHoc(maKhoaHoc)
//           }} type='primary'>
//             Ghi danh
//           </Button>

//           <Button type="primary" ghost>Sửa</Button>
//           <Button onClick={() => buttonXoaKhoaHoc(record)} type="primary" danger>Xóa</Button>
//         </Space>
//       ),
//     },

//   ];
//   return (
//     <div>
//       <p className={css['ds-kh']}>Danh sách khóa học</p>
//       <p className={css['add-kh']}
//         onClick={() => {
//           setPage(isPage.add)
//         }}>Thêm khóa học</p>
//       <div className={css['search-kh']}>
//         <Input
//           className={css['header__search']}
//           placeholder='Nhập tên khóa học cần tim'
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//       </div>
//       <div className={css['table-kh']}>
//         {
//           notFound && <p>Không tìm thấy kết quả</p>
//         }

//         {
//           !notFound &&
//           <Table
//             dataSource={dataSource}
//             columns={columns}
//           />
//         }

//       </div>
//     </div>
//   )
// }

// ... (your imports and other code)

function ListKhoaHoc(props: any) {
  const { setPage, setMaKhoaHoc } = props;
  const [data, setData] = useState<TypeKH[]>([]);
  const [searchResults, setSearchResults] = useState<TypeKH[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false); // New state to track no results

  const maNhom = getLocalStorage(MA_NHOM);

  useEffect(() => {
    const fetchData = async () => {
      const data = await layDanhSachKhoaHoc(maNhom);
      setData(data);
    };

    fetchData();
  }, [maNhom]);

  useEffect(() => {
    if (searchText) {
      const filteredData = data.filter((item) =>
        item.tenKhoaHoc.includes(searchText)
      );
      setSearchResults(filteredData);
      setNoResults(filteredData.length === 0); 
    } else {
      setSearchResults([]);
      setNoResults(false); 
    }
  }, [searchText, data]);

  const buttonXoaKhoaHoc = async (record: TypeKH) => {
    try {
      const response = await xoaKhoaHoc(record.maKhoaHoc);

      if (response && response.data === API_RESPONSE.huyThanhCong) {
        toast.success(response.data, ALERT_CONFIG);
      } else {
        toast.error(API_RESPONSE.khongTheHuy, ALERT_CONFIG);
      }
      const newData = await layDanhSachKhoaHoc(maNhom);
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  let dataSource: TypeKH[] = [];
  if (searchResults.length > 0) {
    dataSource = searchResults;
  } else {
    dataSource = data;  
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

  return (
    <div>
      <p className={css["ds-kh"]}>Danh sách khóa học</p>
      <p
        className={css["add-kh"]}
        onClick={() => {
          setPage(isPage.add);
        }}
      >
        Thêm khóa học
      </p>
      <div className={css["search-kh"]}>
        <Input
          className={css["header__search"]}
          placeholder="Nhập tên khóa học cần tìm"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {noResults ? <p>Không tìm thấy kết quả</p> : (
        <div className={css["table-kh"]}>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      )}

    </div>
  );
}

export default ListKhoaHoc;

