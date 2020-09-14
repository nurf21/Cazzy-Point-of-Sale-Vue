<template>
  <div>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-button
          class="mb-2"
          style="border: none; background-color: #82DE3A"
          v-b-modal.modal-2
          @click="addCatButton()"
        >Add Category</b-button>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-form-group>
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Type category name to search"
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
      id="category-table"
      striped
      responsive
      hover
      :items="category"
      :fields="catField"
      :filter="filter"
      :filterIncludedFields="['category_name']"
      :per-page="limit"
      :current-page="page"
      style="text-align: center"
    >
      <template #cell(actions)="data">
        <img
          src="@/assets/img/edit.png"
          class="m-2 d-inline-block align-top action-img"
          alt="edit"
          v-b-modal.modal-2
          @click="setCategory(data)"
        />
        <img
          src="@/assets/img/delete.png"
          class="m-2 d-inline-block align-top action-img"
          alt="delete"
          v-b-modal.modal-3
          @click="showDelBoxCat(data)"
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

    <b-modal id="modal-2" :title="modalTitle" hide-footer>
      <b-form @submit.prevent="onSubmitCat">
        <b-form-group label-cols-sm="3" label="Name" label-for="nested-name">
          <b-form-input id="nested-name" v-model="formCat.category_name" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" v-if="!isUpdate">Submit</b-button>
        <b-button type="button" variant="primary" v-if="isUpdate" @click="onUpdateCat()">Update</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Category',
  data() {
    return {
      catField: [
        { key: 'category_name', label: 'Name', sortable: true },
        { key: 'category_created_at', label: 'Created', sortable: true },
        { key: 'category_updated_at', label: 'Updated', sortable: true },
        'actions'
      ],
      page: 1,
      filter: null,
      formCat: [],
      limit: 5,
      modalTitle: '',
      isUpdate: false
    }
  },
  methods: {
    ...mapActions(['getCategory', 'addCategory', 'patchCategory', 'deleteCategory']),
    addCatButton() {
      this.formCat = {
        category_name: ''
      }
      this.modalTitle = 'Add Category'
      this.isUpdate = false
    },
    onSubmitCat() {
      this.addCategory(this.formCat).then(result => {
        this.getCategory()
        this.makeToast('success', 'Category Added')
        this.$bvModal.hide('modal-2')
      })
        .catch((error) => {
          alert(error.data.msg)
        })
    },
    makeToast(variant, msg) {
      this.$bvToast.toast(msg, {
        title: 'Success',
        variant: variant,
        solid: true
      })
    },
    setCategory(data) {
      this.modalTitle = 'Edit Category'
      this.isUpdate = true
      this.formCat = {
        category_name: data.item.category_name
      }
      this.categoryId = data.item.category_id
    },
    onUpdateCat() {
      const payload = {
        id: this.categoryId,
        form: this.formCat
      }
      this.patchCategory(payload).then(result => {
        this.getCategory()
        this.makeToast('success', 'Category Updated')
        this.$bvModal.hide('modal-2')
      })
        .catch((error) => {
          alert(error.data.msg)
        })
    },
    showDelBoxCat(data) {
      this.$bvModal.msgBoxConfirm(`Are you sure want to delete ${data.item.category_name} ?`, {
        title: 'Delete Category',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }).then(value => {
        if (value === true) {
          this.deleteCategory(data.item.category_id)
          this.getCategory()
          this.makeToast('success', 'Category Deleted')
        }
      })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    ...mapGetters({ category: 'getCategory', totalRows: 'getRowsCat' })
  },
  created() {
    this.getCategory()
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
