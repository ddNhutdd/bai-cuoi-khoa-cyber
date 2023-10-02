import { Button, Space, Table } from "antd";
import { useEffect, useState } from 'react'
import { layDanhSachChoXetDuyet, layDanhSachHocVienKhoaHoc } from "../../../services/khoa-hoc.service";
import css from './ghidanh.module.scss'

interface TypeKH {
    key: number
    taiKhoan: string
    biDanh: string
    hoTen: string

}

function GhiDanh(props: any) {
    const { maKhoaHoc } = props
    const [dataChoXacThuc, setDataChoXacThuc] = useState([]);
    const [dataLayDS, setDataLayDS] = useState([]);
    // useEffect(() => {
    //     const fetchDataChoXet = async () => {
    //         try {
    //             const response = await layDanhSachChoXetDuyet(maKhoaHoc);
    //             if (response && response.data) {
    //                 // Trích xuất dữ liệu từ AxiosResponse
    //                 const responseData = response.data;
    //                 setDataChoXacThuc(responseData);
    //             }
    //         } catch (error) {
    //             console.error("Lỗi khi lấy dữ liệu từ API: ", error);
    //         }
    //     };

    //     fetchDataChoXet();
    // }, [maKhoaHoc]);
    
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
        fetchDataChoXet();
        fetchDataLayDS();
    }, [maKhoaHoc]);

    const dataSourceChoXacThuc: TypeKH[] = Array.isArray(dataChoXacThuc) ? dataChoXacThuc.map((item: any, index) => {
        const dataDetail: TypeKH = {
            key: index,
            taiKhoan: item?.taiKhoan,
            biDanh: item?.biDanh,
            hoTen: item?.hoTen,
        }
        return dataDetail;
    }) : [];
    const dataSourceLayDS: TypeKH[] = Array.isArray(dataLayDS) ? dataLayDS.map((item: any, index) => {
        const dataDetail: TypeKH = {
            key: index,
            taiKhoan: item?.taiKhoan,
            biDanh: item?.biDanh,
            hoTen: item?.hoTen,
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
            title: 'Thao tac',
            dataIndex: 'thaoTac',
            key: 'thaoTac',
            render: () => (
                <Space>
                    <Button type='primary'>Xác thực</Button>
                    <Button type="primary" danger>Hủy</Button>
                </Space>
            ),
        },

    ];
    return (
        <div>
            <p>Ghi danh</p>
            <hr />
            <div className={css['table-cho-xthuc']}>
                <p className={css['cho-xac-thuc']}> Học viên chờ xác thực</p>
                <div>
                    <Table dataSource={dataSourceChoXacThuc} columns={columns} />
                </div>
            </div>
            <div className={css['table-dshv']}>
            <p className={css['ds-hv']}> Học viên khoa hoc</p>
                <div>
                    <Table dataSource={dataSourceLayDS} columns={columns} />
                </div>
            </div>

        </div>
    )
}

export default GhiDanh
