import React, { Component } from 'react';
import './Gellery.css';

export class Gallery extends Component {
  img1 = [
    'https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/48268829_263969677613326_1596734000154542080_n.jpg?_nc_cat=105&_nc_oc=AQlidpS3bmImzAyZaaTg7UOe2WrglxCk2ME9g-EJ3elpGZAgNAqsPj9umfoERObKm73ezF3n2eKjsmNW3sPzKxf-&_nc_ht=scontent.fbkk12-2.fna&oh=51761b899d674832a62e07f9cce83a2c&oe=5DB2DAB9',
    'https://scontent.fbkk9-2.fna.fbcdn.net/v/t1.0-9/45463592_252452958764998_8650713490249482240_n.jpg?_nc_cat=109&_nc_oc=AQnk3eoQw2hzIn2-xI1lDBGVuzesYBU9W1wT_ksLj0zUo0ykJlNv8hFXpDaqh9AZRidRd3xDDW3H_AwifPiR_8x8&_nc_ht=scontent.fbkk9-2.fna&oh=b7977b52bff7cd99ce0cb9ec114b3647&oe=5DC37FBC',
    'https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/45447441_252452978764996_3881358178708881408_n.jpg?_nc_cat=104&_nc_oc=AQlRHSwVExTC2tQIz8jmasHj6tKWNOlHbIIw5g3GR5mfDnqqRecBojh25Ixgm1Enqvvv3FBnX7fndMDe1PrCXaim&_nc_ht=scontent.fbkk12-2.fna&oh=5de8580eb4ffe82d47c43dcfa15a0fa6&oe=5DBCDA7B',
    'https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.0-9/48277807_263969330946694_495723218338840576_n.jpg?_nc_cat=110&_nc_oc=AQnI0py_OcwWaSuzrnyjWWLnLZZ8rHtsrJeuwffkR8J0zphjHAlF3hDpoBuvb3RgXnEldRBMMsODI6j3XlI00u63&_nc_ht=scontent.fbkk12-4.fna&oh=2676105eb743e57d3c67f6195e0f2e3f&oe=5DC63FB3'
  ];
  img2 = [
    'https://scontent.fbkk8-4.fna.fbcdn.net/v/t1.0-9/45498065_252452755431685_446875816547057664_n.jpg?_nc_cat=100&_nc_oc=AQl9zFirm1ZsdJIY433xeeHXRBD32n7BlcOuPjK4u3pRaVKhWZo5p-GFbYcxJHl6NCLfAGCYfwcrlbxV8V99ivlx&_nc_ht=scontent.fbkk8-4.fna&oh=84ac3ff7dd2ba221172bcdc9f0235cb8&oe=5DA929CA',
    'https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.0-9/47574254_263969580946669_169944528688513024_n.jpg?_nc_cat=110&_nc_oc=AQkrMS8w9qcgZFtZt9mi_u67pGCX9TrY85c4dQjqD6UivAkDkH_7tRpV0VgKlppjFfxwbNL14SQ7I_QnLlb1ydrG&_nc_ht=scontent.fbkk12-4.fna&oh=4abac3f0bd8ab4c2b1e2a6209f506f6c&oe=5DC71D2D',
    'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/47281217_263969337613360_6554922698529570816_n.jpg?_nc_cat=108&_nc_oc=AQlJ4nHu2tUyHLmH5wxtitmY0-D0H_ZueJwquPOydl_JO4BQ87IIuybY-4hzEl17uFt87ZjESZfirgayQ1ynCjJW&_nc_ht=scontent.fbkk13-1.fna&oh=b0000a71ef1bac02b4b011db68360137&oe=5DACA77E',
    'https://scontent.fbkk12-1.fna.fbcdn.net/v/t1.0-9/45452565_252451525431808_3432344576549978112_n.jpg?_nc_cat=101&_nc_oc=AQnTe6AXHSEaDq9ez9MEYRPkIw_DLwqS344cFKy6TdSGRjNQKjlIGvkIGieyQWv6FWFAjHsLi2GQPPhHz6GB8mrG&_nc_ht=scontent.fbkk12-1.fna&oh=ad7bd4d2f3f27fa21eee4a51116a4b51&oe=5DA6E1AF'
  ];
  img3 = [
    'https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/47306732_263969640946663_7519175867600207872_n.jpg?_nc_cat=105&_nc_oc=AQmL0U-RfZiVuJ4279LkSwvLErtXOSW9FnpFd8hDgcFnef3aIUHPZEofyMDOdyQ6PQNkRAC-l7KE1yK7KwSPlxtv&_nc_ht=scontent.fbkk12-2.fna&oh=0e979e900fc9368aa83bcf107b7017b0&oe=5DB6EB22',
    'https://scontent.fbkk8-4.fna.fbcdn.net/v/t1.0-9/47683274_263968840946743_5558137192301199360_n.jpg?_nc_cat=100&_nc_oc=AQm8MaRdMCzcRlDzUleDWEOxWMY7b_etEyDkmWVpShY98qRb8iXy41b9biOS0zdsJhwbVYro6XoNOy13wOOsUDjb&_nc_ht=scontent.fbkk8-4.fna&oh=dfad9fe5634e5ecbe52b7542dd2634b9&oe=5DB49501',
    'https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.0-9/45549856_252452968764997_6802837621128036352_n.jpg?_nc_cat=110&_nc_oc=AQk6kt6yHq4nz06ugBhxDIDvg0GBpCgfm8SldnTLxHlBgQPHiQvKl1VPUzq61XaDDxWY0evU49RYZOJ6H0h9ElUs&_nc_ht=scontent.fbkk12-4.fna&oh=5b9bff106cbe5f536661065336e6029a&oe=5DA83023',
    'https://scontent.fbkk12-1.fna.fbcdn.net/v/t1.0-9/45434237_252451518765142_7801123209109045248_n.jpg?_nc_cat=106&_nc_oc=AQkbmRUJGRG4yBrTzKycp9xq97tUWDRHdFbpOaZVZr7UaMEnggpWpiOej3Zv4FByx3-xqkNoRlv4imTMhd5CiJpU&_nc_ht=scontent.fbkk12-1.fna&oh=2ea29cdc3473fba14b78530014008c2b&oe=5DB8718B'
  ];
  img4 = [
    'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/45527641_252453378764956_4367276725445328896_n.jpg?_nc_cat=108&_nc_oc=AQkooBF-TlF0YhH-FQVlzoe1upd2KhNxOEAkrqT-TQlBvGEF4giGqlEQ68ajRF-hCPUVo2K3LDdmhwsWAn8XfQwd&_nc_ht=scontent.fbkk13-1.fna&oh=bc2d1b287d02149a8df2a81c96c76d1c&oe=5DB912B4',
    'https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/47684821_263968860946741_6440425433128239104_n.jpg?_nc_cat=105&_nc_oc=AQm9quen3Kb1exhD4LLjNge4o_UHE2FjKyDij0iS9PnYIfn6Z4jmicGaYtP7mYFKqdXJkuzLH30K9ef08qyaA1JG&_nc_ht=scontent.fbkk12-2.fna&oh=6d79c66e62a406f590dae6f6f9272fea&oe=5DBA423A',
    'https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.0-9/45250675_250614498948844_5713686519621877760_n.jpg?_nc_cat=103&_nc_oc=AQk_tYC6vsnAiKnA771LoNgP-hzSzAqYc4ihjVtAeSmehpeUosR6BKcU38Vy4368M9fajWVwtLqmQPfKCZrRg2HH&_nc_ht=scontent.fbkk12-4.fna&oh=22c49bd0c1cd1b8babc23342e2701225&oe=5DA67458',
    'https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-9/45493700_252453522098275_7797968070298828800_n.jpg?_nc_cat=102&_nc_oc=AQnc0ajPTzKDwpcHJF52DRxdoT30kIIKnNKsH5hkOdIz8vpi5jhYFHas7GTP9ZFfEzTwELSQ7PknfcnSj-Hxe5OL&_nc_ht=scontent.fbkk12-3.fna&oh=7b0fe02aa4088ca1626073a43d2938dd&oe=5DBC5C36'
  ];
  renderImg(imgs) {
    return imgs.map((img, i) => <img key={i} src={img} alt={img} />);
  }
  render() {
    return (
      <section className="gallery">
        <div className="ui container">
          <h3 className="ui top attached header">#Gallery</h3>
          <div className="ui attached segment">
            <div className="gallery-item">
              <div>{this.renderImg(this.img1)}</div>
              <div>{this.renderImg(this.img2)}</div>
              <div>{this.renderImg(this.img3)}</div>
              <div>{this.renderImg(this.img4)}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Gallery;
