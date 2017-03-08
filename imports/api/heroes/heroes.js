import { Mongo } from 'meteor/mongo';

// Helpers
const getHeroStats = (hero, base) => {
  const growth = hero.growth;
  const starPower = growth.starPower;
  const levelPower = growth.levelPower;

  const blockBase = growth.dodgeBase * 100;
  const aimBase = growth.aimBase * 100;
  const critBase = growth.critBase * 100;
  const critMultBase = 50;
  const speedBase = growth.speedBase;

  const getLevelStat = (stat) => {
    const statBase = growth[`${ stat }Base`];
    const statMod = hero.statMods.base[stat];
    const level = (hero.level || 0) * 1.0;

    return Math.round((statBase * starPower + level * levelPower * statBase) * statMod);
  };

  return {
    hp: getLevelStat('hp'),
    power: getLevelStat('power'),
    armor: getLevelStat('armor'),
    crit: critBase,
    critMult: critMultBase,
    aim: aimBase,
    block: blockBase,
    speed: speedBase
  };
};

// Export
export const Heroes = new Mongo.Collection('heroes', {
  transform(doc) {
    doc.baseStats = getHeroStats(doc, true);
    return doc;
  }
});