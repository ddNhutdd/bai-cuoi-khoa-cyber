import { Button, Space, Table, Input } from "antd";
import { useEffect, useState } from 'react'
import { ghiDanhKhoaHoc, huyGhiDanh, layDanhSachChoXetDuyet, layDanhSachChuaGhiDanh, layDanhSachHocVienKhoaHoc, timKiemKhoaHoc } from "../../../services/khoa-hoc.service";
import css from './ghidanh.module.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ALERT_CONFIG, API_RESPONSE } from "../../../constants";
const { Search } = Input

interface TypeKH {
    key: number
    taiKhoan: string
    biDanh: string
    hoTen: string
    actionType: 'Chờ xét duyệt' | 'Học viên khóa học' | 'Ghi danh';
}

function GhiDanh(props: any) {
    const { maKhoaHoc } = props
    const [dataChoXacThuc, setDataChoXacThuc] = useState([]);
    const [dataLayDS, setDataLayDS] = useState([]);
    const [dataChuaGhiDanh, setdataChuaGhiDanh] = useState([]);

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
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleSearch = (value: any) => {
        timKiemKhoaHoc(value, 1, 10)
            .then(result => {
                console.log(result)
            })
    }



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
                                    <Button type='primary'>Xác thực</Button>
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
                else {

                }
            }


        },



    ];
    return (
        <div>
            <div className={css['search-ghidanh']}>
                <Search
                    className={css['header__search']}
                    placeholder='Nhập tên học viên cần tim'
                    enterButton
                    onSearch={handleSearch}
                />
                <Button type='primary'>Ghi danh</Button>
            </div>

            <div className={css['table-cho-xthuc']}>
                <p className={css['cho-xac-thuc']}> Học viên chờ xác thực</p>
                <div>
                    <Table dataSource={dataSourceChoXacThuc} columns={columns} />
                </div>
            </div>
            <div className={css['table-dshv']}>
                <p className={css['ds-hv']}> Học viên khóa học</p>
                <div>
                    <Table dataSource={dataSourceLayDS} columns={columns} />
                </div>
            </div>

            <div className={css['table-dshv']}>
                <p className={css['ds-hv']}> Học viên chưa ghi danh</p>
                <div>
                    <Table dataSource={dataSourceChuaGhiDanh} columns={columns} />
                </div>
            </div>

            <ToastContainer
                position='top-center'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </div>
    )
}

export default GhiDanh
