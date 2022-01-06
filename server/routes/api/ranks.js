const express = require('express')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const router = express.Router()

router.get('/universal-ranks', async (req, res) => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36')
    await page.goto('https://2700chess.com/?per-page=100')
    const $ = cheerio.load(await page.content())

    let universalRanks = $('#live-ratings-table tbody tr').map(function () {
        const tableData = $(this).find('td');
        return {
            name: tableData.eq(2).children().eq(0).text(),
            country: tableData.eq(3).children().first().text(),
            flag: tableData.eq(3).children('.flag').attr('class'),
            standard: parseFloat(tableData.eq(4).children().first().text()),
            rapid: parseFloat(tableData.eq(7).children().first().text()),
            blitz: parseFloat(tableData.eq(9).children().first().text()),
            age: tableData.eq(12).children().eq(0).text(),
            standard_position: parseInt(tableData.eq(0).text().trim())
        }
    }).toArray()
    universalRanks.forEach(player => {
        player.standard_score = (player.standard / universalRanks[0].standard) * 100
    })
    universalRanks.sort((a, b) => b.rapid - a.rapid)
    universalRanks.forEach((player, index) => {
        player.rapid_position = index + 1
        player.rapid_score = (player.rapid / universalRanks[0].rapid) * 100
    })
    universalRanks.sort((a, b) => b.blitz - a.blitz)
    universalRanks.forEach((player, index) => {
        player.blitz_position = index + 1
        player.blitz_score = (player.blitz / universalRanks[0].blitz) * 100
        player.sum_of_ranks = player.standard_position + player.rapid_position + player.blitz_position
        player.universal_score = (player.standard_score + player.rapid_score + player.blitz_score) / 3
    })
    universalRanks.sort((a, b) => a.sum_of_ranks - b.sum_of_ranks)
    universalRanks.forEach((player, index) => {
        player.sum_of_ranks_position = index + 1
    })
    universalRanks.sort((a, b) => b.universal_score - a.universal_score)
    universalRanks.forEach((player, index) => {
        player.universal_position = index + 1
    })
    res.send(universalRanks)
})

module.exports = router