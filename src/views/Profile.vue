<template>
  <div class="c-conteiner settings profile" fluid>
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-small-hide">
          <md-avatar class="md-large">
            <img :src="base64" alt="People">
          </md-avatar>
          <md-button class="md-raised" @click="showDialog=true">Cambiar avatar</md-button>

        <md-dialog :md-active.sync="showDialog">
          <md-content md-dynamic-height>
            <vue-anka-cropper
              :options="{
                  aspectRatio: 1,
                  closeOnSave: true,
                  cropArea: 'circle',
                  croppedHeight: 400,
                  croppedWidth: 400,
                  cropperHeight: false,
                  dropareaMessage: 'Arrastra aqui tu foto.',
                  frameLineDash: [5,5],
                  handleSize: 10,
                  layoutBreakpoint: 550,
                  maxCropperHeight: 368,
                  maxFileSize: 8000000,
                  overlayFill: 'rgba(0, 0, 0, 0.5)',
                  previewOnDrag: true,
                  previewQuality: 0.65,
                  resultQuality: 0.8,
                  resultMimeType: 'image/jpeg',
                  selectButtonLabel: 'Selecciona la imagen',
                  showPreview: true,
                  skin: 'dark',
                  uploadData: {},
                  uploadTo: false}"
                  @cropper-saved="someAction($event, 'cropper-saved')">
              </vue-anka-cropper>
          </md-content>
        </md-dialog>

        </div>
        <div class="md-layout-item">
          <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item">
              <md-card-content>
                <div class="md-layout md-gutter">   
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('Name')">
                      <label for="first-name">Nombre(s)</label>
                      <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.Name" :disabled="sending" />
                      <span class="md-error" v-if="!$v.form.Name.required">The first name is required</span>
                      <span class="md-error" v-else-if="!$v.form.Name.minlength">Invalid first name</span>
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">   
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('LastName')">
                      <label for="last-name">Paterno</label>
                      <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.LastName" :disabled="sending" />
                      <span class="md-error" v-if="!$v.form.LastName.required">The last name is required</span>
                      <span class="md-error" v-else-if="!$v.form.LastName.minlength">Invalid last name</span>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('MothersLastName')">
                      <label for="last-name">Materno</label>
                      <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.MothersLastName" :disabled="sending" />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">

                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('Initials')">
                      <label for="age">Iniciales</label>
                      <md-input type="text" id="initials" name="initials" autocomplete="initials" v-model="form.Initials" :disabled="sending" />
                      <span class="md-error" v-if="!$v.form.Initials.required">The initials is required</span>
                      <span class="md-error" v-else-if="!$v.form.Initials.maxlength">Invalid age</span>
                    </md-field>
                  </div>
                </div>

                <md-field :class="getValidationClass('Email')">
                  <label for="email">Email</label>
                  <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.Email" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.Email.required">The email is required</span>
                  <span class="md-error" v-else-if="!$v.form.Email.email">Invalid email</span>
                </md-field>
              </md-card-content>

              <md-progress-bar md-mode="indeterminate" v-if="sending" />

              <md-card-actions>
                <md-button type="submit" class="md-primary" :disabled="sending">Guardar</md-button>
              </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators';
import vueAnkaCropper from 'vue-anka-cropper'

export default {
  name: "Settings",
  mixins: [validationMixin],
  components: {
    vueAnkaCropper  
  },
  data: () => ({
    showDialog:false,
    User:{},
    base64:"",
    form: {
      Name: null,
      LastName: null,
      MothersLastName:null,
      Initials: null,
      Email: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      Name: {
        required,
        minLength: minLength(3)
      },
      LastName: {
        required,
        minLength: minLength(3)
      },
      Initials: {
        required,
        maxLength: maxLength(3)
      },
      Email: {
        required,
        email
      }
    }
  },
  created() {
    this.User = JSON.parse(localStorage.getItem("_User"));
    if(this.User.ProfilePhotos !== undefined){
      this.base64 = 'data:image/'+this.User.ProfilePhotos[0].Extension+';base64,'+this.User.ProfilePhotos[0].Data
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.firstName = null
      this.form.lastName = null
      this.form.age = null
      this.form.gender = null
      this.form.email = null
    },
    saveUser () {
      this.sending = true

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`
        this.userSaved = true
        this.sending = false
        this.clearForm()
      }, 1500)
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveUser()
      }
    },
    someAction(event,step){
      console.log(event);
      console.log(step);
      this.base64 = event.croppedImageURI;
      this.showDialog = false;
    }
  },
  mounted () {
  }
};
</script>
