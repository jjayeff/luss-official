import React, { Component } from 'react';
import faker from 'faker';

export class index extends Component {
  render() {
    console.log(faker.lorem.sentence());
    return (
      <div>
        <div className="ui heart rating" data-rating="1" data-max-rating="3">
          <i className="icon active" />
          <i className="icon" />
          <i className="icon" />
        </div>
        <div className="ui feed">
          <div className="event">
            <div className="label">
              <img alt="" src={faker.image.avatar()} />
            </div>
            <div className="content">
              <div className="summary">
                <a href="#!">{faker.name.findName()}</a> added{' '}
                <a href="#!">2 new illustrations</a>
                <div className="date">4 days ago</div>
              </div>
              <div className="extra images">
                <a href="#!">
                  <img alt="" src={faker.image.sports()} />
                </a>
                <a href="#!">
                  <img alt="" src={faker.image.fashion()} />
                </a>
              </div>
              <div className="meta">
                <a href="#!" className="like">
                  <i className="like icon" /> 41 Like
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="ui comments">
          <h3 className="ui dividing header">Comments</h3>
          <div className="comment">
            <a href="#!" className="avatar">
              <img alt="" src={faker.image.avatar()} />
            </a>
            <div className="content">
              <a href="#!" className="author">
                {faker.name.findName()}
              </a>
              <div className="metadata">
                <span className="date">Today at 5:42PM</span>
              </div>
              <div className="text">How artistic!</div>
              <div className="actions">
                <a href="#!" className="reply">
                  Reply
                </a>
              </div>
            </div>
          </div>
          <div className="comment">
            <a href="#!" className="avatar">
              <img alt="" src={faker.image.avatar()} />
            </a>
            <div className="content">
              <a href="#!" className="author">
                {faker.name.findName()}
              </a>
              <div className="metadata">
                <span className="date">Yesterday at 12:30AM</span>
              </div>
              <div className="text">
                <p>
                  This has been very useful for my research. Thanks as well!
                </p>
              </div>
              <div className="actions">
                <a href="#!" className="reply">
                  Reply
                </a>
              </div>
            </div>
            <div className="comments">
              <div className="comment">
                <a href="#!" className="avatar">
                  <img alt="" src={faker.image.avatar()} />
                </a>
                <div className="content">
                  <a href="#!" className="author">
                    {faker.name.findName()}
                  </a>
                  <div className="metadata">
                    <span className="date">Just now</span>
                  </div>
                  <div className="text">Elliot you are always so right :)</div>
                  <div className="actions">
                    <a href="#!" className="reply">
                      Reply
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <a href="#!" className="avatar">
              <img alt="" src={faker.image.avatar()} />
            </a>
            <div className="content">
              <a href="#!" className="author">
                {faker.name.findName()}
              </a>
              <div className="metadata">
                <span className="date">5 days ago</span>
              </div>
              <div className="text">Dude, this is awesome. Thanks so much</div>
              <div className="actions">
                <a href="#!" className="reply">
                  Reply
                </a>
              </div>
            </div>
          </div>
          <form className="ui reply form">
            <div className="field">
              <textarea />
            </div>
            <div className="ui blue labeled submit icon button">
              <i className="icon edit" /> Add Reply
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default index;
