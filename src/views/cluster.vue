<template>
  <div class="cluster">
    <v-container>
      <h1>Cluster {{ $route.params.clusterID }}</h1>
      <v-card
        ripple
        hover
        v-for="course in courseList"
        :key="course.courseCode"
        :to="'/comment/'+ course.courseCode"
      >
        <v-container>
          <v-row>
            <v-card-title>{{ course.courseName }}</v-card-title>
          </v-row>
          <v-row>
            <v-card-subtitle>{{ course.courseCode }}</v-card-subtitle>
            <v-icon dark medium>mdi-comments-outline</v-icon>
          </v-row>
          <v-row v-if="course.chinaRelated == 'N'">
            <v-col>
              <v-chip color="grey" right text-color="white" label
                >Non-China-Related</v-chip
              >
            </v-col>
            <v-col>
              <v-icon>{{ commentIcon }}</v-icon>
              <span>{{ course.commentAmount }}</span>
            </v-col>
          </v-row>
          <v-row v-if="course.chinaRelated == 'Y'">
            <v-col right class="align-end">
              <v-chip color="red" right text-color="white" label
                >China-Related</v-chip
              >
            </v-col>
            <v-col>
              <v-icon>{{ commentIcon }}</v-icon>
              <span>{{ course.commentAmount }}</span>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mdiCommentMultipleOutline } from "@mdi/js";
var serverDomain = require("../server.js");

export default {
  name: "Cluster",

  components: {},

  data: () => ({
    courseList: null,
    commentIcon: mdiCommentMultipleOutline,
  }),

  created() {
    this.getCourseData();
  },

  watch: {
    $route: "getCourseData",
  },
  methods: {
    getCourseData: function() {
      fetch(
        "http://" +
          serverDomain +
          "/getClusterCourse.php?cluster=" +
          this.$route.params.clusterID
      )
        .then((res) => res.json())
        .then((jsonData) => {
          this.courseList = jsonData;
        });
    },
  },
};
</script>
