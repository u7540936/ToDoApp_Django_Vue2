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
const App = Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            returned_task: '',
            new_task: '',
            create_modify: '',
            modify_id: -1,
            modify_index: -1,
            tasks: testData
        }
    },

    created() {
        // let vm = this
        // let r = sendRequest('', 'GET')
        //     .then(function (response) {
        //         vm.tasks = response.data.tasks;
        //     })
    },

    methods: {
        create_modify_func() {
            let vm = this
            let formData = new FormData()

            if (vm.create_modify == 'create') {
                formData.append('Task', this.new_task)
                let r = sendRequest('', 'POST', formData)
                    .then(function (response) {
                        vm.tasks.push(response.data.returned_task)
                        $('#new_task_modal').modal('hide') //code from bootstrap to close the modal.
                        vm.new_task = ''
                    })

            } else {

                formData.append('Task', this.new_task)

                let r = sendRequest(vm.modify_id + '/modify/', 'POST', formData)
                    .then(function (response) {
                        document.getElementById('TaskTable').rows[vm.modify_index + 1].cells[1].innerHTML = response.data.returned_task
                        $('#new_task_modal').modal('hide') //code from bootstrap to close the modal.
                        vm.new_task = ''
                    })
            }
        },

        openModal(index) {
            let vm = this
            if (index !== '') {
                vm.new_task = document.getElementById('TaskTable').rows[index + 1].cells[1].innerHTML
                vm.modify_id = document.getElementById('TaskTable').rows[index + 1].cells[0].innerHTML
                vm.modify_index = index
                vm.create_modify = 'modify'
            } else {
                vm.create_modify = 'create'
                vm.new_task = ''
            }
            $('#new_task_modal').modal('show') //code from bootstrap to close the modal.
        },

        deleteTask(id, index) {
            console.log(id, index)
            let vm = this
            let r = sendRequest(id + '/delete/', 'POST')
                .then(function (response) {
                    vm.tasks.splice(index, 1)
                })
        }
    }
})

App.mount('#app')