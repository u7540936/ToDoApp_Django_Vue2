from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse

from datetime import datetime

from .forms import TodoListForm, TodoListFormChange
from .models import TodoList
from django.forms.models import model_to_dict


# Create your views here.

def main(request):
    if request.method == 'GET':
        if request.is_ajax():
            tasks = list(TodoList.objects.values('id', 'Task', 'CreatedOn', 'Completed', 'Deleted'))
            for i in range(0, len(tasks)):
                tasks[i]['CreatedOn'] = tasks[i]['CreatedOn'].strftime('%m.%d.%Y')
            return JsonResponse({'tasks': tasks}, status=200)

        return render(request, 'django_vue_pages/index.html')

    if request.method == 'POST':
        add_info = request.POST.copy()
        add_info['CreatedOn'] = datetime.now()
        check_form = TodoListForm(add_info)

        if check_form.is_valid():
            returned_task = check_form.save()
            returned_task.CreatedOn = returned_task.CreatedOn.strftime('%m.%d.%Y')

            return JsonResponse({'returned_task': model_to_dict(returned_task)}, status=200)
        return redirect('main')


def modify_task(request, id):
    if request.method == 'POST':
        instance = get_object_or_404(TodoList, id=id)
        form = TodoListFormChange(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return JsonResponse({'returned_task': request.POST['Task']}, status=200)
        return redirect('main')


def delete_task(request, id):
    if request.method == 'POST':
        task = TodoList.objects.get(id=id)
        task.delete()
        return JsonResponse({'result': 'done'}, status=200)
