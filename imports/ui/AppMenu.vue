<!--
  Script
-->
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
          li
            a.dropdown-button(href="javascript:void(0);", data-activates="signInDropdown") 
              | Sign In
              i.material-icons.right arrow_drop_down
            ul#signInDropdown.dropdown-content
              li
                a(href="javascript:void(0);", style="color: #D34836;")
                  i.material-icons.zmdi.zmdi-google
                  | Google
              li
                a(href="javascript:void(0);", style="color: #3B5998;")
                  i.material-icons.zmdi.zmdi-facebook
                  | Facebook
              li
                a(href="javascript:void(0);", style="color: #1DA1F2;")
                  i.material-icons.zmdi.zmdi-twitter
                  | Twitter
</template>

<!--
  Script
-->
<style lang="less" scoped>
#signInDropdown {
  width: auto !important;

  li > a {
    > i {
      display: inline-block;
      vertical-align: middle;
      margin-top: -4px;
      width: 2.5rem;
    }
  }
}
</style>

<!--
  Script
-->
<script>
export default {
  mounted() {
    setTimeout(() => {
      $('.dropdown-button').dropdown({
        constrainWidth: false,
        belowOrigin: true,
      });
    }, 500);
  }
};
</script>