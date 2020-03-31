<template>
  <section class="main-content">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <b-button
            variant="grey"
            size="sm"
            :to="{ name: 'account' }"
            class="mb-3"
          >
            <font-awesome-icon icon="angle-left" fixed-width />
            Back
          </b-button>

          <h1>Create Note</h1>

          <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" v-model="note.title" />
          </div>

          <div class="form-group">
            <label>Content</label>
            <textarea class="form-control" v-model="note.content"></textarea>
          </div>
          <button
            id="create-note-button"
            @click="createNote"
            class="btn btn-block"
            :class="['btn-' + theme.btn.main]"
          >
            <font-awesome-icon icon="save" fixed-width /> Save
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: "editNote",
  data() {
    return {
      note: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    async createNote() {
      if (!this.note.title || !this.note.content) {
        this.$toasted.error("Title and Content need to be filled out.");
        return;
      }

      try {
        const responseCreate = await this.$store.dispatch(
          "note/createNote",
          this.note
        );
        let insertId = responseCreate.data.id;
        const responseResult = await this.$store.dispatch(
          "note/getNote",
          insertId
        );
        await this.$store.dispatch("note/addNoteToStack", responseResult);
        this.$router.push({ name: "account" });
        this.$toasted.success("Note created.");
      } catch (error) {
        this.$toasted.error("There was an error connecting to the server.");
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      notes: "note/notes"
    }),
    ...mapState({
      theme: state => state.common.theme,
    }),
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/components/_variables.scss";
</style>
