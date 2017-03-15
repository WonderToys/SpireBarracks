import { Mongo } from 'meteor/mongo';

// Helpers
const getHeroStats = (hero, base) => {
  const growth = hero.growth;
  const starPower = growth.starPower;
  const levelPower = growth.levelPower;

  const blockBase = growth.dodgeBase;
  const aimBase = growth.aimBase;
  const critBase = growth.critBase;
  const critMultBase = growth.ampBase;
  const speedBase = growth.speedBase;

  // getStatModed()
  const getStatModed = (value, stat) => {
    let statMod = hero.statMods.base[stat];
    if ( base !== true && hero.canAscend !== false ) {
      statMod = hero.statMods.ascended[stat];
      if ( statMod == null || statMod == '' ) {
        statMod = hero.statMods.base[stat];
      }
    }

    if ( statMod == null || statMod == '' || statMod <= 0.0 ) {
      statMod = 1.0;
    }

    const newValue = value * parseFloat(statMod);
    if ( newValue < 1 || stat == 'amp' ) {
      return newValue;
    }

    return Math.floor(newValue);
  };
  //- getStatModed()

  // getLevelStat()
  const getLevelStat = (stat) => {
    const statBase = growth[`${ stat }Base`];
    const level = (hero.level || 0) * 1.0;

    return getStatModed((statBase * starPower + level * levelPower * statBase), stat);
  }; //- getLevelStat()

  return {
    hp: getLevelStat('hp'),
    power: getLevelStat('power'),
    armor: getLevelStat('armor'),
    crit: getStatModed(critBase, 'crit') * 100,
    critMult: (getStatModed(critMultBase, 'amp') - 1.0) * 100,
    aim: getStatModed(aimBase, 'aim') * 100,
    block: getStatModed(blockBase, 'dodge') * 100,
    speed: getStatModed(speedBase, 'speed')
  };
};

// Export
export const Heroes = new Mongo.Collection('heroes', {
  transform(doc) {
    if ( doc.ratings == null ) {
      doc.ratings = {};
    }
    
    doc.baseStats = {
      base: getHeroStats(doc, true),
      ascended: getHeroStats(doc, false),
    };

    return doc;
  }
});