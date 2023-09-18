import ButtonQT from '../../components/button'
import css from './profile.module.scss'
import InputForm from '../../components/input'

function Profile() {
  return (
    <div className={css['form-container']}>
      <form className={css['profile-form']}>
        <div className={css['button-profile']}>
          <ButtonQT title='submit' />
        </div>
        <InputForm placeholder='ho ten' />
      </form>
    </div>
  )
}

export default Profile
