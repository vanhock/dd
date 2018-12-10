<template>
	<div id="delivery">
		<div class="form-item">
			<input type="radio"
						 name="address-toggle"
						 @click="showAdress = true; setFormField('delivery','true')"
						 id="toggle_delivery" checked/>
			<label for="toggle_delivery">Доставка</label>
		</div>
		<div class="form-item">
			<input type="radio"
						 name="address-toggle"
						 @click="showAdress = false; setFormField('delivery','false')"
						 id="toggle_pickup"/>
			<label for="toggle_pickup">Самовывоз</label>
		</div>
		<div v-show="showAdress">
			<div class="row">
				<div class="col-md-4">
					<div class="form-item">
						<VFormInput label="Страна"
												name="country"
												type="select"
												:options="countries"
												:invalid="!countryValidation"  />
					</div>
				</div>
				<div class="col-md-4">
					<VFormInput label="Город"
											name="city"
											placeholder="Москва"
											:invalid="!cityValidation" />
				</div>
				<div class="col-md-4">
					<VFormInput
									label="Индекс"
									name="index"
									placeholder="153511"
									:invalid="!indexValidation" />
				</div>
			</div>
			<VFormInput label="Адрес"
									name="address"
									placeholder="Улица космонавтов, 43"
									:invalid="!addressValidation" />
			<VFormInput label="Дата доставки"
									name="date"
									placeholder="24/05/2018"
									:invalid="!dateValidation" />
			<VFormInput label="Комментарий к заказу"
									type="textarea" name="comment"
									placeholder="Ваш комментарий здесь" />
		</div>

		<button type="button" class="btn proceed" @click="checkout">Оформить заказ</button>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import VFormMixin from "../mixins/VFormMixin";
import VFormInput from "../components/VFormInput";
export default {
  name: "Delivery",
  components: { VFormInput },
  mixins: [VFormMixin],
  mounted: function() {
    if (!this.contactPageValidate) {
      this.$router.push("/");
    }
    this.$store.dispatch("setFormStep", { step: "step2" });
  },
  data() {
    return {
      showAdress: true,
      countries: ["Россия", "Польша", "США"]
    };
  },
  computed: {
    ...mapGetters(["form"])
  },
  methods: {
    checkout: function() {
      let formData = this.form.formToSend;
      if (!this.addressPageValidate) {
        return this.focusOnInvalid();
      }
      fetch("test.php", {
        method: "POST",
        body: formData
      })
        .then(r => {
          if (r.ok) {
            return r.json();
          }
        })
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/libs/grid.min";
.proceed {
  margin-top: 35px;
}
</style>
