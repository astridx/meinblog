# Vorwort

In diesem Buch lernst du die Grundlagen von React. Du erstellst eine reale Anwendung ohne komplizierte Werkzeuge. Ich erkläre dir alles Notwendige --- von der Projekteinrichtung bis zur Veröffentlichung der Anwendung auf einem Webserver. Das Buch enthält Hinweise zu weiterführendem Lesematerial und Übungen am Ende jedes Kapitels. Nachdem du das Buch gelesen hast, hast du die Grundlagen, um deine eigene Anwendung mit React zu erstellen. Und, was heutzutage nicht unwichtig ist: Das Lernmaterial wird von mir und der Community auf dem neuesten Stand gehalten.

Mit diesem Buch biete ich dir eine Basis, bevor du in die vielen Möglichkeiten, die die Community und das Ökosystem bereitstellen, eintauchst. Meine Erklärungen beinhalten nur wenige spezielle Werkzeuge, dafür aber viele Informationen über React selbst. Ich erkläre allgemeine Konzepte, Muster und Best Practice anhand einer realen Anwendung.

Im Wesentlichen lernst du, eine eigene React-Anwendung von Grund auf neu zu erstellen, mit Funktionen wie Paginierung, clientseitiger und serverseitiger Suche und erweiterten Interaktionen wie Sortieren. Ich hoffe, dass meine Begeisterung für React und JavaScript dich ansteckt und dir so den Einstieg erleichtert.

## Über den Autor

Ich bin ein deutscher Software- und Webentwickler und lehre Programmierung --- speziell in JavaScript. Gleichzeitig lerne ich selbst fortwährend weiter. Nachdem ich meinen Master in Informatik erlangte, bildete ich mich weiter fort. Ich sammelte Erfahrungen in der Startup-Welt, in der ich JavaScript sowohl während des Berufslebens und in meiner Freizeit intensiv anwendete. Die lies den Wunsch in mir wachsen, mein Wissen an andere weiterzugeben.

