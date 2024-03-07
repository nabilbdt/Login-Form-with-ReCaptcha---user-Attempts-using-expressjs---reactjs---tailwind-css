import React, { useState } from 'react';
import http from './services/http-common';
import ReCaptcha, { ReCAPTCHA } from 'react-google-recaptcha';
function LoginForm() {
    
    const [captchaValue,setCaptchaValue]=useState("");
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
            const response = await http.post('/validate-captcha',{captchaValue});
            console.log(response.data);
           // window.location.href = '/dashboard';
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <ReCaptcha
                    sitekey='6Lcd_o4pAAAAAP5luOZxHfPf5u5fwA3uBew1SQte' 
                    onChange={handelcaptchavalue}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;