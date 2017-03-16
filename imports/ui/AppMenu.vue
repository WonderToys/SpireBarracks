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

          //- Sign Out
          li(v-if="user != null")
            a.dropdown-button(href="javascript:void(0);", data-activates="userDropdown") 
              | {{ allianceName || 'Sign Out' }}
              i.material-icons.right arrow_drop_down
            ul#userDropdown.dropdown-content
              li
                a(href="javascript:void(0);", v-on:click="logout()") Logout

          //- Sign In
          li(v-if="user == null")
            a.dropdown-button(href="javascript:void(0);", data-activates="signInDropdown") 
              | Sign In
              i.material-icons.right arrow_drop_down
            ul#signInDropdown.dropdown-content
              li
                a(href="javascript:void(0);", style="color: #D34836;", v-on:click="loginWithGoogle()")
                  i.material-icons.zmdi.zmdi-google
                  | Google
              li
                a(href="javascript:void(0);", style="color: #3B5998;", v-on:click="loginWithFacebook()")
                  i.material-icons.zmdi.zmdi-facebook
                  | Facebook

  //- Alliance Name Modal
  div#allianceNameModal.modal
    div.modal-content
      div.row
        div.input-field.col.s12
          input#allianceName(type="text", placeholder="What's your Allliance username? (Required)", v-model="tempAllianceName")
          label(for="allianceName") Alliance Username

    div.modal-footer
      a(href="javascript:void(0);").modal-action.modal-close.waves-effect.waves-orange.btn-flat Save
</template>

<!--
  Style
-->
<style lang="less">
#allianceNameModal {
  width: 30%;

  .modal-content {
    padding-bottom: 0;

    .row {
      margin: 0;
    }
  }
}

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

#toast-container {
  max-width: 25%;
  cursor: pointer;

  a {
    color: white !important;
    text-decoration: underline;
  }
}
</style>

<!--
  Script
-->
<script>
import { Meteor } from 'meteor/meteor';

let toast = null;

export default {
  data() {
    return { 
      allianceName: '',
      tempAllianceName: ''
    };
  },
  methods: {
    // TODO: This is a mess. Shoot me.
    _showUserModal() {
      const user = Meteor.user();
      if ( user != null ) {
        const currentName = (user.profile || {}).allianceName;
        this.allianceName = currentName;

        if ( currentName == null || currentName.length === 0 ) {
          const userId = Meteor.userId();
          const that = this;

          this.tempAllianceName = this.allianceName;
          $('#allianceNameModal').modal({
            complete() {
              if ( that.tempAllianceName == null || that.tempAllianceName.length === 0 ) {
                return that.logout();
              }

              that.allianceName = that.tempAllianceName;
              Meteor.call('updateAllianceName', { name: that.tempAllianceName, userId });
            }
          })
          .modal('open');
        }
      }
      else {
        this.allianceName = null;
      }

      this.tempAllianceName = null;
    },
    _handleLogin(err) {
      if ( err == null ) {
        this._showUserModal();
      }
    },
    logout() {
      Meteor.logout();
    },
    loginWithGoogle() {
      Meteor.loginWithGoogle(this._handleLogin)
    },
    loginWithFacebook() {
      Meteor.loginWithFacebook(this._handleLogin);
    }
  },
  meteor: {
    data: {
      user() {
        this._showUserModal();
        return Meteor.user();
      }
    }
  },
  mounted() {
    setTimeout(() => {
      $('.dropdown-button').dropdown({
        constrainWidth: false,
        belowOrigin: true,
      });
    }, 500);

    const shownToast = localStorage.getItem('shownToast');
    if ( shownToast === 'true' ) return;

    const $toastContent = $(`
      <div style="word-break: break-word;">
        <span style="font-weight: bold">Hey Guys!</span> The first pass of hero ratings has been released. It's not perfect, and it may be 
        a little buggy, but it's a start! Try it out and let me know on <a href="http://discord.gg/NNpJvvk" target="_blank">Discord</a> 
        if you find any problems! Enjoy!
      </div>
    `).on('click', () => {
      $('.alert-toast').animate({
          marginTop: '-40px',
          opacity: '0'
        },
        {
          duration: 375,
          easing: 'easeOutExpo',
          queue: false,
          complete() {
            $('#tooltip-container').remove();
          }
        });
    });

    Materialize.toast($toastContent, 60000, 'orange darken-2 alert-toast');
    localStorage.setItem('shownToast', true);
  },
  updated() {
    $('.dropdown-button').dropdown({
      constrainWidth: false,
      belowOrigin: true,
    });
  }
};
</script>