<template lang="jade">
div.heroes
  div.row
    div(v-for="hero in heroes").col.s4.m2.l1
      div.card(v-on:click="setSelectedHero(hero)", data-target="heroModal")
        div.card-image
          img(:src="'img/avatars/' + hero.avatars.base")
          star-bar(:hero="hero", ascended="false", v-cloak)
          div.shade
          span.card-title {{ hero.name }}

  //- Hero Modal
  div#heroModal.modal.bottom-sheet
    div.modal-content
      h4 {{ selectedHero.name }}
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

  &:hover {
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
  .row {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    
    img {
      width: 100%;
    }

    .stat-name {
      font-weight: bold;
      margin-right: 1rem;
      width: 40%
    }
  }
} //- #heroModal
</style>

<script>
import { Heroes } from '/imports/api/heroes/heroes';

import StarBar from '/imports/ui/components/StarBar.vue';

export default {
  components: {
    StarBar
  },
  methods: {
    setSelectedHero(hero) {
      this.selectedHero = hero;
    }
  },
  meteor: {
    heroes() {
      return Heroes.find({}, {
        sort: {
          elementSort: 1,
          naturalStars: 1,
        }
      });
    }
  },
  data() {
    return { 
      selectedHero: {
        avatars: {},
        baseStats: {}
      } 
    };
  },
  updated() {
    $('.modal').modal();
  }
};
</script>