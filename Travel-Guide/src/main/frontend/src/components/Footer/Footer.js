import "./Footer.css"
function Footer(){
    return(
        <>
        <div className="footer-basic">
            <footer>
                <div className="social"><a href=""><i className="fab fa-twitter"></i></a><a href=""><i className="fab fa-instagram"></i></a><a href=""><i className="fab fa-snapchat-ghost"></i></a><a href=""><i className="fab fa-facebook-f"></i></a></div>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="">Home</a></li>
                    <li className="list-inline-item"><a href="">Services</a></li>
                    <li className="list-inline-item"><a href="">About</a></li>
                    <li className="list-inline-item"><a href="">Terms</a></li>
                    <li className="list-inline-item"><a href="">Privacy Policy</a></li>
                </ul>
                <p className="copyright">Travel Guide © 2021</p>
            </footer>
        </div>
        </>
    )
}
export default Footer;