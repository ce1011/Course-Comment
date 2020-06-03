<template>
  <div>
    <v-container> </v-container>

    <v-container v-if="showCourse">
      <v-card>
        <v-card-title>Course Information</v-card-title>
        <v-row
          ><v-col>
            <v-list-item
              ><v-list-item-title
                >Course Code: {{ courseData[0].courseCode }}</v-list-item-title
              ></v-list-item
            >
          </v-col>
          <v-col>
            <v-list-item
              ><v-list-item-title
                >Course Name: {{ courseData[0].courseName }}</v-list-item-title
              ></v-list-item
            >
          </v-col>
        </v-row>
        <v-row
          ><v-col>
            <v-list-item
              ><v-list-item-title
                >Course Cluster:
                {{ courseData[0].courseCluster }}</v-list-item-title
              ></v-list-item
            >
          </v-col>
          <v-col>
            <v-list-item
              ><v-list-item-title
                >China Related:
                {{ courseData[0].chinaRelated }}</v-list-item-title
              ></v-list-item
            >
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer
          ><v-btn text color="#8c1f31" @click="commentBox = true"
            >Add Review</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-container>

    <v-container v-if="showComment">
      <v-card
        ><v-card-title>Course Review</v-card-title
        ><v-container>
          <v-card v-for="comment in comment" :key="comment.commentNumber">
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
                    >Sem {{ comment.Semester }} / {{ comment.year }} Posted at
                    {{ comment.postDate }}</v-chip
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
          </v-card> </v-container
      ></v-card>
    </v-container>

    <v-container v-if="comment == null">
      <v-card
        ><v-card-title>There has no any review now</v-card-title></v-card
      ></v-container
    >

    <v-dialog v-model="commentBox" max-width="50%">
      <v-card>
        <v-card-title>Add Review</v-card-title>
        <v-container>
          <v-form>
            <v-container>
              <v-row>
                <v-textarea
                  label="Review"
                  v-model="commentInfo.content"
                ></v-textarea>
              </v-row>
              <v-row
                ><v-col
                  >
                  <v-select :items="avalibleGrade" label="Grade" v-model="commentInfo.grade"></v-select
                    >
                </v-col>
                <v-col>
                <v-select :items="avalibleYear" label="Year" v-model="commentInfo.year"></v-select
                ></v-col>

                <v-col>
                  <v-select :items="avalibleSem" label="Semester" hint="If you study at Summer term, choose 3" v-model="commentInfo.sem"></v-select
                  ></v-col>
              </v-row>
              <v-row>
                <span>Rating: </span
                  ><v-rating
                    color="yellow"
                    v-model="commentInfo.rating"
                  ></v-rating
                >
              </v-row>
              <v-row><v-spacer></v-spacer><v-btn @click="submitReview">Submit</v-btn></v-row>
              </v-container
          ></v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiCommentMultipleOutline } from "@mdi/js";
var serverDomain = require("../server.js");

export default {
  name: "Comment",

  components: {},

  data: () => ({
    showComment: false,
    showCourse: false,
    comment: null,
    courseData: null,
    commentIcon: mdiCommentMultipleOutline,
    commentBox: false,
    commentInfo: {
      content: null,
      rating: 5,
      grade: null,
      year: null,
      sem: null
    },
    avalibleYear: [2012,2013,2014,2015,2016,2017,2018,2019,2020],
    avalibleSem: [1,2,3],
    avalibleGrade: ["A+","A","B+","B","C+","C","D+","D","F"]
  }),

  created() {
    this.getCommentData();
    this.getCourseData();
  },
  methods: {
    getCommentData: function() {
      fetch(
        "http://" +
          serverDomain +
          "/getCommentByCourse.php?courseCode=" +
          this.$route.params.courseCode
      )
        .then((res) => res.json())
        .then((jsonData) => {
          this.comment = jsonData;
          this.showComment = true;
        });
    },
    getCourseData: function() {
      fetch(
        "http://" +
          serverDomain +
          "/getCourseDataByCourse.php?courseCode=" +
          this.$route.params.courseCode
      )
        .then((res) => res.json())
        .then((jsonData) => {
          this.courseData = jsonData;

          this.showCourse = true;
        });
    },
    submitReview: function() {
      fetch(
        "http://" +
          serverDomain +
          "/submitComment.php?courseCode=" +
          this.$route.params.courseCode + "&content=" + this.commentInfo.content + "&rating=" + this.commentInfo.rating + "&year=" + this.commentInfo.year+ "&sem=" + this.commentInfo.sem + "&grade=" + this.commentInfo.grade
      )
        .then(()=>{
          this.getCommentData();
          this.commentBox = false
        })
    },
  },
};
</script>
