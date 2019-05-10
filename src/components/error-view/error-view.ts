import {html} from 'lit-html';

export const renderErrorView = (error: Error) => html`
    <img src="assets/images/dino.png" alt="Dino" width="100">
    
    <h3>Oops, something went wrong...</h3>
`;
