import React, { useState } from 'react'
import { apiLogin } from '../api'
import './Login.css'

export default function Login({ onLogin }){
const [username,setUsername]=useState('');
const [password,setPassword]=useState('');

const submit = async e =>{
e.preventDefault();
const res = await apiLogin(username,password);
if (res?.token){
onLogin(res.token, res.username);
} else {
alert(res?.message || 'login failed');
}
}

return (
    <div className='Login'>

<form onSubmit={submit} style={{ flex:1 }}>
<h3>Login</h3>
<input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} required />
<br/>
<input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
<br/>
<button type="submit" className='btn' >Login</button>
</form>
    </div>
)
}
