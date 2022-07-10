import { useState } from 'react';
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

function Home() {

    //State Managers
    const [name, setName] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    //Listeners
    function handleChange(e) {
        setName(e.target.value);
    }

    function handleCaptcha(value) {
        setCaptcha(value);
        console.log(value);
    }

    //Here we send a JSON object with our name(optional) and the captcha code from the ReCAPTCHA component.
    async function postName(e) {
        e.preventDefault();

        try {
            fetch('http://localhost:3000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, captcha })
            })
                .then((res) => res.json())
                .then((data) => setIsVerified(data.success))

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <form id="form" onSubmit={postName}>
            <label>Name: </label>
            <input type="text" name='name' onChange={handleChange} value={name}></input>
            <br />
            <ReCAPTCHA
                sitekey='6Le7mRIgAAAAAMWnwipdzu-qgiKpMe6t_ww_sDmK'
                onChange={handleCaptcha}
            />
            {/* 
            
            We can either use this div from Google Docs, requires our sitekey, and we need to select
            somehow a "hidden" id so we can get the recaptcha code string and post it.
            
            Or...

            We can use this lib called react-google-recatpcha, it's a wrapped component that only needs
            a sitekey attribute, and comes with a onChange listener that provides the recaptcha string.
            */}
            {/* <div className="g-recaptcha" data-sitekey="6Le7mRIgAAAAAMWnwipdzu-qgiKpMe6t_ww_sDmK"></div> */}
            {
                isVerified && <p>You passed the bot test!</p>
            }
            <br />
            <button type='submit' style={isVerified ? { color: 'green' } : { color: 'red' }}>Send</button>
            <br />
            <br />
            {
                isVerified && <Link to='login'>Go to Login</Link>
            }
        </form>
    )
}

export default Home;