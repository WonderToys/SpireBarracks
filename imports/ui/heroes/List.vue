<!--
  Template
-->
<template lang="jade">
div.heroes
  //- Search Bar
  div#searchBar
    nav.z-depth-0.white.pin-top(data-target="searchBar")
      div.nav-wrapper
        form&attributes({ 'v-on:submit.prevent': '' })
         div.row
          div.col.m12.l10
            div.input-field
              input#search(type="search", placeholder="Search for heroes ....", v-model="searchText")
              label.label-icon(for="search")
                i.material-icons search
              i.material-icons close
          div.col.m12.l2
            a(href="javascript:void(0);", v-on:click="showAscended = !showAscended", style="width: 100%; text-align: center;").btn-flat.waves-effect.waves-orange {{ searchButtonTitle() }}

  //- Hero Card
  div.row
    div(v-for="(hero, index) in heroes", v-cloak).col.s4.m2.l1
      div.card(v-on:click="setSelectedHero(hero, index)", data-target="heroModal", :class="{ 'z-depth-5': selectedHero == hero }")
        div.card-image
          img(v-lazy="'img/avatars/' + hero.avatars.base", v-if="hero.canAscend === false")
          img(v-lazy="'img/avatars/' + hero.avatars.base", v-show="showAscended === false", v-if="hero.canAscend === true")
          img(:src="'img/avatars/' + hero.avatars.ascended", v-show="showAscended === true", v-if="hero.canAscend === true")
          div.star-bar
            img.stars(v-lazy="getStarsLazyConfig(hero)", v-if="hero.canAscend === false")
            img.stars(v-lazy="getStarsLazyConfig(hero)", v-show="showAscended === false", v-if="hero.canAscend === true")
            img.stars(:src="'img/stars/' + hero.naturalStars + 'star_awakened.png'", v-show="showAscended === true", v-if="hero.canAscend === true")
          div.shade
          div.view-container
            i.material-icons search

  //- Hero Modal
  div#heroModal.modal.bottom-sheet
    div.modal-content(v-if="selectedHero != null")
      div.hero-title
        h4 
          | {{ getHeroName(selectedHero) }}
          span.small.grey-text.darken-2 {{ selectedHero.className }} ({{ selectedHero.heroType[0].toUpperCase() + selectedHero.heroType.substring(1).toLowerCase() }})
        div.view-toggle
          a(href="javascript:void(0);", v-if="showRatings === true", v-on:click="showRatings = !showRatings") Hero Info
          span.showing(v-if="showRatings === false") Hero Info
          span.separator |
          a(href="javascript:void(0);", v-if="showRatings === false", v-on:click="showRatings = !showRatings") Hero Ratings
          span.showing(v-if="showRatings === true") Hero Ratings
      div.row
        div.col.s2
          div.avatar-container
            img(:src="'img/avatars/' + selectedHero.avatars.base", v-if="selectedHero.canAscend === false")
            img(:src="'img/avatars/' + selectedHero.avatars.base", v-show="showAscended === false", v-if="selectedHero.canAscend === true")
            img(:src="'img/avatars/' + selectedHero.avatars.ascended", v-show="showAscended === true", v-if="selectedHero.canAscend === true")
            a(href="javascript:void(0);", :class="{ disabled: selectedIndex <= 0 }", v-on:click="previousHero()").nav.previous.btn.white.waves-effect.waves-orange.hide-on-med-and-down
              i.material-icons chevron_left
            a(href="javascript:void(0);", :class="{ disabled: selectedIndex >= heroes.length - 1 }", v-on:click="nextHero()").nav.next.btn.white.waves-effect.waves-orange.hide-on-med-and-down
              i.material-icons chevron_right

        list-hero-info(:hero="selectedHero", :ascended="showAscended", v-if="showRatings === false")
        list-hero-ratings(:hero="selectedHero", v-if="showRatings === true")

      //- Row
      div.element
        img(:src="'img/' + getElementImage(selectedHero)")
</template>

<!--
  Style
-->
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
  max-height: 50%;
  height: 50%;
  overflow-x: hidden;

  h4, h6, span {
    color: #212121;
  }

  .hero-title {
    h4 {
      display: inline-block;

      span.small {
        margin-left: 1rem;
        font-size: 1.54rem;
        vertical-align: middle;
      }
    }

    .view-toggle {
      float: right;
      margin-right: 100px;
      height: 100%;
      display: inline-block;
      margin-top: 0.64rem;

      .separator {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        color: #dddddd;
        font-weight: bold;
      }
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

<!--
  Script
-->
<script>
import { Session } from 'meteor/session';
import { Heroes } from '/imports/api/heroes/heroes';

import ListHeroInfo from '/imports/ui/heroes/components/ListHeroInfo.vue';
import ListHeroRatings from '/imports/ui/heroes/components/ListHeroRatings.vue';

Session.setDefault('hearoSearchText', '');

export default {
  components: { ListHeroInfo, ListHeroRatings },
  data() {
    return { 
      selectedHero: null,
      selectedIndex: -1,
      showAscended: false,
      showRatings: false,
      searchText: '',
      initialHero: null,
      heroes: [],
    };
  },
  watch: {
    heroes(newValue) {
      if ( (newValue != null && newValue.length > 0) && (this.initialHero != null) ) {
        const heroName = this.unsanitizeName(this.initialHero);
        this.initialHero = null;

        newValue.forEach((hero, index) => {
          if ( hero.name.toLowerCase() === heroName.toLowerCase() ) {
            this.setSelectedHero(hero, index);
            $('#heroModal').modal('open');
            return;
          }
        });
      }
    }
  },
  methods: {
    sanitizeName(heroName) {
      return heroName.replace(/\s/gi, '_');
    },
    unsanitizeName(heroName) {
      return heroName.replace(/_/gi, ' ');
    },
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
    setSelectedHero(hero, index) {
      this.selectedHero = hero;
      this.selectedIndex = index;

      this.$router.replace({
        query: {
          hero: this.sanitizeName(hero.name)
        }
      });
    },
    previousHero() {
      this.setSelectedHero(this.heroes[this.selectedIndex - 1], this.selectedIndex - 1)
    },
    nextHero() {
      this.setSelectedHero(this.heroes[this.selectedIndex + 1], this.selectedIndex + 1)
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
            $and: [
              {
                $or: [
                  { name: { $regex: searchText, $options: "ig" } },
                  { className: { $regex: searchText, $options: "ig" } }
                ]
              },
              { naturalStars: { $gt: 2 } }
            ]
          }, {
            sort: {
              elementSort: 1,
              naturalStars: 1,
              className: 1
            }
          });
        }
      }
    }
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
        that.showRatings = false;

        that.$router.replace({
          query: {}
        });
      }
    });

    this.initialHero = this.$route.query.hero;
  }
};
</script>