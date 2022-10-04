<template>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="text-center mt-3">Bo'limlar ro'yhati</h3>
            <div class="d-flex">
                <input type="text" placeholder="Bo`lim nomi" class="form-control" v-model="depart.name">
                <button class="ms-2 btn btn-success" @click="add()">Qo'shish</button>
            </div>
        </div>
        <table class="table">
            <thead><tr><th>№</th><th>Bo'lim nomi</th><th></th></tr>
            </thead>
            <tbody v-if="departs.length>0">
                <tr v-for="(d,i) of departs" :key="i">
                    <td>{{i+1}}</td><td>{{d.name}}</td>
                    <td><button @click="remove(d.id)" class="btn btn-danger">X</button></td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr><td colspan="3" class="text-center">Bo'limlar xozircha yo'q</td></tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){ return {
        departs:[],depart:{}
    }},
    methods: {
        remove(id){
            if (confirm('Qaroringiz qat`iymi?')){
                axios.delete(`http://localhost:3000/departs/${id}`)
                .then(res => {
                    if (res.status == 200){
                        let index = this.departs.findIndex(depart => depart.id == id)
                        if (index !== -1)
                            this.departs.splice(index,1)
                    }
                })
            }
        },
        add(){
            axios.post('http://localhost:3000/departs',this.depart)
            .then(newDepart => {
                if (newDepart.status == 201)
                    this.departs.push(newDepart.data)
            }).finally(()=>{ this.depart = {} })
        }
    },
    mounted(){
        axios.get('http://localhost:3000/departs')
        .then(allDepart => {
            if (allDepart.status == 200)
                this.departs = allDepart.data
        })
    }
}
</script>