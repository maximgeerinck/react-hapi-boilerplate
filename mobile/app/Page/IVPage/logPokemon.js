// const chalk = require('chalk')

const LevelToCPM = require('../../assets/json/level-to-cpm.json')
const Levels = require('../../assets/json/levels')
const cpTools = require('./cp')
const hpTools = require('./hp')

const TRAINER_LEVEL = 25

const MAX_OVERALL_RATING = 385

const getOverallRating = (
  v => v.percent.PerfectIV +
       v.percent.PercentCP +
       v.percent.PercentBatt +
       (v.percent.PercentHP * 0.85)
)

// function colorPercent(num, mod) {
//   const mul = num * (mod || 1)
//   if (mul < 70) {
//     return chalk.red(num + '%')
//   } else if (mul < 90) {
//     return chalk.yellow(num + '%')
//   }
//   return chalk.green.bold(num + '%')
// }

function logPokemon(pokemon) {
  const response = []
  response.push(`IVs: ${pokemon.ivs.IndAtk}/${pokemon.ivs.IndDef}/${pokemon.ivs.IndSta} (${pokemon.percent.PerfectIV})`)
  response.push(`Atk+Def: ${pokemon.ivs.IndAtk + pokemon.ivs.IndDef}/30 (${pokemon.percent.PercentBatt})`)
  response.push(`CP: ${pokemon.CP} (${pokemon.percent.PercentCP})`)
  response.push(`HP: ${pokemon.HP} (${pokemon.percent.PercentHP})`)

  response.push(`Atk: ${pokemon.Atk.toFixed(2)}`)
  response.push(`Def: ${pokemon.Def.toFixed(2)}`)
  response.push(`Sta: ${pokemon.Sta.toFixed(2)}`)

  response.push('')

  response.push(`At level ${TRAINER_LEVEL + 1.5}, this pokemon would have:`)
  response.push(`Maximum CP: ${pokemon.meta.MaxCP}`)
  response.push(`Maximum HP: ${pokemon.meta.MaxHP}`)

  response.push('')


  if(pokemon.meta.evolveCP != null && pokemon.meta.MaxEvolveCP != null) {
    response.push('WHEN EVOLVED');
    response.push(`CP: ~${pokemon.meta.EvolveCP}`);
    response.push(`MAX CP: ~${pokemon.meta.MaxEvolveCP}`);
  }
  response.push(`Max out: ${pokemon.meta.Stardust} stardust and ${pokemon.meta.Candy} candy`);

  const ovRating = getOverallRating(pokemon)
  const ovRatingPercent = Math.round(ovRating / MAX_OVERALL_RATING * 100)

  response.push('')

  response.push(`${pokemon.Name} Rating: ${ovRatingPercent}%`);

  return response
}

module.exports = logPokemon
