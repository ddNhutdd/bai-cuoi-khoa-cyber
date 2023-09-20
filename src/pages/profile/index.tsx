import ButtonQT from '../../components/button'
import css from './profile.module.scss'
import InputForm from '../../components/input'
import NoteIcon from '../../assets/icons/note.icon'
import ListCard from '../../components/list-card/list-card'

function Profile() {
  return (
    <div className={css['form-container']}>
      <form className={css['profile-form']}>
        <div className={css['h2-profile']}>
          <h2>Trang cá nhân</h2>
          <span><NoteIcon /></span>
        </div>
        <div className={css['flex-container']}>

          {/* Phần 40% là hình ảnh */}
          <div className={css['image-container']}>
            <img className={css['img-cyber']} src="https://cybersoft.edu.vn/wp-content/uploads/2022/08/chudeFE6.svg" />
          </div>

          {/* Phần 60% là 6 InputForm */}
          <div className={css['input-forms-container']}>
            <div className={css['input-row']}>
              <div className={css['input-ele']}>
                <InputForm placeholder='Họ và tên' />
              </div>
              <div className={css['input-ele']}>
                <InputForm placeholder='Tài khoản' />
              </div>
            </div>

            <div className={css['input-row']}>
              <div className={css['input-ele']}>
                <InputForm placeholder='Email' />
              </div>
              <div className={css['input-ele']}>
                <InputForm placeholder='Mật khẩu' />
              </div>
            </div>

            <div className={css['input-row']}>
              <div className={css['input-ele']}>
                <InputForm placeholder='Mã nhóm' />
              </div>
              <div className={css['input-ele']}>
                <InputForm placeholder='Điện thoại' />
              </div>
            </div>

            <div className={css['button-profile']}>
              <ButtonQT title='Cập nhật' />
            </div>
            
          </div>
        </div>
        <div className={css['h2-profile']}>
          <h2>Khóa học đã đăng ký</h2>
          <span><NoteIcon /></span>
        </div>
        <div className={css['input-search']}>
          <InputForm placeholder='Tìm kiếm khóa học'/>
        </div>
        <div>
          <ListCard/>
        </div>
      </form>
    </div>
  )
}

export default Profile
