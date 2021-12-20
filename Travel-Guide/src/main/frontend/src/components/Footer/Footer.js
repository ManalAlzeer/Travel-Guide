import "./Footer.css"
function Footer(){
    return(
        <>
        <div class="footer-basic">
            <footer>
                <div class="social"><a href><i class="fab fa-twitter"></i></a><a href><i class="fab fa-instagram"></i></a><a href><i class="fab fa-snapchat-ghost"></i></a><a href><i class="fab fa-facebook-f"></i></a></div>
                <ul class="list-inline">
                    <li class="list-inline-item"><a href>Home</a></li>
                    <li class="list-inline-item"><a href>Services</a></li>
                    <li class="list-inline-item"><a href>About</a></li>
                    <li class="list-inline-item"><a href>Terms</a></li>
                    <li class="list-inline-item"><a href>Privacy Policy</a></li>
                </ul>
                <p class="copyright">Travel Guide © 2021</p>
            </footer>
        </div>
        </>
    )
}
export default Footer;