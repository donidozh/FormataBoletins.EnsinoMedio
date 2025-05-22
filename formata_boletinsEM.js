// ==UserScript==
// @name         Formatar Boletins - SIGEDUCA
// @version      1.1
// @description  Formata os Boletins do Ensino Médio sem quebra de página
// @author       Elder Martins
// @homepage     https://github.com/donidozh/FormataBoletins.EnsinoMedio/edit/main/formata_boletinsEM.js
// @downloadURL  https://github.com/donidozh/FormataBoletins.EnsinoMedio/edit/main/formata_boletinsEM.js
// @updateURL    https://github.com/donidozh/FormataBoletins.EnsinoMedio/edit/main/formata_boletinsEM.js
// @match        http://sigeduca.seduc.mt.gov.br/ged/hwgedteladocumento.aspx?0,26
// @copyright    2025, Elder Martins (elder.martins@edu.mt.gov.br)
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Estilo CSS para o botão
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

    // Função para remover os page breaks
    function removerPageBreaks() {
        const pageBreaks = document.querySelectorAll('div[style*="page-break-before: always"]');

        pageBreaks.forEach(div => {
            div.remove();
        });

        alert(`Foram formatados ${pageBreaks.length} boletins da página.`);
    }

    // Função para adicionar o botão
    function adicionarBotao() {
        // Verifica se o botão já existe
        if (document.getElementById('removePageBreaksBtn')) {
            return;
        }

        const botao = document.createElement('button');
        botao.id = 'removePageBreaksBtn';
        botao.textContent = 'Formatar Boletins';
        botao.addEventListener('click', removerPageBreaks);

        document.body.appendChild(botao);
    }

    // Observa mudanças na página pois o conteúdo pode ser carregado dinamicamente
    const observer = new MutationObserver(function(mutations) {
        if (document.body) {
            adicionarBotao();
            observer.disconnect();
        }
    });

    // Inicia a observação
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Também tenta adicionar imediatamente caso o body já exista
    if (document.body) {
        adicionarBotao();
    }
})();
