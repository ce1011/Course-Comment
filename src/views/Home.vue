<template>
  <div class="home">
    <v-container>
      <H1>HKCC Course Comment</H1>
      <v-row>
        <v-text-field solo label="Search" v-model="search"></v-text-field>
      </v-row>
      <v-row>
        <v-card>
          <v-list v-if="showSearchList">
            <v-list-item
              v-for="course in filteredList"
              :key="course.courseCode"
              link
              :to="'/comment/' + course.courseCode"
            >
              <v-list-item-title
                >{{ course.courseCode }}
                {{ course.courseName }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Most comment course</v-card-title>
            <v-container>
              <v-card
                v-for="course in mostCommentCourse"
                :key="course.courseCode"
                link
                :to="'/comment/' + course.courseCode"
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
          </v-card>
        </v-col>

        <v-col>
          <v-card>
            <v-card-title>Latest Comment</v-card-title>
            <v-container>
              <v-card
                v-for="comment in newestComment"
                :key="comment.commentNumber"
                link
                :to="'/comment/' + comment.courseCode"
              >
                <v-card-title>{{ comment.courseCode }}</v-card-title>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-avatar color="orange">
                        <span class="white--text headline">{{
                          comment.Grade
                        }}</span>
                      </v-avatar>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col wrap
                      ><span>{{ comment.content }}</span></v-col
                    ></v-row
                  >
                  <v-divider></v-divider>
                  <v-row>
                    <v-col>
                      <v-chip
                        >Sem {{ comment.Semester }} / {{ comment.year }} Posted
                        at {{ comment.postDate }}</v-chip
                      ></v-col
                    >
                    <v-col>
                      <span>Rating: </span>
                      <v-rating
                        :value="comment.rating"
                        readonly
                        color="yellow"
                      ></v-rating
                    ></v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
var serverDomain = require("../server.js");
import { mdiCommentMultipleOutline } from "@mdi/js";

export default {
  name: "Home",
  data: () => ({
    mostCommentCourse: null,
    newestComment: null,
    commentIcon: mdiCommentMultipleOutline,
    filteredList: null,
    search: null,
    courseList: null,
    showSearchList: false,
  }),
  components: {},
  watch: {
    search: "searchCourse",
  },
  created() {
    fetch("http://" + serverDomain + "/getAllCourse.php")
      .then((res) => res.json())
      .then((jsonData) => {
        this.courseList = jsonData;
      });

    this.getMostCommentCourse();
    this.getNewestComment();
  },
  methods: {
    getMostCommentCourse: function() {
      fetch("http://" + serverDomain + "/getMostCommentCourse.php")
        .then((res) => res.json())
        .then((jsonData) => {
          this.mostCommentCourse = jsonData;
        });
    },

    getNewestComment: function() {
      fetch("http://" + serverDomain + "/getNewestComment.php")
        .then((res) => res.json())
        .then((jsonData) => {
          this.newestComment = jsonData;
        });
    },

    searchCourse: function() {
      this.filteredList = [];

      if (this.search != "") {
        for (const element of this.courseList) {
          if (
            element.courseName.search(this.search) != -1 ||
            element.courseCode.search(this.search) != -1
          ) {
            this.filteredList.push(element);
          }
        }
        this.showSearchList = true
      }else{
        this.showSearchList = false
      }

      console.log(this.filteredList);
    },
  },
};
</script>
