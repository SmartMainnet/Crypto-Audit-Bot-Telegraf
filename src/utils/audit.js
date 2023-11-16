const axios = require('axios')

const { newCall } = require('../database/methods')
const { auditInlineKeyboard } = require('../keyboards/inline_keyboard')

exports.audit = async ctx => {
  try {
    const msgWait = ctx.msgWait
    const address = ctx.address
    const chain = ctx.chain
    const user = ctx.from

    const resGoPlus = await axios.get(`https://api.gopluslabs.io/api/v1/token_security/${chain.id}?contract_addresses=${address}`)
    const res = resGoPlus.data.result[address]

    const buyTaxValue = res.buy_tax * 100
    const sellTaxValue = res.sell_tax * 100

    const buyTax = buyTaxValue.toFixed(0) + (buyTaxValue > 15 ? `% ⚠️` : '%')
    const sellTax = sellTaxValue.toFixed(0) + (sellTaxValue > 15 ? `% ⚠️` : '%')

    const totalSupply = String(Math.floor(res['total_supply'])).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')
    const isRenounced = res.owner_address === '0x000000000000000000000000000000000000dead' || res.owner_address === '0x0000000000000000000000000000000000000000'

    const token = {
      name: res.token_name,
      symbol: res.token_symbol,
      chain: chain.name,
      totalSupply,
      buyTax,
      sellTax,
      contractVerified: res.is_open_source ? 'Yes' : 'No ⚠️',
      renouncedOwnership: isRenounced ? 'Yes' : 'No',
      can_take_back_ownership: +res.can_take_back_ownership ? '⚠️ *Yes*' : '✅ *No*',
      hidden_owner: +res.hidden_owner ? '⚠️ *Yes*' : '✅ *No*',
      is_proxy: +res.is_proxy ? '⚠️ *Yes*' : '✅ *No*',
      is_anti_whale: +res.is_anti_whale ? '⚠️ *Yes*' : '✅ *No*',
      anti_whale_modifiable: +res.anti_whale_modifiable ? '⚠️ *Yes*' : '✅ *No*',
      is_blacklisted: +res.is_blacklisted ? '⚠️ *Yes*' : '✅ *No*',
      is_mintable: +res.is_mintable ? '⚠️ *Yes*' : '✅ *No*',
      trading_cooldown: +res.trading_cooldown ? '⚠️ *Yes*' : '✅ *No*',
      transfer_pausable: +res.transfer_pausable ? '⚠️ *Yes*' : '✅ *No*',
      slippage_modifiable: +res.slippage_modifiable ? '⚠️ *Yes*' : '✅ *No*',
      is_whitelisted: +res.is_whitelisted ? '⚠️ *Yes*' : '✅ *No*',
    }

    ctx.telegram.editMessageText(
      msgWait.chat.id,
      msgWait.message_id,
      undefined,
      ctx.i18n.t('audit_result', token),
      {
        parse_mode: 'MARKDOWN',
        disable_web_page_preview: true,
        reply_markup: auditInlineKeyboard(chain, address)
      }
    )

    newCall(user.id, address)
  } catch (e) {
    console.log(e)
  }
}