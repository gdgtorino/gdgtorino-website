import {customElement, html, property} from 'lit-element';
import {until} from 'lit-html/directives/until';
import * as renderer from '@contentful/rich-text-html-renderer';

import * as ContentfulService from '../../../services/contentful';
import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-about.css';
import {RouterPage} from '../../router-page';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';

@customElement('page-about')
class PageAbout extends RouterPage {

    static styles = [style, sharedStyles];

    @property() body = ContentfulService.getAbout()
        .then(about => renderer.documentToHtmlString(about.items[0].fields.body));

    render() {
        return html`
          <div class="container page-content">
            <h1>About</h1>
            
            <div>${until(this.body.then(body => unsafeHTML(body)))}</div>
          </div>
        `;
    }

}
