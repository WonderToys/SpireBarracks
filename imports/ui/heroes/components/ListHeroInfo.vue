<!--
  Template
-->
<template lang="jade">
div
  div.col.s4
    div.row
      div.col.s6
        div
          span.stat-name HP
          span.stat {{ getHeroStat(hero, 'hp') }}
        div
          span.stat-name Power
          span.stat {{ getHeroStat(hero, 'power') }}
        div
          span.stat-name Armor
          span.stat {{ getHeroStat(hero, 'armor') }}
        div
          span.stat-name Speed
          span.stat {{ getHeroStat(hero, 'speed') }}

      div.col.s6
        div
          span.stat-name Crit
          span.stat {{ getHeroStat(hero, 'crit') }}%
        div
          span.stat-name Crit Mult
          span.stat {{ getHeroStat(hero, 'critMult') }}%
        div
          span.stat-name Aim
          span.stat {{ getHeroStat(hero, 'aim') }}%
        div
          span.stat-name Block
          span.stat {{ getHeroStat(hero, 'block') }}%

    div.row.toggle-container
      div.col.s6
        a(href="javascript:void(0);").btn.waves-effect.waves-light.deep-purple.darken-1.disabled
          | Show Max
      div.col.s6
        a(href="javascript:void(0);", v-on:click="$parent.showAscended = !$parent.showAscended").btn.waves-effect.waves-light.deep-purple.darken-1 
          | {{ $parent.searchButtonTitle() }}
  //- Hero Stats

  div.col.s6
    div.row.hero-skills
      div.col.s6(v-if="getHeroSkills(hero)[0] != null")
        h6 
          | {{ getHeroSkills(hero)[0].name }}
          span.small.grey-text.darken-2 {{ getHeroSkills(hero)[0].coolString }}

        p {{ getHeroSkills(hero)[0].description }}
      div.col.s6(v-if="getHeroSkills(hero)[1] != null")
        h6 
          | {{ getHeroSkills(hero)[1].name }}
          span.small.grey-text.darken-2 {{ getHeroSkills(hero)[1].coolString }}

        p {{ getHeroSkills(hero)[1].description }}
    div.row.hero-skills(v-if="getHeroSkills(hero).length > 2")
      div.col.s6(v-if="getHeroSkills(hero)[2] != null")
        h6 
          | {{ getHeroSkills(hero)[2].name }}
          span.small.grey-text.darken-2 {{ getHeroSkills(hero)[2].coolString }}

        p {{ getHeroSkills(hero)[2].description }}
      div.col.s6(v-if="getHeroSkills(hero)[3] != null")
        h6 
          | {{ getHeroSkills(hero)[3].name }}
          span.small.grey-text.darken-2 {{ getHeroSkills(hero)[3].coolString }}

        p {{ getHeroSkills(hero)[3].description }}
</template>

<!--
  Style
-->
<style lang="less" scoped>
.toggle-container {
  margin-top: 1rem;
  .btn {
    width: 100%;
    text-align: center;
  }
}

.stat-name {
  font-weight: bold;
  margin-right: 1rem;
  width: 40%;
  display: inline-block;
}

.hero-skills {
  p {
    margin-top: 0;
  }

  h6 {
    font-weight: bold;
    margin-top: 0;

    span.small {
      font-size: 0.8rem;
      margin-left: 1rem;
      vertical-align: middle;
    }
  }
}
</style>

<!--
  Script
-->
<script>
export default {
  props: [ 'hero', 'ascended' ],
  data() {
    return {
      showAscended: this.ascended
    };
  },
  methods: {
    getHeroStat(hero, stat) {
      if ( this.ascended === true ) {
        return hero.baseStats.ascended[stat].toLocaleString();
      }

      return hero.baseStats.base[stat].toLocaleString();
    },
    getHeroSkills(hero) {
      let skills = hero.skills.base;
      if ( hero.canAscend === true && this.ascended === true ) {
        skills = hero.skills.ascended;
      }

      skills.forEach(s => {
        if ( s.isPassive === true ) {
          s.coolString = 'Passive';
        }
        else if ( s.cooldown != '' ) {
          s.coolString = `${ s.cooldown } Turns`;

          if ( s.cooldownInitial != '' ) {
            s.coolString += `, ${ s.cooldownInitial } Inintial`;
          }
        }
      });

      return skills;
    }
  }
}
</script>