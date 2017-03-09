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
          star-bar(:hero="hero", :ascended="showAscended", v-cloak)
          div.shade
          span.card-title {{ hero.name }}

  //- Hero Modal
  div#heroModal.modal.bottom-sheet
    div.modal-content(v-if="selectedHero != null")
      h4 
        | {{ selectedHero.name }}
        span.small.grey-text.darken-2 {{ selectedHero.className }}
      div.row
        div.col.s1
          img(:src="'img/avatars/' + selectedHero.avatars.base")
        div.col.s4.offset-s1
          div.row
            div.col.s6
              div
                span.stat-name HP
                span.stat {{ selectedHero.baseStats.hp }}
              div
                span.stat-name Power
                span.stat {{ selectedHero.baseStats.power }}
              div
                span.stat-name Armor
                span.stat {{ selectedHero.baseStats.armor }}
              div
                span.stat-name Speed
                span.stat {{ selectedHero.baseStats.speed }}

            div.col.s6
              div
                span.stat-name Crit
                span.stat {{ selectedHero.baseStats.crit }}%
              div
                span.stat-name Crit Mult
                span.stat {{ selectedHero.baseStats.critMult }}%
              div
                span.stat-name Aim
                span.stat {{ selectedHero.baseStats.aim }}%
              div
                span.stat-name Block
                span.stat {{ selectedHero.baseStats.block }}%
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

    .star-bar {
      position: absolute;
      bottom: 0; left: 0; right: 0;
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
  h4, span {
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
      width: 100%;
    }

    .stat-name {
      font-weight: bold;
      margin-right: 1rem;
      width: 40%;
      display: inline-block;
    }
  }
} //- #heroModal
</style>

<script>
import { Session } from 'meteor/session';
import { Heroes } from '/imports/api/heroes/heroes';

Session.setDefault('hearoSearchText', '');

import StarBar from '/imports/ui/components/StarBar.vue';

export default {
  components: {
    StarBar
  },
  methods: {
    searchButtonTitle() {
      if ( this.showAscended == true ) return 'Show Base';

      return 'Show Ascended';
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