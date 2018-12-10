<script>
import { mapGetters } from "vuex";
import { debounce } from "../modules/utils";

const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  name: "VFormMixin.vue",
  data() {
    return {
      showValid: false
    };
  },
  computed: {
    ...mapGetters(["form"]),
    emailValidation: function() {
      return this.checkField("email") && emailRE.test(this.form.fields.email);
    },
    phoneValidation: function() {
     return this.checkField("phone") &&
        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm.test(
          this.form.fields.phone
        );
    },
    nameValidation: function() {
      return this.textLengthValidate("name");
    },
    surnameValidation: function() {
      return this.textLengthValidate("surname");
    },
    countryValidation: function() {
      return this.checkField("country");
    },
    cityValidation: function() {
      return this.textLengthValidate("city");
    },
    indexValidation: function() {
      return (
        this.textLengthValidate("index") &&
        /^\d+$/.test(this.form.fields.index) &&
        this.form.fields.index.length <= 6
      );
    },
    addressValidation: function() {
      return this.textLengthValidate("address");
    },
    dateValidation: function() {
      return (
        this.textLengthValidate("date") &&
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(
          this.form.fields.date
        )
      );
    },
    contactPageValidate: function() {
      return (
        this.emailValidation &&
        this.phoneValidation &&
        this.nameValidation &&
        this.surnameValidation
      );
    },
    addressPageValidate: function() {
      return (
        this.countryValidation &&
        this.cityValidation &&
        this.addressValidation &&
        this.dateValidation &&
        this.indexValidation
      );
    }
  },
  beforeRouteLeave(to, from, next) {
		if (!this.contactPageValidate && to.name === "delivery") {
			next(false);
			this.focusOnInvalid()
		} else {
			next();
		}
	},
  methods: {
    focusOnInvalid: function() {
      const invalid = document.querySelector("input[invalid]");
      invalid && invalid.focus();
    },
    getFormField: function(name) {
      return (this.form && this.form.fields && this.form.fields[name]) || "";
    },
    setFormField: debounce(function(name, value) {
      this.$store.dispatch("setFormField", { name: name, value: value });
    }, 250),
    textLengthValidate: function(field) {
      return (
        this.checkField(field) &&
        this.form.fields[field].length > 0 &&
        this.form.fields[field].length <= 255
      );
    },
    checkField: function(field) {
      return this.form && this.form.fields && this.form.fields[field] !== undefined;
    }
  }
};
</script>

<style lang="scss">
.form-item {
  position: relative;
	margin-bottom: 12px;
	text-align: left;
}
.btn {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	user-select: none;
	text-align: center;
	padding: 6px 18px;
	font-size: 15px;
	line-height: 16px;
	font-weight: bold;
	color: #fff;
	background-color: $color-w2;
	border: 1px solid $color-w2;
	border-radius: 5px;
	cursor: pointer;
	&[disabled="disabled"] {
		opacity: 0.7;
		pointer-events: none;
		cursor: default;
	}
}
</style>
