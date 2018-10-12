class LoginForm extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Get Template
        const template = `
            <style>
                :host {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: #eaeaea;
                }
                :host * {
                    box-sizing: border-box;                    
                }
                :host .login-form {
                    border: 1px solid #dcdcdc;
                    width: 400px;
                    margin: auto;                    
                    position: relative;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    border-radius: 5px;
                    -webkit-box-shadow: 2px 1px 15px -2px #000000; 
                    box-shadow: 2px 1px 15px -2px #000000;
                    background-color: #fff;
                }
                .header {
                    background-color: #eaeaea;
                    padding: 10px;
                }
                [name="title"]::slotted(h2) {
                    margin: 0;
                    font-size: 16px;
                    color: #666;
                    text-align: center;
                    text-transform: uppercase;
                }
                .body {
                    padding: 10px;
                }
                [name="footer"]::slotted(*) {
                    margin: 0;
                    padding: 0;
                    text-align: center;                    
                }                
                input {
                    display: block;
                    width: 100%;
                    border: 1px solid #dcdcdc;
                    font-size: 16px;
                    padding: 10px;
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    border-radius: 5px;
                }
                button {
                    font-size: 14px;
                    padding: 10px;
                    display: block;
                    width: 100%;
                }
            </style>
            <div class="login-form">
                <div class="header">
                    <slot name="title"></slot>
                </div>
                <div class="body">
                    <p>
                        <input type="text" placeholder="Username">
                    </p>
                    <p>
                        <input type="password" placeholder="Password">
                    </p>
                    <p>
                        <button type="button">Login</button>
                    </p>                    
                </div>
                <div class="footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        `;

        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Append it to the shadow root
        shadow.appendChild(document.createRange().createContextualFragment(template));

        let btn = shadow.querySelector('button');
        let inputUsername = shadow.querySelector('input[type="text"]');
        let inputPassword = shadow.querySelector('input[type="password"]');
        let _self = this;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            let mess = 'Login with username "' + inputUsername.value + '" and password "' + inputPassword.value + '"';
            console.log(mess);
            _self.dispatchEvent(new CustomEvent('on-login-success', {
                detail: {
                    message: mess
                }
            }));
        });
    }
}
window.customElements.define('login-form', LoginForm);