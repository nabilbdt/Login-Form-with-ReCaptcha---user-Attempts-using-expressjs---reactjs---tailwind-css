import React, { useState } from 'react';
import http from './services/http-common';
import ReCaptcha, { ReCAPTCHA } from 'react-google-recaptcha';
function LoginForm() {

    const [captchaValue, setCaptchaValue] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handelcaptchavalue = (value) => {
        setCaptchaValue(value);
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await http.post('/login', { email, password });
            console.log(captchaValue)
            const response = await http.post('/validate-captcha', { captchaValue });
            console.log(response.data);
            // window.location.href = '/dashboard';
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div>
                <h1 className='text-center text-2xl text-blue-700'>Login</h1>
                {error && <p className='text-center text-xl text-red-600'>{error}</p>}
                <form onSubmit={handleLogin} >
                    <div className='relative my-4'>
                        <label className='font-semibold'>Email:</label>
                        <input className='block w-80 px-4 py-2.5' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='relative my-4'>
                        <label className='font-semibold'>Password:</label>
                        <input className='block w-80 px-4 py-2.5' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    </div>
                    <ReCaptcha
                        sitekey='6Lcd_o4pAAAAAP5luOZxHfPf5u5fwA3uBew1SQte'
                        onChange={handelcaptchavalue}
                    />
                    <button className='my-7 rounded-xl bg-blue-700 text-xl w-80 px-4 py-2.5' type="submit">Login</button>
                    <h1 className='text-center text-0.5xl text-blue-300'>By NABIL</h1>
                </form>
            </div>
        </div>


    );
}

export default LoginForm;