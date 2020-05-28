<script>
export default {
  methods: {
      //修改状态的公共方法
    async changeStatus(url, id) {
      const res = await this.$axios.post(url, { id });
      if (res.data.code === 200) {
        //提示
        this.$message({
          type: "success",
          message: "更改状态成功~~~"
        });
        //调用search方法,重新查询
        // this.search();
        this.getListData();
      }
    },
    //删除的公共方法
    del(url,id){
         this.$confirm('确定删除该用户吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
         const res = await this.$axios.post(url,{id});
         if(res.data.code === 200){
             //提示
             this.$message({
                 type:'success',
                 message:"删除成功~~~"
             });

             //调用search方法,重新查询
             this.search();
         }
        }).catch(() => {
        
        });
    }
  }
};
</script>