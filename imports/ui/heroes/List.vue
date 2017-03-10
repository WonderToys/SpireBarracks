<template lang="jade">
div.heroes
  //- Search Bar
  div#searchBar
    nav.z-depth-0.white.pin-top(data-target="searchBar")
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
            a(href="javascript:void(0);", v-on:click="toggleAscended()", style="width: 100%; text-align: center;").btn-flat.waves-effect.waves-orange {{ searchButtonTitle() }}

  //- Hero Card
  div.row
    div(v-for="(hero, index) in heroes", v-cloak).col.s4.m2.l1
      div.card(v-on:click="setSelectedHero(hero, index)", data-target="heroModal", :class="{ 'z-depth-5': selectedHero == hero }")
        div.card-image
          img(v-lazy="'img/avatars/' + hero.avatars.base", v-if="hero.canAscend === false")
          img(v-lazy="'img/avatars/' + hero.avatars.base", v-show="showAscended === false", v-if="hero.canAscend === true")
          img(v-lazy="'img/avatars/' + hero.avatars.ascended", v-show="showAscended === true", v-if="hero.canAscend === true")
          div.star-bar
            img.stars(v-lazy="getStarsLazyConfig(hero)", v-if="hero.canAscend === false")
            img.stars(v-lazy="getStarsLazyConfig(hero)", v-show="showAscended === false", v-if="hero.canAscend === true")
            img.stars(v-lazy="getStarsLazyConfig(hero)", v-show="showAscended === true", v-if="hero.canAscend === true")
          div.shade
          div.view-container
            i.material-icons search

  //- Hero Modal
  div#heroModal.modal.bottom-sheet
    div.modal-content(v-if="selectedHero != null")
      h4 
        | {{ getHeroName(selectedHero) }}
        span.small.grey-text.darken-2 {{ selectedHero.className }}
      div.row
        div.col.s2
          div.avatar-container
            img(:src="'img/avatars/' + selectedHero.avatars.base", v-if="selectedHero.canAscend === false")
            img(:src="'img/avatars/' + selectedHero.avatars.base", v-show="showAscended === false", v-if="selectedHero.canAscend === true")
            img(:src="'img/avatars/' + selectedHero.avatars.ascended", v-show="showAscended === true", v-if="selectedHero.canAscend === true")
            a(href="javascript:void(0);", :class="{ disabled: selectedIndex <= 0 }", v-on:click="previousHero()").nav.previous.btn.white.waves-effect.waves-orange
              i.material-icons chevron_left
            a(href="javascript:void(0);", :class="{ disabled: selectedIndex >= heroes.length - 1 }", v-on:click="nextHero()").nav.next.btn.white.waves-effect.waves-orange
              i.material-icons chevron_right

        div.col.s4
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

          div.row.toggle-container
            div.col.s6
              a(href="javascript:void(0);").btn.waves-effect.waves-light.deep-purple.darken-1.disabled
                | Show Max
            div.col.s6
              a(href="javascript:void(0);", v-on:click="toggleAscended()").btn.waves-effect.waves-light.deep-purple.darken-1 
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

    .view-container {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      display: none;

      i {
        color: white;
        vertical-align: middle;
        font-size: 3.4rem;
        opacity: fade(#ffffff, 80%);
      }

      &:before {
        content: "";
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
    }
  }

  &:hover, &.z-depth-5 {
    .card-image {
      .shade, .view-container {
        display: inherit;
      }

      .star-bar {
        opacity: 0.50;
      }
    }
  }
} //- card

#heroModal {
  height: 45%;
  overflow-x: hidden;

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

    .avatar-container {
      position: relative;

      img {
        width: 100%;
      }

      .btn.nav {
        color: #212121;
        position: absolute;
        bottom: 0.6rem;
        padding-left: 1rem;
        padding-right: 1rem;

        &.previous {
          left: 0.25rem;
        }

        &.next {
          right: 0.3rem;
        }
      }
    }

    .toggle-container {
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

    &:first-child {
      margin-bottom: 0;
    }
  } //- row

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

.pinned {
  z-index: 998;
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
    getStarsLazyConfig(hero) {
      let src = `img/stars/${ hero.naturalStars }star`;

      if ( hero.canAscend === false ) {
        src += '_food';
      }

      if ( hero.canAscend === true ) {
        if ( this.showAscended === true ) {
          src += '_awakened';
        }
      }

      return {
        loading: '',
        src: `${ src }.png`
      }
    },
    getElementImage(hero) {
      return `${ hero.element.toLowerCase() }.png`;
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
    setSelectedHero(hero, index) {
      this.selectedHero = hero;
      this.selectedIndex = index;
    },
    toggleAscended() {
      this.showAscended = !this.showAscended;
    },
    previousHero() {
      this.selectedIndex--;
      this.selectedHero = this.heroes[this.selectedIndex];
    },
    nextHero() {
      this.selectedIndex++;
      this.selectedHero = this.heroes[this.selectedIndex];
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
      selectedIndex: -1,
      showAscended: false,
      searchText: '',
    };
  },
  mounted() {
    const that = this;

    const $pinTarget = $('#searchBar');
    $('#searchBar nav').pushpin({
      top: $pinTarget.offset().top,
      
    });

    $('.modal').modal({
      complete() {
        that.selectedHero = null;
      }
    });
  }
};
</script>