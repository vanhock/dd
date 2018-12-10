<template>
	<div class="form-item">
		<input
						v-if="!type || type === 'text'"
						:type="type"
						v-bind="$attrs"
						:invalid="invalid"
						:value="getFormField(name)"
						:placeholder="placeholder"
						:class="{ focused: highlited }"
						@focusout="focused = true"
						@input="setFormField(name, $event.target.value)"
						:required="required"
		/>
		<textarea
						v-if="type === 'textarea'"
						@change="setFormField(name, $event.target.value)"
						placeholder=""
						:required="required"
		></textarea>
		<select v-if="type === 'select'"
						@change="setFormField(name, $event.target.value)"
						:invalid="invalid"
						@focusout="focused = true">
			<option value="0" selected disabled>Не выбрано</option>
			<option v-for="(opt, index) in options" :key="index" :value="opt">
				{{opt}}
			</option>
		</select>
		<label>{{ label }}</label>
		<div class="valid" v-show="!invalid && highlited && checkField(name)"></div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import VFormMixin from "../mixins/VFormMixin"
export default {
  name: "VFormInput",
  inheritAttrs: false,
	mixins: [VFormMixin],
  props: {
    label: {
    	type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
    type: {
    	type: String,
			default: "text"
		},
		options: {
    	type: Array
		},
    invalid: {
			type: Boolean,
    	default: false
		},
		required: {
			type: Boolean,
    	default: true
		},
    showValidate: {
      type: Boolean,
      default: false
    },
		placeholder: String
  },
  data() {
    return {
      focused: false
    };
  },
  computed: {
		...mapGetters([
			"form"
		]),
		highlited: function() {
			if (this.showValidate) {
				return true;
			}
			return this.focused;
		}
  },

};
</script>

<style lang="scss" scoped>
.form-item {
  &:not(:last-child) {
    margin-bottom: 35px;
  }

  [type="text"],
  [type="password"],
  [type="search"],
  [type="phone"],
  [type="email"],
	select,
  textarea {
    display: block;
    margin-top: 30px;
    margin-left: 0;
		width: 100%;
    border-radius: 8px;
    padding: 12px 17px;
    border: 1px solid rgba(208, 208, 208, 0.4);
    font-size: 16px;
    color: $color-b2;
		outline: none;
    &[invalid].focused {
      border-bottom: 2px solid $color-red;
    }
    & + label {
      overflow: hidden;
      position: absolute;
      @include valign();
      width: auto;
      padding: 0 5px;
			top: -14px;
			left: 0;
      background-color: #fff;
      color: $color-b3;
      font-size: 14px;
      transition: all ease-in-out 0.15s;
      font-weight: bold;
    }
    &:focus {
      border: 0;
      border: 1px solid $color-w2;
			outline: none;
    }
    &:focus + label,
    &:valid + label {
      font-size: 14px;
      color: $color-w2;
      transition: all ease-in-out 0.2s;
      opacity: 1;
      z-index: 1;
      padding: 0;
      background-color: transparent;
    }
    &[invalid].focused {
      border: 1px solid $color-red;
    }
    &::placeholder {
      color: $color-b4;
    }
    &:not(:focus):not([invalid]):hover {
      border: 1px solid rgba(208, 208, 208, 0.6);
    }
  }
  .valid {
    content: "";
    position: absolute;
    @include valign();
    @include sprite(checkmark-green);
    right: 20px;
    width: 20px;
    height: 20px;
  }
}
</style>
