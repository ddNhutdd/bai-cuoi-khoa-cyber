export default function ThemSuaNguoiDung(props:any) {
  const {setShow} = props
  return (
    <button onClick={()=>{
      setShow(0)
    }}>button </button>
  )
}
