import './index.scss'
import { useState, useEffect } from 'react'
import Container from './../Container/Container'
import { Select, MenuItem, Typography, Button, TextField, InputLabel, Input } from '@material-ui/core'
import Navbar from './../Navbar/Navbar'
import { useHistory } from 'react-router-dom'
import Alert from './../Alert/Alert'
import Axios from './../api/server'

export default function AddUser(props:any) {

  const history = useHistory()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [address, setAddress] = useState('')
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<string>('')


  useEffect(() => {
    const id = props.match.params.id
    const fetchData = async () => {
      try {
        const res = await Axios.get('/api/v1/admin/users/' + id, config)
        setName(res.data.data.name)
        setEmail(res.data.data.email)
        setPhone(res.data.data.phone)
        setRole(res.data.data.role)
        setAddress(res.data.data.address)
      } catch (err) {
        console.log(err)
      }
    }
    if (id) {
      setIsEdit(true)
      fetchData()
    }

  }, [])
  const handleInputChange = (setFunction : Function , value : string) => {
    setFunction(value)
  }

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }

  const onFormSubmit = async (e : React.SyntheticEvent) => {
    e.preventDefault()
    const data = { name, email, password, phone, role, address }
    try {
      if (isEdit) {
        const res = await Axios.patch('/api/v1/admin/users/' + props.match.params.id, data, config)
        if (res.status === 200) {
          history.push('/users')
        }
      } else {
        const res = await Axios.post('/api/v1/admin/auth/signup', data, config)
        if (res.status === 201) {
          history.push('/users')
        }
      }
    } catch (err) {
      setOpenAlert(true)
      setMessage('Cannot Perform Action')
      setSeverity('error')
    }
  }
  return (
    <>
      <Navbar />
      <Alert openAlert={openAlert} setOpenAlert={setOpenAlert} message={message} severity={severity} />
      <Container>
        <form autoComplete='false' onSubmit={onFormSubmit}>
          <Typography className='heading' color='primary' variant='h2'>{isEdit ? 'Update User' : 'Add User'}</Typography>
          <div className='input-wrapper'>
            <TextField className='input' label='Name'  variant="outlined" value={name} onChange={(e) => { handleInputChange(setName, e.target.value as string) }}/>
          </div>
          <div className='input-wrapper'>
            <TextField className='input' label='Email'  variant="outlined" value={email} onChange={(e) => { handleInputChange(setEmail, e.target.value as string) }}/>
          </div>
          <div className='input-wrapper'>
            <TextField className='input' label='Address'  variant="outlined" value={address} onChange={(e) => { handleInputChange(setAddress, e.target.value as string) }} />
          </div>
          {!isEdit ?
            <div className='input-wrapper'>
              <TextField type='password' className='input' label='Password'  variant="outlined" value={password} onChange={(e) => { handleInputChange(setPassword, e.target.value as string) }}/>
            </div> : ''}
          <div className='input-wrapper'>
            <TextField className='input' label='Phone'  variant="outlined" value={phone} onChange={(e) => { handleInputChange(setPhone, e.target.value as string) }}/>
          </div>
          <div className='input-wrapper'>
            <InputLabel id='type-label'>Role</InputLabel>
            <Select value={role} labelId='type-label' className='input' onChange={(e) => { handleInputChange(setRole, e.target.value as string) }}>
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='co-admin'>Co-Admin</MenuItem>
            </Select>
          </div>
          <div className='btn-wrapper'>
            <Button type='submit' className='btn' variant='contained' size='large' color='primary'>{isEdit ? 'Update' : 'Submit'}</Button>
          </div>
        </form>
      </Container>
    </>
  )
}
