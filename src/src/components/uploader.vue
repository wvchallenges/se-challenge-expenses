<script>
  export default {
    props: {
      'url':null //url where to upload files
      ,'placeholder':null
      ,'fileType':{
        default:'.csv' //which type of file to accept
      }
    }
    ,data () {
      return {
        fl:false //<input type="file"> element
        ,uploadedBytes:0
        ,totalBytes:0
      };
    }
    ,methods: {
      dropFileHandle (e) { //releasting file on the dropzone
        this.dragOverHandle(e); //this will prevent event propagation and will change the class after drop
        var files = e.target.files || e.dataTransfer.files;
        this.totalBytes = 0;
        this.uploadedBytes = 0;
        // get total size of the upload
        for (let i = 0; i < files.length; i++) {
          this.totalBytes += files[i].size;
        }
        this.startUpload(files[0]);
        return false;
      }
      ,dragOverHandle (e) { //dragging over dropzone
        e.stopPropagation();
        e.preventDefault();
        // when user is dragging a file over, change the background of the dropzone (don't touch other classes though)
        if (e.type == 'dragover') {
          e.target.classList.add('alert-success','v-up-drag');
          e.target.classList.remove('alert-info');
        }
        else {
          e.target.classList.remove('alert-success','v-up-drag');
          e.target.classList.add('alert-info');
        }
      }
      ,dzClickHandle (e) { //clicking on the dropzone element
        this.fl.click();
        this.fl.value = null; //without resetting the current value, OnChange won't trigger
      }
      ,startUpload (fileItem) {
        var xhr = new XMLHttpRequest();
        //this will keep track of what value was added last to the total progress
        //on the next progress call, the previous value will be subtracted and the new number of bytes added
        var lastAdded = 0;
        xhr.upload.addEventListener('progress', (e) => {
          this.uploadedBytes += e.loaded - lastAdded;
          lastAdded = e.loaded;
        }, false);
        // file received/failed
        xhr.onreadystatechange = (e) => {
          if (xhr.readyState == 4) {
            let success = xhr.status == 200;
            let data = JSON.parse(xhr.responseText);
            if (success && data.success) {
              if (this.uploadedBytes >= this.totalBytes) {
                this.$emit('upload-complete',1);
              }
            }
            else {
              if (this.uploadedBytes >= this.totalBytes) {
                this.$emit('upload-complete',0);
              }
            }
          }
        };
        // start upload
        var formData = new FormData();
        formData.append('wfile', fileItem);
        xhr.open('post', this.url, true);
        xhr.send(formData);
      }
    }
    ,mounted () {
      this.fl = this.$refs.uploadInput;
    }
  };
</script>
<template>
<div class="v-up form-control alert-info"
  @dragover="dragOverHandle"
  @dragleave="dragOverHandle"
  @drop="dropFileHandle"
  @click="dzClickHandle"
  >
  <input ref="uploadInput" id="v-up-infile" type="file" :accept="fileType" @change="dropFileHandle" v-show="false">
  <div class="progress" v-show="totalBytes>0&&totalBytes>uploadedBytes">
    <div :class="['progress-bar', 'progress-bar-success', 'progress-bar-striped', {'active':uploadedBytes<totalBytes}]" :style="{width: uploadedBytes*100/totalBytes+'%'}">
      {{Math.round(uploadedBytes*100/totalBytes)}}%
    </div>
  </div>
  <div class="text-center v-up-placeholder" v-show="placeholder && totalBytes<=uploadedBytes">
    {{placeholder}}
  </div>
</div>
</template>
<style lang="scss" scoped>
  .v-up{
    width:100%;
    min-height:100px;
    &:hover{
      background-color: #dff0d8;
      cursor: pointer;
    }    
  }
  .v-up-drag .v-up-placeholder{
    display:none;
  }
</style>