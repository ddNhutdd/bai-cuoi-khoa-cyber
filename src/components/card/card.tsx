import { useState } from 'react';
import css from './card.module.scss'
import { StarRating } from './starRating/star-rating'
import { Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { ALERT_CONFIG, COMMON_MESSAGE } from '../../constants';

export default function CardCyber(props: any) {
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate()
    const { item, isProfilePage, onDelete, taiKhoan } = props
    const styleCard: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
    const buttonDangKiHandleClick = () => {
        navigate('/chitiet/' + item.maKhoaHoc);
    }
    const handleDeleteClick = async () => {
        try {
            await onDelete(item.maKhoaHoc, taiKhoan);
            toast.success(COMMON_MESSAGE.xoaThanhCong, ALERT_CONFIG)
            setTimeout(() =>{
                setIsDeleted(true);
            }, 3000)
            
        } catch (error) {
            console.log(error)
        }
    };
    if (isDeleted) {
        return null;
    }
    return (
        <Card
            hoverable={false}
            style={styleCard}
            cover={
                <img
                    alt='...'
                    src={item.hinhAnh}
                />
            }
        >
            <h3>{item.tenKhoaHoc}</h3>
            <div className={css['card__content']}>
                <StarRating
                    totalStars={5}
                    selectedStars={4}
                    onRate={() => {
                        //
                    }}
                />
                <p>(1.593)</p>
            </div>
            <div className={css['card__action']}>
                {isProfilePage ? (
                    <Button onClick={handleDeleteClick} type="primary" danger>Xóa</Button>
                ) : (
                    <Button type='primary' onClick={buttonDangKiHandleClick}>ĐĂNG KÍ</Button>
                )
                }
            </div>
        </Card>
    )
}
