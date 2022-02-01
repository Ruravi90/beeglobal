<template>
  <div>
    <div class="login-header">
      <img class="login-logo" src="../assets/img/logo-beeglobal.svg" />
    </div>
    <div class="login-footer ">
      <form
        novalidate
        class="login-form"
        autocomplete="off"
        @submit.prevent="login"
        method="post"
      >
        <div class="p-fluid">
          <div class="p-field">
            <span class="p-float-label" >
                <InputText id="user" name="user" v-model="$v.user.$model" type="text"  aria-describedby="user-help" :class="getValidationClass('user')"/>
                <label for="user">Correo</label>
                <small id="user-help" v-if="!$v.user.email" class="p-invalid">Correo invalido</small>
            </span>
          </div>
        </div>
        <div class="p-fluid p-mt-4">
          <div class="p-field">
            <span class="p-float-label">
                <InputText id="password" name="password" v-model="$v.password.$model" type="password" aria-describedby="password-help"  :class="getValidationClass('password')"/>
                <label for="password">Contraseña</label>
                <small id="password-help" v-if="!$v.password.minLength" class="p-invalid">Contraseña</small>
            </span>
          </div>
        </div>
        <div class="p-fluid">
          <div class="p-field">
            <div class="p-field-checkbox">
              <Checkbox id="remember" v-model="remember" :binary="true" />
              <label for="remember">Recordarme</label>
            </div>
          </div>
        </div>
        <div class="p-fluid">
          <Button type="submit" label="Iniciar sesion" icon="pi pi-check" iconPos="right" />
        </div>
        <div class="p-fluid forgot-passwod">
          <Button label="Restablecer contraseña" class="p-button-link" />
        </div>
      </form>
      <notifications group="auth" position="bottom right" />
    </div>
  </div>
</template>

<style lang="scss">
  @import "../assets/scss/_variables";
  @import "../assets/scss/components/_login";
  
</style>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data: () => ({
    display: false,
    user: '',
    password: '',
    remember: 0,
    sending: false,
  }),
  validations: {
    user: {
      required,
      email,
      minLength: minLength(3)
    },
    password: {
      required,
      minLength: minLength(3)
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v[fieldName];
      if (field) {
        return {
          "p-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.user = null;
      this.form.password = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    login() {
      let loader = this.$loading.show(
        {
          color: "blue",
        },
        {
          // slots
        }
      );

      this.$store
        .dispatch("retrieveToken", {
          username: this.form.user,
          password: this.form.password,
        })
        .then(() => {
          this.$router.push({ name: "Home" });
          loader.hide();
        })
        .catch((error) => {
          loader.hide();
          if (typeof error !== 'undefined' && error.status == 400) {
            this.$notify({
              group: "auth",
              type: "error",
              title: "Error",
              text: "Usuario o contraseña incorrectos!",
            });
          }
          if (typeof error !== 'undefined' && error.status == 500) {
            this.$notify({
              group: "auth",
              type: "error",
              title: "Error",
              text: "Intenta nuevamente!",
            });
          }
          else{
            this.$notify({
              group: "auth",
              type: "error",
              title: "Error",
              text: "Intenta de nuevo mas tarde",
            });
          }

          //this.error = error.response.data;
        });
    },
  },
};
</script>
