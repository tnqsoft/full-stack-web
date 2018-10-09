class CustomCard extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Get Template
        const styleContent = `
            .custom-card {
                border: 1px solid #dcdcdc;
                width: 400px;
                margin-bottom: 10px;
            }
    
            .custom-card-head {
                background-color: #999;
            }
    
            .custom-card-body {
                padding: 10px;
            }
    
            [name="title"]::slotted(h2) {
                margin: 0;
                padding: 5px;
                font-family: sans-serif;
                font-size: 18px;
                color: white;
            }
    
            /* THEMES */
            /* PRIMARY */
            :host(.card-primary) .custom-card {
                border-color: blue;
            }
            :host(.card-primary) .custom-card-head {
                background-color: blue;
            }
    
            /* INFO */
            :host(.card-info) .custom-card {
                border-color: cyan;
            }
            :host(.card-info) .custom-card-head {
                background-color: cyan;
            }
    
            /* SUCCESS */
            :host(.card-success) .custom-card {
                border-color: green;
            }
            :host(.card-success) .custom-card-head {
                background-color: green;
            }
    
            /* WARNING */
            :host(.card-warning) .custom-card {
                border-color: orange;
            }
            :host(.card-warning) .custom-card-head {
                background-color: orange;
            }
    
            /* DANGER */
            :host(.card-danger) .custom-card {
                border-color: red;
            }
            :host(.card-danger) .custom-card-head {
                background-color: red;
            }
        `;

        var style = document.createElement('style');
        style.textContent = styleContent;

        const cardMain = document.createElement('div');
        cardMain.className = 'custom-card';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'custom-card-head';
        const slotHeader = document.createElement('slot');
        slotHeader.name = 'title';
        cardHeader.appendChild(slotHeader);

        const cardBody = document.createElement('div');
        cardBody.className = 'custom-card-body';
        const slot = document.createElement('slot');
        cardBody.appendChild(slot);

        cardMain.appendChild(cardHeader);
        cardMain.appendChild(cardBody);

        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Append it to the shadow root
        shadow.appendChild(style);
        shadow.appendChild(cardMain);
    }
}
window.customElements.define('custom-card', CustomCard);