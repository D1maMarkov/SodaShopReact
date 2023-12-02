import React, {FC} from "react";
import "./footer.scss";


export const Footer:FC = () => {
    return (
        <div>
            <footer>
                <div className="footer_text">
                    <div className="social">
                        <div className="social_text">
                            <a>Social network</a><br /><br />
                            <div style={{ height: "20px", marginBottom: "20px" }}>
                                <img style={{ height: "20px", marginRight: "10px" }} src="/static/frontend/img/index/vk.png" />
                                <li style={{ padding: "0px", lineHeight: "17px" }} >Vkontakte</li><br />
                            </div>

                            <div style={{ height: "20px" }}>
                            <img style={{ height: "20px", marginRight: "10px" }} src="/static/frontend/img/index/telegram.png" />
                                <li style={{ padding: "0px", lineHeight: "17px" }}><a style={{ padding: "0px", lineHeight: "17px" }} href="https://t.me/n3foooooor">Telegram</a></li><br />
                            </div>
                        </div>
                    </div>
                    <div className="social">
                        <div className="social_text">
                            <a>Online store</a><br /><br />
                            <li>+79505168534</li><br />
                            <li>+74429489248</li><br />
                        </div>
                    </div>
                    <div className="social">
                        <div className="social_text">
                            <a>Support</a><br /><br />
                            <li>Customer assistance</li><br />
                            <li>Delivery and payment</li><br />
                            <li>Refund</li><br />
                            <li>Loyalty Program</li><br />
                            <li>Partners</li>
                        </div>
                    </div>
                    <div className="social">
                        <div className="social_text">
                            <a>Information</a><br /><br />
                            <li>Contacts</li><br />
                            <li>The shops</li><br />
                            <li>The blog</li><br />
                            <li>Job openings</li><br />
                        </div>
                    </div>
                </div>
            </footer>
            <div className="bottom">
                <div className="bottom_imgs" >
                    <span><img src="https://brandshop.ru/assets/images/footer-icons/mir.svg"/></span>
                    <span><img src="https://brandshop.ru/assets/images/footer-icons/visa.svg"/></span>
                    <span><img src="https://brandshop.ru/assets/images/footer-icons/mastercard.svg"/></span>
                    <span><img src="https://brandshop.ru/assets/images/footer-icons/tinkoff.svg"/></span>
                    <span><img src="https://brandshop.ru/assets/images/footer-icons/sberpay.svg"/></span>
                    <span><img src="https://brandshop.ru/assets/images/footer-icons/yapay.svg"/></span>
                    <span><img src="https://brandshop.ru/assets/images/footer-icons/ems.svg"/></span>
                    <span><img src="https://brandshop.ru/assets/images/footer-icons/cdek.svg"/></span>
                </div>
                <div className="bottom_text">
                    <span><a>Ⓒ SODASTOCK MARKET, 2023</a></span>
                    <a>User agreement</a>
                    <a>Privacy Policy</a>
                    <a>Site map</a>
                </div>
            </div>
        </div>
    )
}