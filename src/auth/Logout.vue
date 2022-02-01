<template>
  <div>logout</div>
</template>

<script>
export default {
  name: "logout",
  created() {
    this.$store.dispatch("destroyToken").then(() => {
      this.$router.push({ name: "login" });
    });
  },
};
</script>
