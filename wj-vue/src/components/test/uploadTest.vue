<template>
  <el-form ref="form" :model="goodsFrom" label-width="80px">
    <el-form-item label="商品名称" w><el-input
      placeholder="请输入商品名称"
      v-model="goodsFrom.mer_name"
      clearable></el-input></el-form-item>
    <el-form-item label="商品描述"><el-input
      type="textarea"
      placeholder="请输入商品描述"
      autosize
      v-model="goodsFrom.mer_description"
      clearable></el-input></el-form-item>
    <el-form-item label="商品价格"><el-input
      placeholder="请输入商品价格"
      v-model="goodsFrom.mer_price"
      clearable></el-input></el-form-item>
    <el-form-item label="商品标签"><el-select v-model="goodsTag" multiple placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select></el-form-item>
    <!--      action="http://10.17.102.0:8080/api/login0/upload_commodity/"-->
    <el-form-item label="商品图片"><el-upload
      class="upload"
      ref="upload"
      action="http://10.17.102.0:8080/api/login0/upload_commodity/"
      :data="goodsFrom"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-remove="beforeRemove"
      :on-success="onSuccess"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
      list-type="picture"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选择商品图片</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submit">发布商品</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload></el-form-item>
    <el-form-item>
      <input type="file" @change="changetest">
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'uploadTest',
  data () {
    return {
      goodsFrom: {
        mer_name: '',
        mer_description: '',
        mer_price: '',
        mer_img: ''
      },
      goodsTag: [],
      fileList: [],
      upFile1: {},
      upFile2: {},
      upFile3: {},
      param: {},
      src: '',
      options: [{
        value: '选项1',
        label: 'food'
      }, {
        value: '选项2',
        label: 'drink'
      }]
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.param.delete('file')
    },
    handlePreview (file) {
    },
    onSuccess (files, fileList) {
      // console.log(files)
      // console.log(fileList)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleChange (file, fileList) {
      // this.upFileList = new formatDate()
      if (fileList.length === 1) {
        this.upFile1 = new FormData()
        this.upFile1.append('image1', file)
        console.log(this.upFile1)
      } else if (fileList.length === 2) {
        this.upFile2 = new FormData()
        this.upFile2.append('image2', file)
      } else {
        this.upFile3 = new FormData()
        this.upFile3.append('image3', file)
      }
      this.fileList = fileList
    },
    beforeRemove (file, fileList) {
      // this.upFileList.delete('file')
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess (response) {
      this.url = response
      this.$emit('onUpload')
      this.$message.warning('上传成功')
    },
    clear () {
      this.$refs.upload.clearFiles()
    },
    submit () {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // this.$refs.upload.submit()
      console.log(this.fileList)
      let fd = new FormData()
      fd.append('image1', this.fileList[0])
      console.log(this.fileList[0])
      if (this.fileList.length === 2) {
        fd.append('image2', this.fileList[1])
      } else {
        fd.append('image2', ' ')
      }
      if (this.fileList.length === 3) {
        fd.append('image3', this.fileList[2])
      } else {
        fd.append('image3', ' ')
      }
      fd.append('mer_name', this.goodsFrom.mer_name)
      fd.append('mer_price', this.goodsFrom.mer_price)
      fd.append('mer_description', this.goodsFrom.mer_description)
      console.log(fd)
      this.$axios.post('/login0/upload_commodity/', fd
        , config)
        .then(response => {
          console.log(response)
        })
      // this.$refs.upload.submit()
      // const formData = new FormData()
      // formData.append('img', this.fileList)
    },
    changetest: function (e) {
      let file = e.target.files[0]
      this.goodsFrom.mer_img = file
    },
    onSubmit () {
      let fd = new FormData()
      fd.append('mer_name', this.goodsFrom.mer_name)
      fd.append('mer_price', this.goodsFrom.mer_price)
      fd.append('mer_description', this.goodsFrom.mer_description)
      fd.append('image1', this.goodsFrom.mer_img)
      fd.append('image2', '')
      fd.append('image3', '')
      this.$axios.post('/login0/upload_commodity/', this.$qs.stringify(fd)).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    myUpload (e) {
      const fd = new FormData()
      fd.append('image1', e.file)
      fd.append('image2', '')
      fd.append('image3', '')
      fd.append('mer_name', this.goodsFrom.mer_name)
      fd.append('mer_price', this.goodsFrom.mer_price)
      fd.append('mer_description', this.goodsFrom.mer_description)
      this.$axios.post('/login0/upload_commodity/', this.$qs.stringify(fd)).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
