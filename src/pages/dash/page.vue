<template>
  <d2-container :filename="filename">
    <!-- <el-row>
      <el-col :span="12">
        <div class="IndexData">
        <el-tag>用户统计</el-tag>
        <el-table :data="tableData">
          <el-table-column label="统计内容" prop="title"></el-table-column>
          <el-table-column label="数量" prop="usernum"></el-table-column>
        </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="IndexData">
        <el-tag type="success">留存统计</el-tag>
        <el-table :data="NumData">
          <el-table-column label="统计内容" prop="title"></el-table-column>
          <el-table-column label="数量" prop="num"></el-table-column>
        </el-table>
        </div>
      </el-col>
    </el-row> -->
    <!-- <div>
      <iframe width="100%" height="700" src="https://embed.windy.com/embed2.html?lat=23.135&lon=117.603&zoom=9&level=surface&overlay=waves&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=39.929&detailLon=116.389&metricWind=default&metricTemp=default&radarRange=-1" frameborder="0"></iframe>
    </div> -->
  </d2-container>
</template>

<script>
import { GetData, GetNum } from '@api/sys.login'
import { mapActions } from 'vuex'

export default {
  name: 'index',
  data () {
    return {
      filename: __filename,
      tableData: [],
      NumData: []
    }
  },
  methods: {
    ...mapActions('d2admin/db', [
      'databaseClear'
    ]),
    // 登录时清除原先缓存数据
    async handleClear () {
      // 清除当前页面的数据库内容
      await this.databaseClear()
    },
    handData () {
      GetData().then((res) => {
        if (res.code === 0 || res.data[0].result !== -1) {
          this.tableData = res.data
        } else {
        }
      }).catch((res) => {
        console.log('错误内容:', res)
      })

      GetNum().then((res) => {
        if (res.code === 0 || res.data[0].result !== -1) {
          this.NumData = res.data
        } else {
        }
      }).catch((res) => {
        console.log('错误内容:', res)
      })
    }
  },
  mounted () {
    // this.handleClear()
  }
}
</script>
<style>
  .IndexData{
    margin-left: 30px;
    margin-top: 30px;
    height: 10%;
    width: 50%;
    border:2px solid #a1a1a1;
    padding:10px 40px;
    border-radius:25px;
  }
</style>
