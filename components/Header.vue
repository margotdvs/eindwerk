<template>
  <div class="header-container">
    <div class="logo">Gamerviews</div>
    <div class="row-nav">
      <div class="nav">
        <NuxtLink :class="'nav-item'" to="/"> Home </NuxtLink>
        <NuxtLink :class="'nav-item'" to="/games"> Games </NuxtLink>
        <NuxtLink :class="'nav-item'" to="/contact"> Contact </NuxtLink>
      </div>
      <div v-if="!authStore.isLoggedIn" class="nav">
        <NuxtLink :class="'nav-item'" to="/login"> Login </NuxtLink>
      </div>
      <div v-else class="nav">
        <NuxtLink :class="'nav-item'" to="/profile"> Profile </NuxtLink>
        <NuxtLink :class="'nav-item'" to="/profile/games/add">
          Add Game
        </NuxtLink>
      </div>
    </div>
    <div class="hamburger-wrap">
      <button class="hamburger" @click="menuOpen = !menuOpen">
        <span class="hamburger__line"></span>
        <span class="hamburger__middle"></span>
        <span class="icon-bar hamburger__line"></span>
      </button>
    </div>
  </div>
  <div class="dropdown" :class="{ 'dropdown-after': menuOpen }">
    <ul class="navlist">
      <li class="navlistitem">
        <NuxtLink
          :class="'navitem-dropdown'"
          to="/"
          @click="menuOpen = !menuOpen"
        >
          Home
        </NuxtLink>
      </li>
      <li class="navlistitem">
        <NuxtLink
          :class="'navitem-dropdown'"
          to="/games"
          @click="menuOpen = !menuOpen"
        >
          Games
        </NuxtLink>
      </li>
      <li class="navlistitem">
        <NuxtLink
          :class="'navitem-dropdown'"
          to="/contact"
          @click="menuOpen = !menuOpen"
        >
          Contact
        </NuxtLink>
      </li>
      <li v-if="!authStore.isLoggedIn" class="navlistitem">
        <NuxtLink
          :class="'navitem-dropdown'"
          to="/login"
          @click="menuOpen = !menuOpen"
        >
          Login
        </NuxtLink>
      </li>
      <li v-else class="navlistitem">
        <NuxtLink
          :class="'navitem-dropdown'"
          to="/profile"
          @click="menuOpen = !menuOpen"
        >
          Profile
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { useAuthStore } from '~/stores/auth.js';

export default {
  name: 'Header',
  data() {
    return {
      menuOpen: false,
      authStore: useAuthStore(),
    };
  },
};
</script>

<style lang="scss">
.header-container {
  // padding: 0.25rem 0;
  padding: 12px 0 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  margin: 4rem 0;
}

.logo {
  padding: 0 2rem;
  color: white;
}

.nav {
  &-item {
    text-decoration: none;
    color: white;
    font-weight: 700;
    padding: 12px 16px;
    margin: 0 8px;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      transition: 0.2s;
      border-radius: 25px;
    }
    &:hover {
      &::before {
        background: linear-gradient(to bottom, #e8edec, #d2d1d3);
        box-shadow: 0px 3px 20px 0px black;
        transform: scale(1.2);
      }
      color: black;
    }
  }
}

.hamburger {
  width: 45px;
  height: 45px;
  background-color: transparent;
  border: transparent;
  margin-right: 32px;
  cursor: pointer;
}

.hamburger-wrap {
  display: flex;
  align-items: center;

  @media screen and (min-width: 800px) {
    display: none;
  }
}

.hamburger__line,
.hamburger__middle {
  display: block;
  width: 30px;
  height: 2px;
  border-radius: 2px;
  background-color: white;
  margin-top: 7px;
  margin-bottom: 7px;
}

.hamburger__middle {
  width: 20px;
  margin-left: 10px;
}

.dropdown {
  margin-top: -20px;
  height: 0px;
  transition: height 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.dropdown-after {
  height: calc(100vh - 50px);
  transition: height 0.2s ease;
}

.navlist {
  list-style: none;
}

.navlistitem {
  text-align: center;
  padding: 1rem 0;

  &:last-of-type {
    padding: 5rem 0;
  }
}

.navitem-dropdown {
  text-decoration: none;
  color: white;
}

.row-nav {
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 800px) {
    display: none;
  }
}
</style>
