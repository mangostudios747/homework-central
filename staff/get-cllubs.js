// This is only going to work for the 2020-2021 school year, probably

const fetch = require('node-fetch')
const cheerio = require('cheerio')


const spreadsheetUrl =
    'https://docs.google.com/spreadsheets/u/1/d/1HUaNWegOIk972lGweoSuNcXtfX7XuGBTQU-gcTsvD9s/pub'

async function main () {
    const html = await fetch(spreadsheetUrl).then(r => r.text())
    const $ = cheerio.load(html, { xmlMode: false })

    const clubs = {}

    $('table tbody tr:not(:first-child)').each(function () {
        // The first <td> is invisible for some reason
        const [
            ,
            newness,
            name,
            tierText,
            desc,
            day,
            time,
            link,
            president,
            teacher,
            email,
            coteacher,
            coemail
        ] = $(this)
            .children()
            .map(function () {
                return $(this)
                    .text()
                    .trim()
            })
            .get()
            // If it's empty, return `undefined` so that it's omitted from the JSON
            .map(str => str || undefined)

        const tierMatch = /TIER ([123]) CLUB/.exec(tierText)
        if (!tierMatch) {
            //console.warn('Could not determine tier from', tierText, name)
        }
        const tier = tierMatch ? +tierMatch[1] : undefined

        if (newness !== 'NEW THIS YEAR!' && newness !== 'Returning') {
            //console.log(newness, 'is not NEW... or Returning', name)
        }

        if (name) {
            clubs[name] = {
                new: newness.includes('NEW'),
                desc,
                day,
                time,
                link,
                tier,
                president,
                coteacher,
                coemail,
                teacher,
                email
            }
        }
    })

    const output = 'clubs.json'
    console.log(JSON.stringify(clubs, null, '\t'))
}
main()
