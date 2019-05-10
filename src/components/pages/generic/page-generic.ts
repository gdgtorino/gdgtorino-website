import {customElement, html, property} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import {until} from 'lit-html/directives/until';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import {Document} from '@contentful/rich-text-types';

import {RouterPage} from '../router-page';
import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-generic.css';
import {renderErrorView} from '../../error-view/error-view';

@customElement('page-generic')
class PageGeneric extends RouterPage {

    static styles = [style, sharedStyles];

    @property() body: Promise<Document>;

    onBeforeEnter() {
        this.body = this.pageData.getBody();
    }

    render() {
        return html`
          <div class="container">
            <h1 class="page-title">${this.pageData.name}</h1>
            
            <div class="page-content">
              ${until(this.body.then(body =>
                  unsafeHTML(documentToHtmlString(body))
              ).catch(renderErrorView))}
            </div>
          </div>
        `;
    }

}
