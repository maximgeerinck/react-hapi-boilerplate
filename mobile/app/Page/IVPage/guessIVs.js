'use strict'

const Pokemon = require('../../assets/json/pokemon.json')
const LevelToCPM = require('../../assets/json/level-to-cpm.json')
const CPM = require('../../assets/json/cpm.json')
const DustToLevel = require('../../assets/json/dust-to-level')

const cpTools = require('./cp')
const hpTools = require('./hp')
const powerupTools = require('./powerup')

const TRAINER_LEVEL = 24

function getMaxLevel() {
  return LevelToCPM[String(TRAINER_LEVEL + 1.5)]
}

function percentInRange(num, min, max) {
  return ((num - min) * 100) / (max - min)
}

function calcIndSta(hp, BaseSta, ECpM) {
  return Array.from(Array(16))
    .map((_, i) => i)
    .filter(IndSta => hp === Math.floor(ECpM * (BaseSta + IndSta)))
}

// A formula that determines in which percentile you are for Atk + Def
function getAttackPercentage(IndAtk, IndDef) {
  return Math.round((IndAtk + IndDef) / 30 * 100)
}

function guessIVs(pokemon, mon, ECpM) {
  const Name = pokemon.name.toUpperCase()

  const BaseSta = mon.stats.stamina

  const IndStaValues = calcIndSta(pokemon.hp, BaseSta, ECpM)

  const MaxLevelCP = cpTools.getMaxCPForLevel(mon, ECpM)
  const MinLevelCP = cpTools.getMinCPForLevel(mon, ECpM)

  const MaxLevelHP = hpTools.getMaxHPForLevel(mon, ECpM)
  const MinLevelHP = hpTools.getMinHPForLevel(mon, ECpM)

  const PercentHP = Math.round(percentInRange(pokemon.hp, MinLevelHP, MaxLevelHP))
  const PercentCP = Math.round(percentInRange(pokemon.cp, MinLevelCP, MaxLevelCP))

  const maxLevel = Math.max.apply(null, DustToLevel[pokemon.stardust])

  const powerup = powerupTools.howMuchPowerUp(maxLevel, TRAINER_LEVEL)
  const Stardust = powerup.stardust
  const Candy = powerup.candy

  // Brute force find the IVs.
  // For every possible IndSta we'll loop through IndAtk and IndDef until we
  // find CPs that match your Pokemon's CP. Those are possible matches and are
  // returned by this function.
  const possibleValues = []
  IndStaValues.forEach((IndSta) => {
    for (let IndAtk = 0; IndAtk <= 15; IndAtk += 1) {
      for (let IndDef = 0; IndDef <= 15; IndDef += 1) {
        const CP = cpTools.getCP(mon, {
          atk: IndAtk,
          def: IndDef,
          sta: IndSta,
        }, ECpM)
        const HP = pokemon.hp

        const BaseAtk = mon.stats.attack
        const Atk = (BaseAtk + IndAtk) * ECpM

        const BaseDef = mon.stats.defense
        const Def = (BaseDef + IndDef) * ECpM

        const BaseSta = mon.stats.stamina
        const Sta = (BaseSta + IndSta) * ECpM

        const MaxCP = cpTools.getMaxCP(mon, IndAtk, IndDef, IndSta, getMaxLevel())
        const MaxHP = hpTools.getMaxHP(mon, IndSta, getMaxLevel())

        const PerfectIV = Math.round((IndAtk + IndDef + IndSta) / 45 * 100)
        const PercentBatt = getAttackPercentage(IndAtk, IndDef)

        var EvolveCP = null
        var MaxEvolveCP = null

        if (CPM[pokemon.name.toUpperCase()]) {
          EvolveCP = Math.round(CPM[pokemon.name.toUpperCase()][1] * CP)
          MaxEvolveCP = Math.round(CPM[pokemon.name.toUpperCase()][1] * MaxCP)
        }

        if (pokemon.cp === CP) {
          possibleValues.push({
            Name,
            CP,
            HP,
            Atk,
            Def,
            Sta,
            ECpM,
            ivs: {
              IndAtk,
              IndDef,
              IndSta,
            },
            percent: {
              PercentBatt,
              PercentCP,
              PercentHP,
              PerfectIV,
            },
            meta: {
              Stardust,
              Candy,
              EvolveCP,
              MaxEvolveCP,
              MinLevelCP,
              MaxLevelCP,
              MinLevelHP,
              MaxLevelHP,
              MaxCP,
              MaxHP,
            },
          })
        }
      }
    }
  })

  return possibleValues
}

module.exports = guessIVs
