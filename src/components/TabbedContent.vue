<template>
    <div class="tabbed-content">
        <div class="tabbed-content__tabs">
            <a  v-for="(name, i) in names" @click="setTab(i)" :class="isActive(i)" :key="name">{{name}}</a>
        </div>
        <div class="tabbed-content__content">
            <component v-bind="selectedProps" :is="selectedComponent" />
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import NullComponent from "./NullComponent";
export default {
  props: {
    data: {
      type: Array,
      default: () => [{ name: "null", component: NullComponent, props: null }]
    }
  },
  data() {
    return {
      selected: 0
    };
  },
  computed: {
    names() {
      return _.map(this.data, "name");
    },
    selectedData() {
      return this.data[this.selected];
    },
    selectedComponent() {
      return this.selectedData.component;
    },
    selectedProps() {
      return this.selectedData.props;
    }
  },
  methods: {
    isActive(selection) {
      return selection === this.selected ? "active" : "";
    },
    setTab(selection) {
      if (this.selected !== selection) this.selected = selection;
    }
  }
};
</script>


<style lang="scss">
.tabbed-content {
  margin: 4rem auto;
  width: 95%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
  @include respond(tab-land) {
    max-width: 62rem;
    min-width: 42rem;
  }
  &__tabs {
    overflow: hidden;
    margin-left: 20px;
    margin-bottom: -2px; // hide bottom border
    a {
      float: left;
      cursor: pointer;
      padding: 12px 24px;
      transition: background-color 0.2s;
      border: 1px solid #ccc;
      border-right: none;
      background-color: #f1f1f1;
      border-radius: 10px 10px 0 0;
      font-weight: bold;
      &:last-child {
        border-right: 1px solid #ccc;
      }
      &:hover {
        background-color: #aaa;
        color: #fff;
      }
      &.active {
        background-color: #fff;
        color: #484848;
        border-bottom: 2px solid #fff;
        cursor: default;
      }
    }
  }
  &__content {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #e1e1e1;
  }
}

/* .tabs ul {
  list-style-type: none;
  margin-left: 20px;
} */

/* Change background color of tabs on hover */
/* Styling for active tab */
/* Style the tab content */
</style>
