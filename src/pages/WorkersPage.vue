<template>
  <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="text-center mt-3">
                Xodimlar ro'yhati
            </h3>
            <button class="btn btn-success" @click="toggleModal = !toggleModal">Yangi xodim</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Ism-familiya</th>
                    <th>Yoshi</th>
                    <th>Bo'limi</th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-if="workers.length>0">
                <tr v-for="(worker,index) of workers" :key="worker.id">
                    <td>{{index+1}}</td>
                    <td>{{worker.name}}</td>
                    <td>{{getAge(worker.bdate)}}</td>
                    <td>{{getDepart(worker.depart)}}</td>
                    <td>
                        <button
                            @click="delWorker(worker.id)" 
                            class="btn btn-danger">
                            x
                        </button>
                    </td>
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
        <ModalBox 
            v-if="toggleModal"
            @closeModal="()=>{ toggleModal = false }"
            title="Yangi xodim qo`shish"
            :link="url"
            @newItem="(newWorker)=> {workers.push(newWorker)}"
        >   
            <template v-slot:form>
                <form class="modalbox__form" name="newitem">
                    <div class="modalbox__input">
                        <label>Ism-familiya</label>
                        <input name="name" class="form-control" type="text" placeholder="Misol: Sardor">
                    </div>
                    <div class="modalbox__input">
                        <label>Tugilgan sanasi</label>
                        <input name="bdate" type="date">
                    </div>
                    <div class="modalbox__input mb-4">
                        <label>Tugilgan sanasi</label>
                        <select name="depart">
                            <option value="">Ro'yhatdan tanlang</option>
                            <option
                                v-for="depart of departs" 
                                :key="depart.id"
                                :value="depart.id"
                                >
                                    {{depart.name}}
                                </option>
                        </select>
                    </div>
                </form>
            </template>
        </ModalBox>
    </div>
</template>

<script>
import ModalBox from '@/components/ModalBox.vue';
import axios from 'axios';
export default {
    components: { 
        ModalBox 
    },
    data() {
        return {
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
        delWorker(id){
            if (confirm('Qaroringiz qat`iymi?')){
                axios.delete(`${this.url}/${id}`)
                .then(res => {
                    if (res.status === 200){
                        let index = this.workers.findIndex(worker => worker.id === id)
                        if (index !==-1){
                            this.workers.splice(index,1)
                        }
                    }
                })
            }
        }
    },
    mounted(){
        axios.get('http://localhost:3000/departs')
        .then(res => {
            if (res.status === 200){
                this.departs = res.data
            }
        })
        axios.get(this.url)
        .then(res => {
            if (res.status === 200){
                this.workers = res.data
            }
        })
    }
}
</script>

<style>

</style>