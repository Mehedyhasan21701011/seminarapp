import React from 'react'
import './Footer.css'

import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {
    return (
        <div className='footer' style={{ height: '400px' }}>
            <div>
                <div className="contact-social" >
                    <a href='#home' className='social-icon'><TwitterIcon style={{ fontSize: 40, color: "rgb(283,83,75)" }} /></a>
                    <a href='#home' className='social-icon'><LinkedInIcon style={{ fontSize: 40, color: "rgb(283,83,75)" }} /></a>
                    <a href='#home' className='social-icon'><TelegramIcon style={{ fontSize: 40, color: "rgb(283,83,75)" }} /></a>
                    <a href='#home' className='social-icon'><InstagramIcon style={{ fontSize: 40, color: "rgb(283,83,75)" }} /></a>
                </div>
            </div>
            <div className='copyright-details'>
                <p className='footer-copyright'>&#169; 2020 copyright all right reserved<br /><span>Designed with ❤️ by Pranavdhar Reddy</span></p>
            </div>
        </div>
    )
}

export default Footer