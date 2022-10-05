<template>
  <div class="modalbox">
    <div class="modalbox__dialog">
        <div class="modalbox__title">{{title}}</div>
        <hr>
        <slot name="form"/>
        
        <div class="d-flex justify-content-end">
            <button 
            @click="closeModal"
            type="button" 
            class="btn btn-danger">
            Bekor qilish
        </button>
        <button
            @click="add()" 
            type="submit" 
            class="ms-2 btn btn-success">Kiritish</button>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    props:['title','link'],
    methods: {
        add(){
            let form = document.forms.newitem 
            let formData = new FormData(form)
            let obj = {}

            for(let key of formData){
                obj[key[0]] = key[1]
            }

            axios.post(this.link,obj)
            .then(res => {
                if (res.status === 201){
                    form.reset()
                    this.closeModal()
                    this.$emit('newItem',res.data)
                }
            })
        },
        closeModal(){
            this.$emit('closeModal')
        }
    },
}
</script>

<style lang="scss">
@import '@/styles/modal.scss';
</style>