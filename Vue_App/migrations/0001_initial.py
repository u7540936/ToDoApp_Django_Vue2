# Generated by Django 3.0.8 on 2020-07-22 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TodoList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Task', models.CharField(max_length=50)),
                ('CreatedOn', models.DateTimeField(auto_now_add=True)),
                ('Completed', models.BooleanField(default=False)),
                ('CompletedOn', models.DateTimeField()),
                ('Deleted', models.BooleanField(default=False)),
                ('DeletedOn', models.DateTimeField()),
            ],
        ),
    ]
