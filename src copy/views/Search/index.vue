<template>
  <div>
    <TypeNav />
    <SearchSelector />
  </div>
</template>

<script>
import SearchSelector from "@views/Search/SearchSelector";
import TypeNav from "@comps/TypeNav";
export default {
  name: "Search",
  components: {
    TypeNav,
    SearchSelector,
  },
};
</script>

<style scoped>
</style>
