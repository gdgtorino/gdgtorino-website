import {customElement, html, property} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import {until} from 'lit-html/directives/until';
import {Document} from '@contentful/rich-text-types';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';

import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-about.css';
import {RouterPage} from '../router-page';

@customElement('page-about')
class PageAbout extends RouterPage {

    static styles = [style, sharedStyles];

    @property() body: Promise<Document>;

    onBeforeEnter() {
        this.body = this.pageData.getBody();
    }

    render() {
        return html`
          <div class="container">
            <h1 class="page-title">About</h1>
            
            <div class="page-content">
              ${until(this.body.then(body =>
                unsafeHTML(documentToHtmlString(body))
              ))}
            </div>
          </div>
        `;
    }

}