Einige Jahre arbeitete ich als Software-Entwickler eng mit einem Team von Ingenieuren bei einem Unternehmen namens *Small Improvements* zusammen. Die Firma bietet ein [SaaS](https://de.wikipedia.org/wiki/Software_as_a_Service)-Produkt an. Mit dieser Software ist es möglich, Kunden um ein Feeback zu bitten. Die Anwendung wurde mit JavaScript im Frontend und Java im Backend entwickelt. Die erste Version des Frontends von Small Improvements wurde in Java mit dem [Wicket Framework](https://de.wikipedia.org/wiki/Apache_Wicket) und jQuery geschrieben. Als die erste Generation von [SPAs](https://de.wikipedia.org/wiki/Single-Page-Webanwendung) populär wurde, migrierte das Unternehmen für seine Frontend-Anwendung auf Angular 1.x. Nach zwei Jahren wurde klar, dass dies nicht die beste Lösung für die Arbeit mit zustandsintensiven Anwendungen ist. Daher wechselte das Unternehmen zu React und Redux. Diese Entscheidung stellte sich als richtiger heraus und ermöglichte weiterhin eine erfolgreiche Arbeit.

Während der Zeit im Unternehmen schrieb ich regelmäßig Artikel über Webentwicklung auf einer Website. Ich erhielt motivierendes Feedback. Viele lernten mit den von mir geschriebenen Artikeln. Ich verbesserte meinen Schreib- und Unterrichtsstil. Artikel für Artikel erweiterte ich mein Wissen und meine Fähigkeiten. Ich hatte das Gefühl, dass die ersten Artikel zu viele Informationen enthielten und zu komplex waren. Ich verbesserte mich, indem ich mich jeweils auf ein Thema konzentrierte.

Derzeit arbeite ich als selbstständiger Softwareentwickler und Trainer. Es erfüllt mich, zu sehen, wie Studenten und Kunden lernen, indem ich ihnen klare Ziele vorgebe. Weitere Informationen über mich, Möglichkeiten zur Unterstützung oder Infos zu einer Zusammenarbeit findest du auf meiner [Website](https://www.robinwieruch.de/about).

## FAQ

**Wie bekomme ich Updates?**

Ich informiere auf zwei Arten über Aktualisierungen meiner Inhalte. Erfahre Neuigkeiten per E-Mail, indem du [den Newsletter abonnierst](https://www.getrevue.co/profile/rwieruch) oder folge [mir auf Twitter](https://twitter.com/rwieruch). Unabhängig vom Kanal ist es mein Ziel, qualitativ hochwertige Inhalte zu teilen. Sobald du eine Benachrichtigung über eine Änderung erhalten hast, ist eine neue Version auf meiner Website verfügbar.

**Ist das Lernmaterial aktuell?**

Programmierbücher sind oft kurz nach ihrer Veröffentlichung schon veraltet. Da ich dieses Buch als Selfpublisher veröffentliche, ist es mir möglich, es bei Bedarf kurzfristig zu aktualisiere. Immer dann, wenn sich etwas ändert, werde ich das Buch überarbeiten und eine neue Version veröffentlichen.

**Kann ich eine digitale Kopie des Buches erhalten, wenn ich es bei Amazon gekauft habe?**

Erst nachdem du das Buch bei Amazon gekauft hast, stelltest du fest, dass das Buch auf meiner Website in einer digitalen Version verfügbar ist. Da ich Amazon als eine Möglichkeit verwende, für mich zu werben und Inhalte zu monetarisieren, danke ich dir für deine Unterstützung und lade dich ein, dich auf [meiner Website](https://www.robinwieruch.de/) anzumelden. Nachdem du dort ein Konto erstellt hast, schreibe mir eine E-Mail und füge eine Quittung von Amazon bei. Ich werde dann ein digitales Buch für dich freischalten. Mit einem Konto auf meiner Plattform hast du in Zukunft weiterhin Zugriff auf die neueste Version des Buches.

Wenn du ein gedrucktes Buch gekauft hast, notiere bitte deine Lernschritte im Buch. Ich habe mit Absicht die Printausgabe so gestaltet, dass größere Codefragmente genügend Platz bieten, um dir ausreichend Spielraum zum individuellen Arbeiten zu bieten.

**Wie kann ich beim Lesen des Buches Hilfe bekommen?**

Das Buch verbindet eine Gemeinschaft von Lernenden, die sich gegenseitig helfen und  Menschen, die mitlesen. Tritt dieser Community gerne bei. So erhältst du Hilfe. Oder du hilfst anderen. Das gegenseitige Unterstützen hilft dir und anderen dabei, Wissen zu verinnerlichen. Folge der Navigation zu den Kursen auf meiner [Website](https://www.robinwieruch.de/), melde dich dort an und navigiere zum Menüpunkt Community.

**Wie und wo melde ich einen Fehler?**

Wenn du einen Fehler im Code findest, melde dies bitte über Github. Am Ende jedes Abschnitts findest du eine URL zum aktuellen GitHub-Projekt. Bitte eröffne hier ein Issue. 

Du hast einen Fehler im Text der deutschen Übersetzung gefunden? Bitte öffne ein Issue im [Repository der deutschen Übersetzung](https://github.com/the-road-to-learn-react/the-road-to-react-german) oder schreibe eine E-Mail an die Übersetzerin. Kontaktinformationen findest du auf der [Website](https://www.astrid-guenther.de).

Wir sind sehr dankbar für deine Hilfe!

**Kann ich helfen, den Inhalt zu verbessern?**

Wenn du Feedback hast, schreibe mir gerne eine E-Mail und ich werde deine Vorschläge berücksichtigen. Erwarte bitte keine direkte Antwort von mir, denn das ist mir zeitlich nicht immer möglich. Wenn du dir ein Feedback wünschst, dann frage in der Community, siehe "Wie kann ich beim Lesen des Buches Hilfe bekommen?".

**Wie unterstütze ich das Projekt idealerweise?**

Du findest meine Lektionen nützlich und möchtest einen Beitrag leisten? Dann suche bitte auf der [About-Seite meiner Website](https://www.robinwieruch.de/about/) nach Informationen darüber, welche Möglichkeiten es gibt, mich zu unterstützen. In jedem Fall ist hilfreich für potentielle Leser, wenn du darüber informierst, wie meine Bücher dir geholfen haben. Nur mit Unterstützung ist es mir möglich, weiterhin kostenloses Lernmaterial anzubieten.

**Was ist deine Motivation hinter dem Buch?**

Mir ist es wichtig, über aktuelle Themen zu berichten. Ich stoße oft online auf Websites, die nicht aktualisiert werden oder nur einen kleinen Teil eines Themas abdecken. Viele Menschen haben Schwierigkeiten, geeignetes Lernmaterial zu finden. Ich biete aktuelle Inhalte und hoffe, dass ich andere mit meinen Projekten unterstütze, indem ich ihnen Lernmaterial kostenlos zur Verfügung stelle und [etwas zurückgebe](https://www.robinwieruch.de/giving-back-by-learning-react/).

## Für wen ist dieses Buch?

**JavaScript-Anfänger**

JavaScript-Anfänger mit Grundkenntnissen in CSS und HTML: Wenn du die Webentwicklung während einer Ausbildung lernst und ein grundlegendes Verständnis für CSS und HTML hast, biete dir dieses Buch alles, was du zum Erlernen von React benötigst. Wenn du dich wackelig fühlst und der Meinung bist, dass dein JavaScript-Wissen lückenhaft ist, dann schließe diese Lücke, bevor du mit dem Buch fortfährst. Im Buch wirst du zusätzlich viele Hinweise und Links zu grundlegendem Wissen finden.

**JavaScript-Veteranen**

jQuery-JavaScript-Veteranen: Wenn du JavaScript früher ausgiebig mit jQuery, MooTools und Dojo verwendet hast, scheint die neue JavaScript-Ära überwältigend zu sein. Das grundlegende Wissen hat sich nicht geändert, es ist nach wie vor JavaScript und HTML unter der Haube --- daher hilft dieses Buch dir beim Einstieg in React.

**JavaScript-Enthusiasten**

JavaScript-Enthusiasten mit Kenntnissen in anderen modernen [SPA](https://de.wikipedia.org/wiki/Single-Page-Webanwendung)-Frameworks: Wenn du Erfahrungen mit Angular oder Vue gesammelt hast, wirst du zu Beginn auf viele Dinge stoßen, die anders sind. Aber: Alle diese Frameworks bauen auf derselben Grundlage auf --- JavaScript und HTML. Nach kurzem Umlernen wirst du dich schnell in React zurechtfinden.

**Nicht-JavaScript-Entwickler**

Wenn du eine andere Programmiersprache gelernt hast, bist du mit den verschiedenen Aspekten der Programmierung vertraut. Nachdem du dir die Grundlagen zu JavaScript, CSS und HTML angeeignet hast, wirst du React zusammen mit mir schnell lernen.

**Designer und UI/UX-Enthusiasten**

Arbeitest du im Bereich Design, Benutzerinteraktion oder Benutzererfahrung? Dann zögere nicht, dieses Buch in die Hand zu nehmen. Wenn du mit HTML und CSS vertraut bist, ist dies vorteilhaft. Nachdem du einige JavaScript-Grundlagen durchgearbeitet hast, wirst du die Inhalte dieses Buches verstehen. Heutzutage rücken UI und UX näher an die Implementierungsdetails heran. Es bringt dir Vorteile, wenn du weißt, wie die Dinge im Code funktionieren.

**Teamleiter oder Produktmanager**

Wenn du Teamleiter oder Produktmanager einer Entwicklungsabteilung bist, vermittelt dir dieses Buch eine Übersicht über alle wesentlichen Teile einer React-Anwendung. In jedem Abschnitt wird ein Konzept, ein Muster oder eine Technik erläutert. So wird Schritt für Schritt die Gesamtarchitektur aufgebaut und verbessert. Ergebnis ist eine fertige Anwendung, die alle wesentlichen Aspekte von React berücksichtigt.
<img src="https://vg01.met.vgwort.de/na/6f1702af3e414d668eda9b3e3e62e9cf" width="1" height="1" alt="">