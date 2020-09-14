<template>
  <div>
    <b-row>
      <b-col lg="6" class="my-1"></b-col>
      <b-col lg="6" class="my-1">
        <b-form-group>
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Type email to search"
              @click="page = 1"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      id="user-table"
      striped
      responsive
      hover
      :items="user"
      :fields="userField"
      :filter="filter"
      :filterIncludedFields="['user_email']"
      :per-page="limit"
      :current-page="page"
      style="text-align: center"
    >
      <template #cell(actions)="data">
        <img
          src="@/assets/img/edit.png"
          class="d-inline-block align-top action-img"
          alt="edit"
          v-b-modal.modal-user
          @click="setUser(data)"
        />
      </template>
    </b-table>

    <b-pagination
      v-model="page"
      v-show="!filter"
      :total-rows="totalRows"
      :per-page="limit"
      align="center"
      class="my-0"
      aria-controls="category-table"
    ></b-pagination>

    <b-modal id="modal-user" title="Edit User" hide-footer>
      <b-form>
        <b-form-group label-cols-sm="3" label="Email" label-for="nested-email">
          <b-form-input id="nested-email" v-model="formUser.user_email" disabled></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Name" label-for="nested-name">
          <b-form-input id="nested-name" v-model="formUser.user_name" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Role" label-for="nested-role">
          <b-form-select id="nested-role" v-model="formUser.user_role" :options="roleOpt"></b-form-select>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Status" label-for="nested-status">
          <b-form-select id="nested-status" v-model="formUser.user_status" :options="statusOpt"></b-form-select>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Change Password" label-for="nested-name">
          <b-input
            type="password"
            id="nested-password"
            v-model="formUser.user_password"
            class="mt-3"
          ></b-input>
        </b-form-group>
        <b-button type="button" variant="primary" @click="onUpdateUser()">Update</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'User',
  data() {
    return {
      userField: [
        { key: 'user_email', label: 'Email', sortable: true },
        { key: 'user_name', label: 'Name', sortable: true },
        { key: 'user_role', label: 'Role', sortable: true },
        { key: 'user_status', label: 'Status', sortable: true },
        { key: 'user_created_at', label: 'Created', sortable: true },
        { key: 'user_updated_at', label: 'Updated', sortable: true },
        'actions'
      ],
      filter: null,
      limit: 5,
      page: 1,
      formUser: {},
      roleOpt: [{ value: 1, text: 'Admin' }, { value: 2, text: 'Cashier' }],
      statusOpt: [{ value: 0, text: 'Inactive' }, { value: 1, text: 'Active' }]
    }
  },
  methods: {
    ...mapActions(['allUserData', 'patchUser']),
    setUser(data) {
      this.formUser = {
        user_email: data.item.user_email,
        user_name: data.item.user_name,
        user_role: data.item.user_role,
        user_status: data.item.user_status
      }
      this.userId = data.item.user_id
    },
    onUpdateUser() {
      const payload = {
        id: this.userId,
        form: this.formUser
      }
      this.patchUser(payload).then(result => {
        this.allUserData()
        this.makeToast('success', 'Success', 'User Updated')
        this.$bvModal.hide('modal-user')
      })
        .catch((error) => {
          this.makeToast('danger', 'Error', error.data.msg)
          console.log(error)
        })
    },
    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title,
        variant: variant,
        solid: true
      })
    }
  },
  computed: {
    ...mapGetters({ user: 'getAllUser', totalRows: 'getRowsUser' })
  },
  created() {
    this.allUserData()
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
