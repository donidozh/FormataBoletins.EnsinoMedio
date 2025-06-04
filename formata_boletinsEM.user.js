// ==UserScript==
// @name         Formatar Boletins - SIGEDUCA
// @version      1.3
// @description  Remove e reinsere page-breaks após cada 2 <div id="content"> nos boletins do Ensino Médio, com contador de boletins formatados
// @author       Elder Martins
// @homepage     https://github.com/donidozh/FormataBoletins.EnsinoMedio/edit/main/formata_boletinsEM.user.js
// @downloadURL  https://github.com/donidozh/FormataBoletins.EnsinoMedio/edit/main/formata_boletinsEM.user.js
// @updateURL    https://github.com/donidozh/FormataBoletins.EnsinoMedio/edit/main/formata_boletinsEM.user.js
// @match        http://sigeduca.seduc.mt.gov.br/ged/hwgedteladocumento.aspx?0,26
// @copyright    2025, Elder Martins
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(`
        #removePageBreaksBtn {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        #removePageBreaksBtn:hover {
            background-color: #45a049;
        }
    `);

    function removerPageBreaks() {
        const breaks = document.querySelectorAll('div[style*="page-break-before: always"]');
        breaks.forEach(div => {
            if (div.textContent.trim() === '.') {
                div.remove();
            }
        });
    }

    function inserirNovosPageBreaks() {
        const contents = document.querySelectorAll('div#content');
        for (let i = 1; i < contents.length; i++) {
            if (i % 2 === 0) {
                const breakDiv = document.createElement('div');
                breakDiv.setAttribute('style', 'page-break-before: always');
                breakDiv.textContent = '.';
                contents[i - 1].after(breakDiv);
            }
        }

        // Mensagem igual à original
        alert(`Foram formatados ${contents.length} boletins da página.`);
    }

    function adicionarBotao() {
        if (document.getElementById('removePageBreaksBtn')) return;

        const botao = document.createElement('button');
        botao.id = 'removePageBreaksBtn';
        botao.textContent = 'Formatar Boletins';
        botao.addEventListener('click', () => {
            removerPageBreaks();
            inserirNovosPageBreaks();
        });

        document.body.appendChild(botao);
    }

    const observer = new MutationObserver(() => {
        if (document.body) {
            adicionarBotao();
            observer.disconnect();
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    if (document.body) {
        adicionarBotao();
    }
})();
