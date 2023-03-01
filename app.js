const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

// GRACIAS
const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
    ]
)
// FIN GRACIAS

// SUBMENU
const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(
    [
        '📄 Aquí tenemos el flujo secundario'
    ],
    null,
    null,
    [flowGracias]
)
// FIN SUBMENU

// MENU
const flowConsulta = addKeyword(['1', 'uno']).addAnswer(
    [
        'Has consultado sobre alguno de nuestros productos\n',
        '*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowReporte = addKeyword(['2', 'dos']).addAnswer(
    [
        'Has solicitado ayuda con uno de nuestros productos\n',
        '*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowAyuda = addKeyword(['3', 'tres']).addAnswer(
    [
        'Has reportado un error en uno de nuestros productos\n',
        '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)
// FIN MENU

// BIENVENIDA
const flowPrincipal = addKeyword(['hola', 'buenos', 'buenas'])
    .addAnswer('Gracias por contactarte con *SmartSoft*\n¿Cómo podemos ayudarte?')
    .addAnswer(
        [
            '👉 *1*: Consultar productos',
            '👉 *2*: Solicitar soporte',
            '👉 *3*: Reportar errores',
        ],
        null,
        null,
        [flowConsulta, flowReporte, flowAyuda]
    )
// FIN BIENVENIDA

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
