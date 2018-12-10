<template>
	<div id="contact">
		<VFormInput label="Имя" name="name" :invalid="!nameValidation" :showValidate="showValid" />
		<VFormInput label="Фамилия" name="surname" :invalid="!surnameValidation" :showValidate="showValid"/>
		<VFormInput label="Телефон" name="phone" :invalid="!phoneValidation" placeholder="+7(999) 999-99-99" :showValidate="showValid" />
		<VFormInput label="Email" name="email" :invalid="!emailValidation" placeholder="example@example.com" :showValidate="showValid" />
		<router-link :to="{name: 'delivery'}" type="button" tag="button" class="btn">Продолжить</router-link>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import VFormInput from "../components/VFormInput";
import VFormMixin from "../mixins/VFormMixin";

export default {
  name: "Contact",
  components: { VFormInput },
  mixins: [VFormMixin],
  mounted: function() {
    if (this.contactPageValidate) {
      this.showValid = true;
    }
    this.$store.dispatch("setFormStep", { step: "step1" });
  },
  computed: {
    ...mapGetters(["form"])
  }
};
</script>

<style scoped>
</style>
