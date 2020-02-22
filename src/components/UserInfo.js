import React, { Component } from 'react'
import astrud from '../../content/images/ich_quadratisch_1000.jpg'
import patreon from '../../content/thumbnails/patreon.png'
import kofi from '../../content/thumbnails/kofi.png'

export default class UserInfo extends Component {
  render() {
    return (
      <aside className="note">
        <div className="container note-container">
          <div className="flex-author">
            <div className="flex-avatar">
              <img className="avatar" src={astrud} alt="Astrid Günther" />
            </div>
            <div>
              <p>
                I’m Astrid Günther. I document everything I learn and help thousands of people start
                coding careers.{' '}
                <strong>
				Meine Website enthält keine Anzeigen, Sponsoren oder Bullshit. Wenn Ihnen meine Inhalte gefallen, sollten Sie in Betracht ziehen, meine Arbeit zu unterstützen.
                </strong>
              </p>

              <div className="flex">
                <a
                  href="https://ko-fi.com/astridguenther"
                  className="donate-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={kofi} className="coffee-icon" alt="Coffee icon" />
                  Buy me a coffee
                </a>
                <a
                  className="patreon-button"
                  href="https://www.patreon.com/astridx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={patreon} height="50" width="50" alt="Patreon" /> Become a Patron
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    )
  }
}
