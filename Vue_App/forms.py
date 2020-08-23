from django import forms

from .models import TodoList


class TodoListForm(forms.ModelForm):
    class Meta:
        model = TodoList
        fields = ['Task', 'CreatedOn', 'Completed', 'CompletedOn', 'Deleted', 'DeletedOn', 'Tags']


class TodoListFormChange(forms.ModelForm):
    class Meta:
        model = TodoList
        fields = ['Task', 'Tags']
