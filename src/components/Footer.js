import React from 'react'
import { Link } from 'gatsby'

export const Footer = () => {
  return (
    <footer className="footer">
      <section>

        <div class="footer-links"><p><b>Imprint/Impressum</b></p><p>Astrid Günther<br />Sonnenhang 23<br />56729 Kehrig<br />E-Mail: info At-Zeichen astrid-guenther.de</p>
        </div>


        <hr />

        <div class="footer-links"><p><b>Privacy/Datenschutz</b></p>
        <small>Ich erhebe oder speichere keine personenbezogenen Daten über diese Website. Um den Aufruf dieser Seite zu ermöglichen, speichert der Internet-Provider einige Daten in Server-Log-Files, die ein Browser automatisch weiterleitet: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse. Die Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen erlaubt. Meine Blogbeiträge sind mit VG-Wort-Zählpixeln versehen, über die ich die Zugriffe an die Verwertungsgesellschaft Wort (VG Wort) melde. Damit partizipiere ich an den Ausschüttungen der VG Wort, die die gesetzliche Vergütung für die Nutzungen urheberrechtlich geschützter Werke gem. § 53 UrhG sicherstellen. Laut VG Wort wurde das METIS-Zählsystem vom Bayrischen Landesamt für Datenschutzaufsicht geprüft: Bei der Anwendung mittels Zählpixel und Session-Cookies werden Nutzungsdaten und Metadaten der Nutzer verarbeitet, bei den übertragenen Informationen handle es sich aber nicht um datenschutzrechtlich relevante Datenerhebung. Die Datenschutzerklärung der VG Wort steht hier: https://www.vgwort.de/datenschutz.html</small>
        <br /><br /><small>I do not collect or store any personal data via this website. In order to make it possible to call up this page, the internet provider stores some data in server log files that a browser automatically forwards: Browser type and browser version, operating system used, referrer URL, host name of the accessing computer, time of the server request, IP address. The basis for the data processing is Art. 6 (1) DSGVO, which allows the processing of data for the fulfilment of a contract or pre-contractual measures. My blog posts are provided with VG Wort counting pixels, via which I report the hits to the Verwertungsgesellschaft Wort (VG Wort). In this way, I participate in the distributions of the VG Wort, which ensure the legal remuneration for the uses of copyrighted works according to § 53 UrhG. Laut VG Wort wurde das METIS-Zählsystem vom Bayrischen Landesamt für Datenschutzaufsicht geprüft: The application by means of counting pixels and session cookies processes user data and metadata, but the information transmitted is not data collection relevant under data protection law. The privacy policy of VG Wort is available here: https://www.vgwort.de/datenschutz.html</small> 
        </div>

        <hr />

        <nav>
          <small>Donate via </small>
          <a
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=KQMKUVAX5SPVS&amp;source=url"
            rel="nofollow"
          >
            Paypal
          </a>
          <small> or via IBAN: DE96 5001 0517 5416 BIC: INGDDEFFXXX</small>
        </nav>

        <hr />


      </section>
    </footer>
  )
}
