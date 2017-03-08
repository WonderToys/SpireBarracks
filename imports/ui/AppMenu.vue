<template lang="jade">
div.app-navigation
  div.navbar-fixed
    nav.deep-purple.darken-1
      div.nav-wrapper.container
        a.brand-logo(href="#") SpireBarracks
        ul.right
          router-link(tag="li", to="/heroes")
            a Heroes
          li: a(href="#") Data Logs
          li: a(href="#") Sign In
</template>