import { FC } from "react";
import "./footer.scss";


export const Footer:FC = () => {
    return (
        <footer>
            <div className="footer">
                <div className="footer__text">
                    <div className="social">
                        <div className="social__text">
                            <a>Social network</a><br /><br />
                            <div className="container__for__social">
                                <img src="/static/frontend/img/index/vk.png"/>
                                <a>Vkontakte</a>
                            </div>
                            <div className="container__for__social">
                                <img src="/static/frontend/img/index/telegram.png"/>
                                <a href="https://t.me/n3foooooor">Telegram</a>
                            </div>
                        </div>
                    </div>
                    <div className="social">
                        <div className="social__text">
                            <a>Online store</a><br /><br />
                            <li>+79505168534</li><br />
                            <li>+74429489248</li><br />
                        </div>
                    </div>
                    <div className="social">
                        <div className="social__text">
                            <a>Support</a><br /><br />
                            <li>Customer assistance</li><br />
                            <li>Delivery and payment</li><br />
                            <li>Refund</li><br />
                            <li>Loyalty Program</li><br />
                            <li>Partners</li>
                        </div>
                    </div>
                    <div className="social">
                        <div className="social__text">
                            <a>Information</a><br/><br />
                            <li>Contacts</li><br />
                            <li>The shops</li><br />
                            <li>The blog</li><br />
                            <li>Job openings</li><br />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="bottom__imgs" >
                    <span><img loading="lazy" src="https://brandshop.ru/assets/images/footer-icons/mir.svg"/></span>
                    <span><img loading="lazy" src="https://brandshop.ru/assets/images/footer-icons/visa.svg"/></span>
                    <span><img loading="lazy" src="https://brandshop.ru/assets/images/footer-icons/mastercard.svg"/></span>
                    <span><img loading="lazy" src="https://brandshop.ru/assets/images/footer-icons/tinkoff.svg"/></span>
                    <span><img loading="lazy" src="https://brandshop.ru/assets/images/footer-icons/sberpay.svg"/></span>
                    <span><img loading="lazy" src="https://brandshop.ru/assets/images/footer-icons/yapay.svg"/></span>
                    <span><img loading="lazy" src="https://brandshop.ru/assets/images/footer-icons/ems.svg"/></span>
                    <span><img loading="lazy" src="https://brandshop.ru/assets/images/footer-icons/cdek.svg"/></span>
                </div>
                <div className="bottom__text">
                    <span><a>Ⓒ SODASTOCK MARKET, 2023</a></span>
                    <a>User agreement</a>
                    <a>Privacy Policy</a>
                    <a>Site map</a>
                </div>
            </div>
        </footer>
    )
}
