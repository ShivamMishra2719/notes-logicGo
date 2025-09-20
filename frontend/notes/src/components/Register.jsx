import React, { useState } from 'react'
import { apiRegister } from '../api'

import './Register.css'

export default function Register({ onRegisterMsg }){
const [username,setUsername]=useState('');
const [password,setPassword]=useState('');

const submit = async e =>{
e.preventDefault();
const res = await apiRegister(username,password);
if (res?.message) onRegisterMsg(res.message);
else onRegisterMsg('registered (check console)');
}

return (
    <div className='Register'>
<form onSubmit={submit} >
<h3>Register</h3>
<input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} required />
<br/>
<input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
<br/>
<button type="submit" className='btn'>Register</button>
</form>

    </div>
)
}