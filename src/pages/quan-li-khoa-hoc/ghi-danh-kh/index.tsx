import { Button, Space, Table, Input } from "antd";
import { useEffect, useState } from 'react'
import { ghiDanhKhoaHoc, huyGhiDanh, layDanhSachChoXetDuyet, layDanhSachChuaGhiDanh, layDanhSachHocVienKhoaHoc} from "../../../services/khoa-hoc.service";
import css from './ghidanh.module.scss'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ALERT_CONFIG, API_RESPONSE } from "../../../constants";
import { isPage } from "..";

interface TypeKH {
    key: number
    taiKhoan: string
    biDanh: string
    hoTen: string
    actionType: 'Chờ xét duyệt' | 'Học viên khóa học' | 'Ghi danh';
}

function GhiDanh(props: any) {
    const { maKhoaHoc, setPage } = props
    const [dataChoXacThuc, setDataChoXacThuc] = useState<TypeKH[]>([]);
    const [dataLayDS, setDataLayDS] = useState<TypeKH[]>([]);
    const [dataChuaGhiDanh, setdataChuaGhiDanh] = useState([]);
    const [searchText1, setSearchText1] = useState('');
    const [searchText2, setSearchText2] = useState('');     // State để lưu từ khóa tìm kiếm
    const [searchText3, setSearchText3] = useState('');
    const [results1, setResults1] = useState<TypeKH[]>([]);
    const [results2, setResults2] = useState<TypeKH[]>([]); // State để lưu KQ tìm kiếm
    const [results3, setResults3] = useState<TypeKH[]>([]);
    
    useEffect(() => {
        const fetchDataChoXet = async () => {
            try {
                const response = await layDanhSachChoXetDuyet(maKhoaHoc);
                if (response && response.data) {
                    // Trích xuất dữ liệu từ AxiosResponse
                    const responseData = response.data;
                    setDataChoXacThuc(responseData);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ API: ", error);
            }
        };

        const fetchDataLayDS = async () => {
            try {
                const response = await layDanhSachHocVienKhoaHoc(maKhoaHoc);
                if (response && response.data) {
                    // Trích xuất dữ liệu từ AxiosResponse
                    const responseData = response.data;
                    setDataLayDS(responseData);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ API: ", error);
            }
        };

        const fetchDataChuaGhiDanh = async () => {
            try {
                const response = await layDanhSachChuaGhiDanh(maKhoaHoc);
                if (response && response.data) {
                    // Trích xuất dữ liệu từ AxiosResponse
                    const responseData = response.data;
                    setdataChuaGhiDanh(responseData);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ API: ", error);
            }
        };

        fetchDataChoXet();
        fetchDataLayDS();
        fetchDataChuaGhiDanh();
    }, [maKhoaHoc]);

    const handleGhiDanh = (record: TypeKH) => {
        if (record.taiKhoan) {
            ghiDanhKhoaHoc(maKhoaHoc, record.taiKhoan)!
                .then(result => {
                    toast.success(API_RESPONSE.gdtc, ALERT_CONFIG);
                    console.log(result)
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }

    const handleCancel = (record: TypeKH) => {
        huyGhiDanh(maKhoaHoc, record.taiKhoan)
            .then(() => {
                toast.success(API_RESPONSE.huyGhiDanh, ALERT_CONFIG);
                // thực hiện xóa sau khi gọi api thành công
                setTimeout(() => {
                    const dataChoXacThucDel = dataChoXacThuc.filter(item => item.hoTen !== record.hoTen)
                    setDataChoXacThuc(dataChoXacThucDel)
                    const dataLayDSDel = dataLayDS.filter(item => item.hoTen !== record.hoTen)
                    setDataLayDS(dataLayDSDel)

                }, 3000)
                
            })
            .catch(error => {
                console.log(error)
            })
    }

    // chức năng tìm kiếm
    useEffect(() => {
        // Tìm trên 3 data source
        const results1: TypeKH[] = dataChoXacThuc.filter((item: any) => item.hoTen.includes(searchText1))
        results1.forEach(item => {
            item.actionType = 'Chờ xét duyệt'
        })
        const results2: TypeKH[] = dataLayDS.filter((item: any) => item.hoTen.includes(searchText2))
        results2.forEach(item => {
            item.actionType = 'Học viên khóa học'
        })
        const results3: TypeKH[] = dataChuaGhiDanh.filter((item: any) => item.hoTen.includes(searchText3))
        results3.forEach(item => {
            item.actionType = 'Ghi danh'
        })

        setResults1(results1);
        setResults2(results2);
        setResults3(results3);

    }, [searchText1, searchText2, searchText3]);

    const dataSourceChoXacThuc: TypeKH[] = Array.isArray(dataChoXacThuc) ? dataChoXacThuc.map((item: any, index) => {
        const actionType = 'Chờ xét duyệt'
        const dataDetail: TypeKH = {
            key: index,
            taiKhoan: item?.taiKhoan,
            biDanh: item?.biDanh,
            hoTen: item?.hoTen,
            actionType: actionType,
        }
        return dataDetail;
    }) : [];
    const dataSourceLayDS: TypeKH[] = Array.isArray(dataLayDS) ? dataLayDS.map((item: any, index) => {
        const actionType = 'Học viên khóa học'
        const dataDetail: TypeKH = {
            key: index,
            taiKhoan: item?.taiKhoan,
            biDanh: item?.biDanh,
            hoTen: item?.hoTen,
            actionType: actionType,
        }
        return dataDetail;
    }) : [];
    const dataSourceChuaGhiDanh: TypeKH[] = Array.isArray(dataChuaGhiDanh) ? dataChuaGhiDanh.map((item: any, index) => {
        const dataDetail: TypeKH = {
            key: index,
            taiKhoan: item?.taiKhoan,
            biDanh: item?.biDanh,
            hoTen: item?.hoTen,
            actionType: 'Ghi danh',
        }
        return dataDetail;
    }) : [];


    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
        },
        {
            title: 'Bí danh',
            dataIndex: 'biDanh',
            key: 'biDanh',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            key: 'hoTen',

        },
        {
            title: 'Thao tác',
            dataIndex: 'thaoTac',
            key: 'thaoTac',
            render: (_: any, record: TypeKH) => {
                const { actionType } = record!;
                if (actionType === 'Chờ xét duyệt' || actionType === 'Học viên khóa học' || actionType === 'Ghi danh') {
                    console.log('actionType (Render):', actionType);
                    return (
                        <Space>
                            {actionType === 'Chờ xét duyệt' ? (
                                <>
                                    <Button onClick={() => handleGhiDanh(record)} type='primary'>Xác thực</Button>
                                    <Button onClick={() => handleCancel(record)} type="primary" danger>Hủy</Button>
                                </>
                            ) : actionType === 'Ghi danh' ? (
                                <Button
                                    type='primary'
                                    onClick={() => handleGhiDanh(record)}>
                                    Ghi danh
                                </Button>
                            ) : (
                                <Button onClick={() => handleCancel(record)} type="primary" danger>Hủy</Button>
                            )}
                        </Space>
                    );
                }
            }
        },
    ];
    return (
        <div>
            <div className={css['tro-lai']} onClick={() => setPage(isPage.list)}>{'<< '}Trở lại danh sách</div>
            <div className={css['table-cho-xthuc']}>
                <div className={css['search-ghidanh']}>
                    <p className={css['cho-xac-thuc']}> Học viên chờ xác thực</p>
                    <Input
                        className={css['ghiDanh__search']}
                        placeholder='Nhập tên học viên cần tim'
                        onChange={e => setSearchText1(e.target.value)}
                        value={searchText1}
                    />
                </div>
                <div>
                    <Table dataSource={searchText1 ? results1 : dataSourceChoXacThuc} 
                    columns={columns} 
                    pagination={{
                        position: ['bottomRight'],
                        pageSize: 5,
                        showSizeChanger: false,
                    }} />
                </div>
            </div>
            <div className={css['table-dshv']}>
                <div className={css['search-ghidanh']}>
                    <p className={css['cho-xac-thuc']}> Học viên khóa học</p>
                    <Input
                        className={css['ghiDanh__search']}
                        placeholder='Nhập tên học viên cần tim'
                        onChange={e => setSearchText2(e.target.value)}
                        value={searchText2}
                    />
                </div>
                <div>
                    <Table dataSource={searchText2 ? results2 : dataSourceLayDS} 
                    columns={columns} 
                    pagination={{
                        position: ['bottomRight'],
                        pageSize: 5,
                        showSizeChanger: false,
                    }}/>
                </div>
            </div>
            <div className={css['table-chuaghidanh']}>
                <div className={css['search-ghidanh']}>
                    <p className={css['cho-xac-thuc']}>Học viên chưa ghi danh</p>
                    <Input
                        className={css['ghiDanh__search']}
                        placeholder='Nhập tên học viên cần tim'
                        onChange={e => setSearchText3(e.target.value)}
                        value={searchText3}
                    />
                </div>
                <div>
                    <Table dataSource={searchText3 ? results3 : dataSourceChuaGhiDanh} 
                    columns={columns} 
                    pagination={{
                        position: ['bottomRight'],
                        pageSize: 5,
                        showSizeChanger: false,
                    }}/>
                </div>
            </div>

        </div >
    )
}

export default GhiDanh
