<template lang="jade">
div.heroes
  //- Search Bar
  nav.z-depth-0.white
    div.nav-wrapper
      form(onsubmit="null")&attributes({ 'v-on:submit.prevent': '' })
       div.row
        div.col.m12.l10
          div.input-field
            input#search(type="search", placeholder="Search for heroes ....", v-model="searchText")
            label.label-icon(for="search")
              i.material-icons search
            i.material-icons close
        div.col.m12.l2
          a(href="#", v-on:click="toggleAscended()", style="width: 100%; text-align: center;").btn-flat.waves-effect.waves-orange {{ searchButtonTitle() }}

  //- Hero Card
  div.row
    div(v-for="hero in heroes", v-cloak).col.s4.m2.l1
      div.card(v-on:click="setSelectedHero(hero)", data-target="heroModal", :class="{ 'z-depth-5': selectedHero == hero }")
        div.card-image
          img(:src="'img/avatars/' + getHeroAvatar(hero)")
          div.star-bar
            img.stars(:src="'img/stars/' + getStarImage(hero)")
          div.shade
          span.card-title {{ hero.name }}

  //- Hero Modal
  div#heroModal.modal.bottom-sheet
    div.modal-content(v-if="selectedHero != null")
      h4 
        | {{ getHeroName(selectedHero) }}
        span.small.grey-text.darken-2 {{ selectedHero.className }}
      div.row
        div.col.s1
          img(:src="'img/avatars/' + getHeroAvatar(selectedHero)")
        div.col.s4.offset-s1
          div.row
            div.col.s6
              div
                span.stat-name HP
                span.stat {{ getHeroStat(selectedHero, 'hp') }}
              div
                span.stat-name Power
                span.stat {{ getHeroStat(selectedHero, 'power') }}
              div
                span.stat-name Armor
                span.stat {{ getHeroStat(selectedHero, 'armor') }}
              div
                span.stat-name Speed
                span.stat {{ getHeroStat(selectedHero, 'speed') }}

            div.col.s6
              div
                span.stat-name Crit
                span.stat {{ getHeroStat(selectedHero, 'crit') }}%
              div
                span.stat-name Crit Mult
                span.stat {{ getHeroStat(selectedHero, 'critMult') }}%
              div
                span.stat-name Aim
                span.stat {{ getHeroStat(selectedHero, 'aim') }}%
              div
                span.stat-name Block
                span.stat {{ getHeroStat(selectedHero, 'block') }}%

          div.row
            div.col.s6
              a(href="#", style="width: 100%; text-align: center").btn.waves-effect.waves-light.deep-purple.darken-1.disabled
                | Show Max
            div.col.s6
              a(href="#", v-on:click="toggleAscended()", style="width: 100%; text-align: center").btn.waves-effect.waves-light.deep-purple.darken-1 
                | {{ searchButtonTitle() }}
        //- Hero Stats

        div.col.s6
          div.row.hero-skills
            div.col.s6(v-if="getHeroSkills(selectedHero)[0] != null")
              h6 
                | {{ getHeroSkills(selectedHero)[0].name }}
                span.small.grey-text.darken-2 {{ getHeroSkills(selectedHero)[0].coolString }}

              p {{ getHeroSkills(selectedHero)[0].description }}
            div.col.s6(v-if="getHeroSkills(selectedHero)[1] != null")
              h6 
                | {{ getHeroSkills(selectedHero)[1].name }}
                span.small.grey-text.darken-2 {{ getHeroSkills(selectedHero)[1].coolString }}

              p {{ getHeroSkills(selectedHero)[1].description }}
          div.row.hero-skills(v-if="getHeroSkills(selectedHero).length > 2")
            div.col.s6(v-if="getHeroSkills(selectedHero)[2] != null")
              h6 
                | {{ getHeroSkills(selectedHero)[2].name }}
                span.small.grey-text.darken-2 {{ getHeroSkills(selectedHero)[2].coolString }}

              p {{ getHeroSkills(selectedHero)[2].description }}
            div.col.s6(v-if="getHeroSkills(selectedHero)[3] != null")
              h6 
                | {{ getHeroSkills(selectedHero)[3].name }}
                span.small.grey-text.darken-2 {{ getHeroSkills(selectedHero)[3].coolString }}

              p {{ getHeroSkills(selectedHero)[3].description }}

      //- Row
      div.element
        img(:src="'img/' + getElementImage(selectedHero)")
