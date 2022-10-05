<template>
    <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="text-center mt-3">
                <button
                    @click="()=>{
                        $router.push('/departs')
                    }" 
                    class="btn btn-primary"
                    >
                    &lt;
                </button>  
                Bo'lim xodimlari ro'yhati
            </h3>
          </div>
          <table class="table">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>Ism-familiya</th>
                      <th>Yoshi</th>
                      <th>Bo'limi</th>
                  </tr>
              </thead>
              <tbody v-if="workers.length>0">
                  <tr v-for="(worker,index) of workers" :key="worker.id">
                      <td>{{index+1}}</td>
                      <td>{{worker.name}}</td>
                      <td>{{getAge(worker.bdate)}}</td>
                      <td>{{getDepart(worker.depart)}}</td>
                  </tr>
              </tbody>
              <tbody v-else>
                  <tr>
                      <td colspan="5" class="text-center">
                          Xozircha ma'lumot kiritilmadi
                      </td>
                  </tr>
              </tbody>
          </table>

      </div>
  </template>
  
  <script>
import axios from 'axios'
//   import axios from 'axios';
    export default {
      data() {
            return {
                id: 0,
                workers:[],
                toggleModal:false,
                departs:[],
                url: 'http://localhost:3000/workers'
            }
      },
      methods:{
        getDepart(id){
            let depart = this.departs.find(depart => depart.id == id)
            return depart.name
        },
        getAge(bdate){
            let birth = new Date(bdate)
            let today = new Date()
            return today.getFullYear() - birth.getFullYear()
        },
          
      },
      mounted(){
        this.id = this.$route.params.dep

        axios.get('http://localhost:3000/departs')
        .then(res => {
            if (res.status === 200){
                this.departs = res.data
            }
        })

        axios.get(`${this.url}?depart=${this.id}`)
        .then(res => {
            if (res.status === 200){
                this.workers = res.data
                if (this.workers.length == 0){
                    this.$router.push('/workers')
                }
            }
        })
      }
  }
  </script>
  
  <style>
  
  </style>