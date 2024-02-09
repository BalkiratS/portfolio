import React, { useState } from "react";
import "./Footer.css"
import { FaLinkedin, FaGithub, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";

const Footer = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.name) {
            alert('Please enter your Name')
            return;
        }

        if (!formData.email) {
            alert("Please enter your email")
            return
        }

        if (!formData.message) {
            alert('Please enter the Message')
            return
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}message`, formData, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
            alert(response.data); // Log the response from the backend
            setFormData({
                name: '',
                email: '',
                message: ''
            })

          } catch (error) {
            console.error('Error sending message:', error);
          }

    }

    

    return(
        <footer id="contact" className="footer">
            <div className="links-section">
                <h1>Get In Touch</h1>
                <div className="contact-info">

                    <div className="contact-phone" >
                        <FaPhoneAlt className="icon" size='2em' color="white" onClick={() => window.location.href = "tel:+17802988002"}/>
                        <span>+1 (780) 298 8002</span>
                    </div>

                    <div className="contact-email" onClick={() => window.location.href = 'mailto:balkiratsingh1301@gmail.com'} >
                        <MdEmail className="icon" size='2em' color="white"/>
                        <span>balkiratsingh1301@gmail.com</span>
                    </div>

                    <div className="linkedin" onClick={() => window.open('https://www.linkedin.com/in/balkirat-singh-padda-810b95218/', '_blank')}>
                        <FaLinkedin className="icon" size='2em' color="white" />
                        <span>LinkedIn</span>
                    </div>

                    <div className="github" onClick={() => window.open('https://github.com/BalkiratS', '_blank')}>
                        <FaGithub className="icon" size='2em' />
                        <span>GitHub</span>
                    </div>

        
                </div>
                
                
            </div>
            
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="name-email">
                        <input
                            type='text'
                            value={formData.name}
                            placeholder="First Name" 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}/>

                        <input
                            type='email'
                            value={formData.email}
                            placeholder="Email Address" 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                    </div>

                    <textarea
                        value={formData.message}
                        rows={10}
                        cols={50}
                        placeholder="Enter Your Message..." 
                        onChange={(e) => setFormData({...formData, message: e.target.value})}/> 

                    <button type='submit' className="send-message">Send Message</button>
                
                </form>
        </footer>
    )
}

export default Footer;