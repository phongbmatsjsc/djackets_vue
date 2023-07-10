<template>
    <div class="level">
        <div class="level-left">
        <div class="level-item">
            <form>
            <div class="field has-addons">
                <div class="control">
                <input
                    type="text"
                    class="input"
                    placeholder="Search exercise here"
                    name="query"
                    v-model="querySearch"
                />
                </div>
                <div class="control">
                <button
                    class="button is-success"
                    @click.prevent="performSearch(querySearch)"
                >
                    <span class="icon"><i class="fas fa-search"></i></span>
                </button>
                </div>
            </div>
            </form>
        </div>
        </div>

        <div class="level-right">
            <div
                class="level-item button is-success"
                v-for="type in exerciseTypes"
                :key="type.id"
                @click="getExercises(`${type.link}`)"
            >
                {{ type.name }}
            </div>
        </div>
    </div>

    <div class="columns is-multiline">
        <div class="column is-12">
            <div class="column is-4">
                <div v-for="ex in exercises" :key="ex.id" class="card">
                    <div class="card-image">
                    <figure class="image">
                        <img :src="ex.get_thumbnail" />
                    </figure>
                    </div>
                    <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                        <p class="title is-4">{{ ex.name }}</p>
                        <p class="subtitle is-6">Other muscles: {{ ex.others }}</p>
                        </div>
                    </div>
            
                    <div class="content">
                        {{ ex.instruction }}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import { ref } from "vue";
export default {
  name: "Exercises",
  data() {
    return {
      exerciseTypes: [],
    };
  },
  setup() {
    const exercises = ref([]);
    const querySearch = ref("");
    return {
      exercises,
      querySearch,
    };
  },
  mounted() {
    document.title = "Exercises Library | TheMuscleShop";
    this.getAllExercisesType();
  },
  methods: {
    async getAllExercisesType() {
      axios
        .get("/api/v1/type-exercise/")
        .then((response) => {
          this.exerciseTypes = response.data.map((item) => {
            return { name: item.name, link: item.name.toLowerCase() };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getExercises(type) {
      this.$store.commit("setIsLoading", true);
      axios
        .get(`/api/v1/exercises/${type}`)
        .then((response) => {
          this.exercises = response.data.exercises;
        })
        .catch((error) => {
          console.log(error);
          toast({
            message: "Something went wrong. Please try again.",
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
        });
      this.$store.commit("setIsLoading", false);
    },

    async performSearch(query) {
      this.$store.commit("setIsLoading", true);
      console.log(query);
      await axios
        .get(`/api/v1/exercises/exercise-search?query=${query}`)
        .then((response) => {
          this.exercises = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
