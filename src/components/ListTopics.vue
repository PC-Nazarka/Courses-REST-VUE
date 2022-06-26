<template>
  <div class="py-2" v-if="this.topics.length">
    <draggable
      class="dragArea list-group w-full"
      :list="this.topics"
      @change="this.changeIndex"
    >
      <topic-items
        class="list-styles"
        v-for="topic of this.topics"
        :key="topic.id"
        :topic="topic"
        @edit="this.editTopic"
        @remove="this.removeTopic"
      ></topic-items>
    </draggable>
  </div>
  <div class="py-2" v-else>Темы отсутствуют</div>
</template>

<script>
import TopicItem from "@/components/TopicItem.vue";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  name: "TopicItem",
  components: {
    "topic-items": TopicItem,
    draggable: VueDraggableNext,
  },
  props: {
    topics: Array,
  },
  data() {
    return {
      enabled: true,
      dragging: false,
    };
  },
  methods: {
    editTopic(topic) {
      this.$emit("edit", topic);
    },
    removeTopic(topic) {
      this.$emit("remove", topic);
    },
    changeIndex(event) {
      let currentTopic = this.topics.filter(
        (topic) => topic.number === event.moved.newIndex
      )[0];
      event.moved.element.number = event.moved.newIndex;
      currentTopic.number = event.moved.oldIndex;
    },
  },
};
</script>
