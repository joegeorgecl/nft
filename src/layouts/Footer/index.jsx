import React from "react";

import data from '../../data/data-layouts/data-Footer.json'


const ContactInfo = ({children , title}) => (
  <div className="contact_info text-center">
    <h5>{title}</h5>
    {children}
  </div>
)

function Footer(){

  return(
    <footer className="footer-area bg-img">
      <div className="footer-content-area ">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-12 col-md-5">
              <div className="footer-copywrite-info">
                {/* Copywrite */}
                <div className="copywrite_text wow fadeInUp" data-wow-delay="0.2s">
                  <div className="footer-logo">
                    <a href="/#">NFT STORE.</a>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ducimus voluptatibus neque illo id repellat quisquam? Autem expedita earum quae laborum ipsum ad, a eaque officiis eligendi blanditiis odio necessitatibus.</p>
                </div>
                {/* Social Icon */}
                <div className="footer-social-info wow fadeInUp" data-wow-delay="0.4s">
                  {data[0]?.footerIconList?.map((item , key) => <a href="/#" aria-label={item.text} key={key}><i className={item.text} aria-hidden="true" /></a>)}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-7">
              {/* Content Info */}
              <div className="contact_info_area d-sm-flex justify-content-between">
                <ContactInfo title="NAVIGATE">
                  {data[0]?.NAVIGATE?.map((item , key) => <a href key={key}><p>{item.text}</p></a>)}
                </ContactInfo>

                <ContactInfo title="PRIVACY & TOS">
                  {data[0]?.PRIVACY?.map((item , key) => <a href key={key}><p>{item.text}</p></a>)}
                </ContactInfo>

                <ContactInfo title="CONTACT US">
                  {data[0]?.CONTACT?.map((item , key) =><p key={key}>{item.text}</p>)}
                </ContactInfo>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default React.memo(Footer)
