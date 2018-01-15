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
import * as act from '@/store/actions'


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
    selectFile(event) {
      this.selectedFile = event.target.files[0] || event.dataTransfer.files[0]
    },
    uploadFile() {
      this.$store.dispatch(act.UPLOAD_EXPENSE_REPORT, { file: this.selectedFile })
      this.selectedFile = null
      this.$router.push('/report')
    },
  },
}
</script>

<style>
</style>
