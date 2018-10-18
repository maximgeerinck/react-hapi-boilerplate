// const chalk = require('chalk')

const LevelToCPM = require('../../assets/json/level-to-cpm.json')
const DustToLevel = require('../../assets/json/dust-to-level')

const findPokemon = require('./findPokemon')
const logPokemon = require('./logPokemon')
const isGoodPokemonForItsClass = require('./isGoodPokemon')
const guessIVs = require('./guessIVs')

function calculate(pokemon) {
  // Get the pokemon's base stats
  const mon = findPokemon(pokemon.name)

  // If the level has been provided then we can get a better accurate reading
  // since we'll be able to determine the exact ECpM.
  if (pokemon.level) {
    if (DustToLevel[pokemon.stardust].indexOf(pokemon.level) === -1) {
      throw new Error('Stardust does not match level')
    }
    const ECpM = LevelToCPM[String(pokemon.level)]
    return guessIVs(pokemon, mon, ECpM)
  }

  // If we're just going on stardust then we'll have to iterate through
  // each level and concatenate all possible values
  return DustToLevel[pokemon.stardust].reduce((arr, level) => {
    const ECpM = LevelToCPM[String(level)]
    return arr.concat(guessIVs(pokemon, mon, ECpM))
  }, [])
}

function magic(pokemon) {
  const values = calculate(pokemon)
  const response = []

  if (!values.length) {
    response.push('I have no idea. You might have entered the wrong values.')
    return response
  }

  const bestPossible = values.reduce((best, mon) => {
    if (!best) return mon
    return mon.percent.PerfectIV > best.percent.PerfectIV ? mon : best
  }, null)

  const yes = values.every(isGoodPokemonForItsClass)
  const maybeValues = values.filter(isGoodPokemonForItsClass)
  const maybe = maybeValues.length > 0

  const init = {
    atk: [Infinity, -Infinity],
    cp: [Infinity, -Infinity],
    hp: [Infinity, -Infinity],
    iv: [Infinity, -Infinity],
    iva: [Infinity, -Infinity],
    ivd: [Infinity, -Infinity],
    ivs: [Infinity, -Infinity],
  }

  // Calculate the min/max range of values for atk, cp, hp, and ivs
  const ValuesRange = values.reduce((obj, v) => {
    return {
      atk: [
        Math.min(v.percent.PercentBatt, obj.atk[0]),
        Math.max(v.percent.PercentBatt, obj.atk[1]),
      ],
      cp: [
        Math.min(v.percent.PercentCP, obj.cp[0]),
        Math.max(v.percent.PercentCP, obj.cp[1]),
      ],
      hp: [
        Math.min(v.percent.PercentHP, obj.hp[0]),
        Math.max(v.percent.PercentHP, obj.hp[1]),
      ],
      iv: [
        Math.min(v.percent.PerfectIV, obj.iv[0]),
        Math.max(v.percent.PerfectIV, obj.iv[1]),
      ],
      iva: [
        Math.min(v.ivs.IndAtk, obj.iva[0]),
        Math.max(v.ivs.IndAtk, obj.iva[1]),
      ],
      ivd: [
        Math.min(v.ivs.IndDef, obj.ivd[0]),
        Math.max(v.ivs.IndDef, obj.ivd[1]),
      ],
      ivs: [
        Math.min(v.ivs.IndSta, obj.ivs[0]),
        Math.max(v.ivs.IndSta, obj.ivs[1]),
      ],
    }
  }, init);
  //
  // // Begin logging
  // if (values.length === 1) {
  //   response.push('Congrats! Here are your Pokemon\'s stats')
  //   response.push('')
  //
  //   response.push.apply(response, logPokemon(values[0]))
  // } else {
  //   response.push('Your possible Pokemon\'s values')
  //
  //   response.push('')
  //
  //   response.push('Range in values')
  //   response.push(`IV: ${ValuesRange.iv[0]} -- ${ValuesRange.iv[1]}%`)
  //   response.push(`Atk+Def: ${ValuesRange.atk[0]} -- ${ValuesRange.atk[1]}%`)
  //   response.push(`CP: ${ValuesRange.cp[0]} -- ${ValuesRange.cp[1]}%`)
  //   response.push(`HP: ${ValuesRange.hp[0]} -- ${ValuesRange.hp[1]}%`)
  //
  //   response.push('')
  //
  //   response.push(`There are ${values.length} possibilities.`)
  //   // response.push(`There is a ${chalk.bold(Math.round(1 / values.length * 100))}% chance you'll get the one below.`)
  //
  //   response.push('')
  //
  //   response.push('Best possible Pokemon\'s values')
  //   response.push.apply(response, logPokemon(bestPossible))
  // }
  //
  // response.push('')
  //
  // // const pokemonId = chalk.blue.bold(`${pokemon.name.toUpperCase()} ${pokemon.cp}`)
  //
  // if (yes) {
  //   // response.push(`>> Yes, keep your ${pokemonId}.`)
  // } else if (maybe) {
  //   response.push(
  //     // `>> Maybe you should keep ${pokemonId} around.`,
  //     '\n  ',
  //     // `There is a ${chalk.bold(Math.round(maybeValues.length / values.length * 100))}% chance you've got a winner.`
  //   )
  // } else {
  //   // response.push(`>> Send ${pokemonId} to Willow's grinder.`)
  // }

  return ValuesRange
}

module.exports = magic;
