//Axios Ajax Request
function sendRequest(url, method, data) {
    let r = axios({
        method: method,
        url: url,
        data: data,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {
            'x-requested-With': 'XMLHttpRequest',
        }
    })
    return r
}

// Vue Connection
let app = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        returned_task: '',
        returned_tags: '',
        new_task: '',
        create_modify: '',
        modify_id: -1,
        modify_index: -1,
        tasks: [],

        // Variables for multiselect component
        multiselect_value: [],
        options: [
            {name: 'Vue.js', code: 'Vue.js'},
            {name: 'Javascript', code: 'Javascript'},
            {name: 'Open Source', code: 'Open Source'}
        ]
    },
    created() {
        let vm = this
        let r = sendRequest('', 'GET')
            .then(function (response) {
                vm.tasks = response.data.tasks;
            })
    },
    methods: {
        // Method for multiselect component
        addTag(newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        },

        create_modify_func() {
            let vm = this
            let formData = new FormData()

            if (vm.create_modify == 'create') {
                formData.append('Task', this.new_task)
                this.multiselect_value.forEach(function (x) {
                    formData.append('Tags', x.name)
                })
                let r = sendRequest('', 'POST', formData)
                    .then(function (response) {
                        vm.tasks.push(response.data.returned_task)
                        $('#new_task_modal').modal('hide') //code from bootstrap to close the modal.
                        vm.new_task = ''
                        vm.multiselect_value = []
                    })

            } else {

                formData.append('Task', this.new_task)
                this.multiselect_value.forEach(function (x) {
                    formData.append('Tags', x.name)
                })
                let r = sendRequest(vm.modify_id + '/modify/', 'POST', formData)
                    .then(function (response) {
                        console.log(response.data)
                        document.getElementById('TaskTable').rows[vm.modify_index + 1].cells[1].innerHTML = response.data.returned_task
                        document.getElementById('TaskTable').rows[vm.modify_index + 1].cells[3].innerHTML = response.data.returned_tags
                        $('#new_task_modal').modal('hide') //code from bootstrap to close the modal.
                        vm.new_task = ''
                        vm.multiselect_value = []
                    })
            }
        },

        openModal(index) {
            let vm = this
            vm.multiselect_value = []
            if (index !== '') {
                vm.new_task = document.getElementById('TaskTable').rows[index + 1].cells[1].innerHTML
                vm.modify_id = document.getElementById('TaskTable').rows[index + 1].cells[0].innerHTML
                let arrayTags = document.getElementById('TaskTable').rows[index + 1].cells[3].innerHTML
                if(arrayTags) {
                    let arrayTags2 = arrayTags.split(';').map(Function.prototype.call, String.prototype.trim)
                    arrayTags2.forEach(function (x) {
                        vm.multiselect_value.push({'name': x, 'code': x})
                    })
                }
                vm.modify_index = index
                vm.create_modify = 'modify'
            } else {
                vm.create_modify = 'create'
                vm.new_task = ''
            }

            $('#new_task_modal').modal('show') //code from bootstrap to close the modal.
        },

        deleteTask(id, index) {
            let vm = this
            let r = sendRequest(id + '/delete/', 'POST')
                .then(function (response) {
                    vm.tasks.splice(index, 1)
                })
        }
    }
});

// Adding multiselect component
Vue.component('multiselect', window.VueMultiselect.default)