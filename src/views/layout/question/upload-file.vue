<template>
  <div class="uploadFile">
    <!-- action上传文件的地址 name 上传文件字段名 -->
    <el-upload
      class="avatar-uploader"
      :action="BASE_URL + '/question/upload'"
      name="file"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String, //这里代表 type 类型是字符串
      default: "image" //这个代表 type 的值,如果没有传递默认就是image
    }
  },
  data() {
    return {
      BASE_URL: process.env.VUE_APP_BASEURL //http://127.0.0.1/heimamm/public
    };
  },
  methods: {
    //上传成功之后的回调
    handleAvatarSuccess(res) {},
    //上传之前的回调(一般限制文件类型和大小)
    beforeAvatarUpload(file) {
      if (this.type == "video") {
        //代表上传的是视频
        const isVideo = file.type === "video/mp4";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isVideo) {
          this.$message.error("上传视频只能是 MP4 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传视频大小不能超过 2MB!");
        }
        return isVideo && isLt2M;
      } else {
        //代表上传的是图片
        const isImage =
          file.type === "image/jpeg" ||
          file.type === "image/jpeg" ||
          file.type === "image/gif";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImage) {
          this.$message.error("上传头像图片只能是 JPG/JPEG/GIF 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isImage && isLt2M;
      }
    }
  }
};
</script>

<style lang="less">
.uploadFile {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>