</template>

<style lang="less" scoped>
nav {
  .input-field {
    input[type="search"] {
      display: inline-block;
      color: rgba(0, 0, 0, 0.7);
    }

    label i {
      color: rgba(0, 0, 0, 0.7);
    }
  }
} //- nav

.card {
  cursor: pointer;

  .card-image {
    .shade {
      position: absolute;
      top: 0; left: 0; bottom: 0; right: 0;
      background-color: rgba(0, 0, 0, 0.52);
      border-radius: 2px;
      display: none;
    }

    .card-title {
      font-size: 1.1rem;
      padding: 10px;
      text-shadow: 1px 1px 2px #000000;
      display: none;
    }
  }

  &:hover, &.z-depth-5 {
    .card-image {
      .shade, .card-title {
        display: inherit;
      }

      .star-bar {
        opacity: 0.50;
      }
    }
  }
} //- card

#heroModal {
  h4, h6, span {
    color: #212121;
  }

  h4 {
    span.small {
      margin-left: 1rem;
      font-size: 1.54rem;
      vertical-align: middle;
    }
  }

  .row {
    margin-left: -0.75rem;
    margin-right: -0.75rem;

    img {
      width: auto;
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
  }

  .element {
    position: absolute;
    top: -28px;
    right: -28px;
    opacity: 0.25;

    img {
      width: 128px;
      height: auto;
    }
  }
} //- #heroModal

.star-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  text-align: center;

  img {
    height: 1.6rem;
    width: auto;
    border-radius: 0px;
    display: inline;
    vertical-align: bottom;
  }
}
</style>

<script>
import { Session } from 'meteor/session';
import { Heroes } from '/imports/api/heroes/heroes';

Session.setDefault('hearoSearchText', '');

export default {
  methods: {
    searchButtonTitle() {
      if ( this.showAscended == true ) return 'Show Base';

      return 'Show Ascended';
    },
    getElementImage(hero) {
      return `${ hero.element.toLowerCase() }.png`;
    },
    getStarImage(hero) {
      let baseImage = `${ hero.naturalStars }star`;
      if ( hero.canAscend !== true ) {
        return `${ baseImage }_food.png`;
      }

      if ( this.showAscended === true ) {
        return `${ baseImage }_awakened.png`;
      }

      return `${ baseImage }.png`;
    },
    getHeroName(hero) {
      if ( hero.canAscend !== true ) {
        return hero.name;
      }

      if ( this.showAscended === true ) {
        return hero.ascendedName;
      }

      return hero.name;
    },
    getHeroAvatar(hero) {
      if ( hero.canAscend !== true ) {
        return hero.avatars.base;
      }
      
      if ( this.showAscended === true ) {
        return hero.avatars.ascended;
      }

      return hero.avatars.base;
    },
    getHeroStat(hero, stat) {
      if ( this.showAscended === true ) {
        return hero.baseStats.ascended[stat].toLocaleString();
      }

      return hero.baseStats.base[stat].toLocaleString();
    },
    getHeroSkills(hero) {
      let skills = hero.skills.base;
      if ( hero.canAscend === true && this.showAscended === true ) {
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
    },
    setSelectedHero(hero) {
      this.selectedHero = hero;
    },
    toggleAscended() {
      this.showAscended = !this.showAscended;
    }
  },
  meteor: {
    data: {
      heroes: {
        params() {
          let searchText = this.searchText;
          if ( searchText.length < 3 ) searchText = '';

          return { searchText };
        },
        update({ searchText }) {
          return Heroes.find({
            $or: [
              { name: { $regex: searchText, $options: "ig" } },
              { className: { $regex: searchText, $options: "ig" } }
            ]
          }, {
            sort: {
              elementSort: 1,
              naturalStars: 1
            }
          });
        }
      }
    }
  },
  data() {
    return { 
      selectedHero: null,
      showAscended: false,
      searchText: '',
    };
  },
  updated() {
    const that = this;
    $('.modal').modal({
      complete() {
        that.selectedHero = null;
      }
    });
  }
};
</script>