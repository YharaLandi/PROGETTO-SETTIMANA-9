const MyFooter = () => (
  <footer className="bg-dark netflix-footer">
    <div className="social-icons">
      <a href="#facebook" aria-label="Facebook">f</a>
      <a href="#instagram" aria-label="Instagram">◎</a>
      <a href="#twitter" aria-label="Twitter">𝕏</a>
      <a href="#youtube" aria-label="YouTube">▶</a>
    </div>
    <div className="footer-links">
      <a href="#audio">Audio and Subtitles</a>
      <a href="#audio-description">Audio Description</a>
      <a href="#help">Help Center</a>
      <a href="#gift-cards">Gift Cards</a>
      <a href="#media">Media Center</a>
      <a href="#investor">Investor Relations</a>
      <a href="#jobs">Jobs</a>
      <a href="#terms">Terms of Use</a>
      <a href="#privacy">Privacy</a>
      <a href="#legal">Legal Notices</a>
      <a href="#cookie">Cookie Preferences</a>
      <a href="#corporate">Corporate Information</a>
      <a href="#contact">Contact us</a>
    </div>
    <button className="service-code">Service Code</button>
    <p className="copyright">
      <strong>EPICODE</strong> - Copyright {new Date().getFullYear()}
    </p>
  </footer>
)

export default MyFooter