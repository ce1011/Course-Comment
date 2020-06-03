<template>
  <v-app>
    <v-navigation-drawer temporary v-model="drawer" app>
      <v-list>
              <v-list-item link to="/">
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/cluster/A">
          <v-list-item-content>
            <v-list-item-title>Cluster A</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/cluster/B">
          <v-list-item-content>
            <v-list-item-title>Cluster B</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/cluster/C">
          <v-list-item-content>
            <v-list-item-title>Cluster C</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/cluster/D">
          <v-list-item-content>
            <v-list-item-title>Cluster D</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/cluster/E">
          <v-list-item-content>
            <v-list-item-title>Cluster E</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon v-on:click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Course Comment</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false,
  }),
};
</script>
