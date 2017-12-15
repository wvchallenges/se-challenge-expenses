<template>
<div>
  <div>
    <label for="csvExpenseReportInput">Choose file to upload</label>
  </div>
  <div>
    <input type="file" id="csvExpenseReportInput" @change="selectFile" />
  </div>
  <div>
    <input type="submit" value="Upload" @click="uploadFile" />
  </div>
</div>
</template>

<script>
/**
 * Initial data for the component.
 */
const init = {
  // The file that the user has selected to upload.
  selectedFile: null,
}

export default {
  name: 'ReportUpload',
  data: () => init,
  methods: {
    selectFile (event) {
      this.selectedFile = event.target.files[0] || event.dataTransfer.files[0]
    },
    uploadFile () {
      // TODO - Wire up Vuex
      console.log('Uploading')
      this.selectedFile = null
    },
  },
}
</script>

<style>
</style>
